import { Card } from "@/components/ui/card";
import { CheckCircle2, AlertCircle, XCircle } from "lucide-react";

interface KPIWidgetProps {
  title: string;
  value: number;
  target: number;
  showIndicator?: boolean;
}

export default function KPIWidget({ title, value, target, showIndicator = true }: KPIWidgetProps) {
  const percentage = (value / target) * 100;
  const variance = value - target;
  
  // Determine status: Green (>=95%), Yellow (80-94%), Red (<80%)
  let status: "green" | "yellow" | "red" = "green";
  let statusColor = "#4B5563";
  let IndicatorIcon = CheckCircle2;
  
  if (percentage >= 95) {
    status = "green";
    statusColor = "#4B5563"; // Neutral for on target
    IndicatorIcon = CheckCircle2;
  } else if (percentage >= 80) {
    status = "yellow";
    statusColor = "#4B5563"; // Neutral for near target
    IndicatorIcon = AlertCircle;
  } else {
    status = "red";
    statusColor = "#D63636"; // Red for below target
    IndicatorIcon = XCircle;
  }

  return (
    <Card className="bg-[#F4F4F4] border border-[#E5E7EB] rounded-[4px] p-4 dark:bg-[#111827] dark:border-[#374151]">
      <div className="flex items-start justify-between mb-2">
        <h3 className="text-[14px] font-medium text-[#4B5563] dark:text-[#D1D5DB]">{title}</h3>
        {showIndicator && (
          <IndicatorIcon 
            className={`h-5 w-5 ${
              status === "red" ? "text-[#D63636]" : 
              status === "yellow" ? "text-[#4B5563]" : 
              "text-[#4B5563]"
            }`} 
          />
        )}
      </div>
      <div className="flex items-baseline gap-2">
        <span className="text-[24px] font-semibold text-[#1F2937] dark:text-[#F9FAFB]">{value}</span>
        <span className="text-[14px] font-medium text-[#4B5563] dark:text-[#D1D5DB]">/ {target}</span>
      </div>
      <div className="mt-2 flex items-center gap-2">
        <span
          className="text-[14px] font-medium"
          style={{ color: statusColor }}
        >
          {percentage.toFixed(1)}%
        </span>
        {variance !== 0 && (
          <span
            className="text-[14px] font-medium"
            style={{ color: statusColor }}
          >
            ({variance > 0 ? "+" : ""}{variance})
          </span>
        )}
      </div>
      {status === "red" && (
        <div className="mt-2 text-[12px] text-[#D63636] font-medium">
          Below Target
        </div>
      )}
    </Card>
  );
}

