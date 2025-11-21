import { useEffect, useState } from "react";
import ReactDOM from "react-dom";

type Step = { selector: string; title: string; content: string; position?: "right" | "left" | "top" | "bottom" };

const stepsByPage: Record<string, Step[]> = {
  performance: [
    { selector: '[data-onboarding="performance.filter.department"]', title: "Filter by Department", content: "Use this control to narrow programmes by department.", position: "right" },
    { selector: '[data-onboarding="performance.filter.status"]', title: "Filter by Status", content: "Show On Track, Delayed, or Completed programmes.", position: "right" },
    { selector: '[data-onboarding="performance.table"]', title: "Programme Table", content: "Click a row to view programme details and variance.", position: "top" },
  ],
  performance_summary: [
    { selector: '[data-onboarding="performance.table"]', title: "Programme Table", content: "Shows targets, actuals, and status for each programme.", position: "top" },
  ],
  performance_analytics: [
    { selector: '.recharts-wrapper', title: "Charts", content: "Charts show budget and trend data. Hover for details.", position: "top" },
  ],
  review: [
    { selector: '[data-onboarding="review.filters"]', title: "Status Filters", content: "Use these to filter workflow items by status.", position: "right" },
    { selector: '.card', title: "Workflow Item", content: "Click a card to open the review detail dialog.", position: "top" },
  ],
  evidence: [
    { selector: '[data-onboarding="evidence.upload"]', title: "Upload Evidence", content: "Upload documents to support programme indicators.", position: "right" },
    { selector: '[data-onboarding="evidence.projects"]', title: "Select Programme", content: "Choose the programme to view and upload evidence for.", position: "right" },
  ],
  audit: [
    { selector: '[data-onboarding="audit.search"]', title: "Search", content: "Search audit logs by user, action, project, or details.", position: "right" },
    { selector: '[data-onboarding="audit.filter"]', title: "Filters", content: "Filter by action or role to narrow the audit log.", position: "right" },
  ],
};

export default function OnboardingCallouts() {
  const [visible, setVisible] = useState(false);
  const [page, setPage] = useState<string | null>(null);
  const [stepIndex, setStepIndex] = useState(0);
  const [rect, setRect] = useState<DOMRect | null>(null);

  useEffect(() => {
    const handler = (ev: Event) => {
      const detail = (ev as CustomEvent)?.detail;
      const p = detail?.page || (detail === undefined ? 'overview' : null);
      if (p) {
        setPage(p === 'performance' ? 'performance' : p === 'analytics' ? 'performance_analytics' : p === 'performance' ? 'performance' : p);
        setStepIndex(0);
        setVisible(true);
      }
    };
    window.addEventListener('openOnboarding', handler as EventListener);
    return () => window.removeEventListener('openOnboarding', handler as EventListener);
  }, []);

  useEffect(() => {
    if (!visible || !page) return;
    const steps = stepsByPage[page] || [];
    const step = steps[stepIndex];
    if (!step) {
      setRect(null);
      return;
    }
    const el = document.querySelector(step.selector) as HTMLElement | null;
    if (!el) {
      setRect(null);
      return;
    }
    const r = el.getBoundingClientRect();
    setRect(r);
  }, [visible, page, stepIndex]);

  if (!visible || !page) return null;
  const steps = stepsByPage[page] || [];
  const step = steps[stepIndex];
  if (!step) return null;

  const container = document.body;
  return ReactDOM.createPortal(
    <div aria-hidden>
      {rect && (
        <div style={{ position: 'fixed', left: rect.right + 12, top: rect.top + window.scrollY }} className="z-[9999] max-w-xs bg-white dark:bg-[#111827] border border-[#E5E7EB] dark:border-[#374151] rounded-[4px] p-3 shadow-lg">
          <div className="text-[13px] font-semibold text-[#1F2937] dark:text-[#F9FAFB]">{step.title}</div>
          <div className="text-[13px] text-[#4B5563] dark:text-[#D1D5DB] mt-1">{step.content}</div>
          <div className="flex justify-between gap-2 mt-3">
            <button
              className="text-[13px] px-2 py-1 border rounded text-[#4B5563]"
              onClick={() => { if (stepIndex > 0) setStepIndex(stepIndex - 1); }}
              disabled={stepIndex === 0}
            >Prev</button>
            <div className="flex gap-2">
              <button className="text-[13px] px-2 py-1 border rounded text-[#4B5563]" onClick={() => { setVisible(false); setPage(null); }}>Close</button>
              <button
                className="text-[13px] px-2 py-1 bg-[#1F2937] text-white rounded"
                onClick={() => {
                  if (stepIndex < steps.length - 1) setStepIndex(stepIndex + 1);
                  else { setVisible(false); setPage(null); }
                }}
              >{stepIndex < steps.length - 1 ? 'Next' : 'Got it'}</button>
            </div>
          </div>
        </div>
      )}
    </div>,
    container
  );
}
