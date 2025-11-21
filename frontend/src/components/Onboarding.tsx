import { Button } from "./ui/button.tsx";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "./ui/dialog.tsx";
import { useEffect, useState } from "react";

type OnboardingPage = "overview" | "performance" | "analytics" | null;

export default function Onboarding() {
  const storageKey = "mrs_onboarding_dismissed";
  const [open, setOpen] = useState<boolean>(false);
  const [dontShowAgain, setDontShowAgain] = useState<boolean>(false);
  const [page, setPage] = useState<OnboardingPage>(null);

  useEffect(() => {
    const dismissed = localStorage.getItem(storageKey);
    if (!dismissed) {
      // show onboarding on first visit (general overview)
      setPage("overview");
      setOpen(true);
    }

    const handleOpen = (ev: Event) => {
      const detail = (ev as CustomEvent)?.detail;
      if (detail && detail.page) {
        setPage(detail.page as OnboardingPage);
      } else {
        setPage("overview");
      }
      setOpen(true);
    };

    globalThis.addEventListener("openOnboarding", handleOpen as EventListener);
    return () => globalThis.removeEventListener("openOnboarding", handleOpen as EventListener);
  }, []);

  const close = () => {
    setOpen(false);
    if (dontShowAgain) {
      localStorage.setItem(storageKey, "1");
    }
    setPage(null);
  };

  const renderContent = () => {
    if (page === "performance") {
      return (
        <div className="space-y-3 text-[14px] text-[#1F2937] dark:text-[#F9FAFB]">
          <p className="font-medium">Project Performance Tour</p>
          <ol className="list-decimal list-inside space-y-2">
            <li>Use the filters (Department / Status / Quarter) to narrow the table.</li>
            <li>Click any row to open details for that programme (shows target, actual, variance).</li>
            <li>Use the Export button to generate a report (POC: export is not implemented in this build).</li>
            <li>Truncated indicators on small screens show full text via tooltip/title.</li>
          </ol>
        </div>
      );
    }

    if (page === "analytics") {
      return (
        <div className="space-y-3 text-[14px] text-[#1F2937] dark:text-[#F9FAFB]">
          <p className="font-medium">KPI Analytics Tour</p>
          <ol className="list-decimal list-inside space-y-2">
            <li>Budget vs Expenditure: compares department budgets and spending.</li>
            <li>Monthly Performance Trend: shows target vs actual over time.</li>
            <li>Use chart tooltips to inspect exact numbers; export buttons provide report placeholders.</li>
            <li>Charts are simplified for the POC and are for demonstration purposes only.</li>
          </ol>
        </div>
      );
    }

    // default overview
    return (
      <div className="mt-2 space-y-4 text-[14px] text-[#1F2937] dark:text-[#F9FAFB]">
        <p>
          This proof-of-concept demonstrates the Monitoring & Reporting System. Below are a few quick points to help you understand what's shown on this dashboard.
        </p>

        <ol className="list-decimal list-inside space-y-2">
          <li>
            <strong>Overview tab:</strong> high-level KPIs and alerts. Use this to see programme health at-a-glance.
          </li>
          <li>
            <strong>Project Performance:</strong> a table of programmes — click a row to view details.
          </li>
          <li>
            <strong>KPI Analytics:</strong> charts for budget, monthly trends and department comparisons.
          </li>
          <li>
            <strong>Filters:</strong> use the Department / Status / Quarter filters to narrow results for reporting.
          </li>
        </ol>

        <div className="pt-2 text-[13px] text-[#4B5563] dark:text-[#D1D5DB]">
          Tip: use the <em>Help</em> button in the top-right to reopen this tour later.
        </div>

        <div className="flex items-center gap-3 mt-3">
          <label className="inline-flex items-center gap-2 text-[14px]">
            <input
              type="checkbox"
              checked={dontShowAgain}
              onChange={(e) => setDontShowAgain(e.target.checked)}
            />
            <span>Don't show this again</span>
          </label>
        </div>
      </div>
    );
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <div className="flex items-start justify-between">
            <DialogTitle className="text-[18px] font-semibold">{page ? `${page.charAt(0).toUpperCase() + page.slice(1)} tour` : "Welcome — Quick tour"}</DialogTitle>
          </div>
        </DialogHeader>

        {renderContent()}

        <DialogFooter className="mt-6 flex justify-end gap-2">
          <Button variant="outline" onClick={() => setOpen(false)}>Show me later</Button>
          <Button onClick={close}>Got it</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
