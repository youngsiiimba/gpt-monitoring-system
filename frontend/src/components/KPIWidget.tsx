import { Card } from "@/components/ui/card";
import { CheckCircle2, AlertCircle, XCircle } from "lucide-react";

interface KPIWidgetProps {
  title: string;
  value: number;
  target: number;
  showIndicator?: boolean;
}

export default function KPIWidget({ title, value, target, showIndicator = true }: KPIWidgetProps) {
  const percentage = target > 0 ? (value / target) * 100 : 0;
  const variance = value - target;

  // Determine status: On target (>=95%), Near target (80-94%), Below target (<80%)
  let status: "on" | "near" | "below" = "on";
  let StatusIcon = CheckCircle2;

  if (percentage >= 95) {
    status = "on";
    StatusIcon = CheckCircle2;
  } else if (percentage >= 80) {
    status = "near";
    StatusIcon = AlertCircle;
  } else {
    status = "below";
    StatusIcon = XCircle;
  }

  const statusLabel = status === "on" ? "On target" : status === "near" ? "Near target" : "Below target";
  const statusClass = status === "on" ? "gov-status-green" : status === "near" ? "gov-status-yellow" : "gov-status-red";

  return (
    <Card className="bg-[#F4F4F4] border border-[#E5E7EB] rounded-[4px] p-4 dark:bg-[#111827] dark:border-[#374151]">
      <div className="flex items-start justify-between mb-2">
        <h3 className="text-[14px] font-medium text-[#4B5563] dark:text-[#D1D5DB]">{title}</h3>
        {showIndicator && (
          <div className={`flex items-center gap-2 ${statusClass}`} aria-hidden>
            <StatusIcon className="h-5 w-5" />
            <span className="text-[12px] font-medium hidden sm:inline">{statusLabel}</span>
          </div>
        )}
      </div>

      <div className="flex items-baseline gap-2">
        <span className="text-[24px] font-semibold text-[#1F2937] dark:text-[#F9FAFB]">{value}</span>
        <span className="text-[14px] font-medium text-[#4B5563] dark:text-[#D1D5DB]">/ {target}</span>
      </div>

      <div className="mt-2 flex items-center gap-3">
        <span className={`text-[14px] font-medium ${statusClass}`} aria-live="polite">
          {percentage.toFixed(1)}%
        </span>
        {variance !== 0 && (
          <span className={`text-[14px] font-medium ${statusClass}`}>({variance > 0 ? "+" : ""}{variance})</span>
        )}
      </div>

      <div className="sr-only" aria-live="polite">{title} is {statusLabel} at {percentage.toFixed(1)} percent.</div>
    </Card>
  );
}

