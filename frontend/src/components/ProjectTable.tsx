import type { Project } from "../data/mockData.ts";
import { useState } from "react";

interface ProjectTableProps {
  projects: Project[];
  onRowClick?: (project: Project) => void;
}

export default function ProjectTable({ projects, onRowClick }: ProjectTableProps) {
  const [hoveredRow, setHoveredRow] = useState<number | null>(null);

  const getStatusClass = (status: Project["status"]) => {
    switch (status) {
      case "On Track":
        return "gov-status-green";
      case "Delayed":
        return "gov-status-red";
      case "Completed":
        return "gov-status-green";
      default:
        return "gov-status-green";
    }
  };

  return (
    <div className="overflow-x-auto -mx-4 md:mx-0">
      <div className="inline-block min-w-full align-middle px-4 md:px-0">
        <table className="w-full border-collapse" role="table" aria-label="Programme performance table" data-onboarding="performance.table">
        <caption className="gov-table-caption">Programme performance table — concise summary of programmes and status</caption>
        <thead>
          <tr className="border-b border-[#E5E7EB] dark:border-[#374151]">
            <th scope="col" className="text-left py-4 px-4 text-[14px] md:text-[16px] font-bold text-[#1F2937] dark:text-[#F9FAFB]">
              Programme
            </th>
            <th scope="col" className="text-left py-4 px-4 text-[14px] md:text-[16px] font-bold text-[#1F2937] dark:text-[#F9FAFB] hidden md:table-cell">
              Department
            </th>
            <th scope="col" className="text-left py-4 px-4 text-[14px] md:text-[16px] font-bold text-[#1F2937] dark:text-[#F9FAFB] hidden lg:table-cell">
              Indicator
            </th>
            <th scope="col" className="text-right py-4 px-4 text-[14px] md:text-[16px] font-bold text-[#1F2937] dark:text-[#F9FAFB]">
              Target
            </th>
            <th scope="col" className="text-right py-4 px-4 text-[14px] md:text-[16px] font-bold text-[#1F2937] dark:text-[#F9FAFB]">
              Actual
            </th>
            <th scope="col" className="text-left py-4 px-4 text-[14px] md:text-[16px] font-bold text-[#1F2937] dark:text-[#F9FAFB]">
              Status
            </th>
            <th scope="col" className="text-left py-4 px-4 text-[14px] md:text-[16px] font-bold text-[#1F2937] dark:text-[#F9FAFB] hidden sm:table-cell">
              Last Updated
            </th>
          </tr>
        </thead>
        <tbody>
          {projects.map((project) => (
            <tr
              key={project.id}
              className={`border-b border-[#E5E7EB] dark:border-[#374151] ${
                hoveredRow === project.id ? "bg-[#E5E7EB] dark:bg-[#374151]" : ""
              } ${onRowClick ? "cursor-pointer gov-row-focus" : ""}`}
              onMouseEnter={() => setHoveredRow(project.id)}
              onMouseLeave={() => setHoveredRow(null)}
              onClick={() => onRowClick?.(project)}
              tabIndex={onRowClick ? 0 : -1}
              onKeyDown={(e) => {
                if (!onRowClick) return;
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  onRowClick(project);
                }
              }}
            >
              <td className="py-4 px-4 text-[14px] md:text-[16px] text-[#4B5563] dark:text-[#D1D5DB] font-medium">
                <div>{project.name}</div>
                <div className="md:hidden text-[12px] text-[#4B5563] dark:text-[#D1D5DB] mt-1">{project.department}</div>
              </td>
              <td className="py-4 px-4 text-[14px] md:text-[16px] text-[#4B5563] dark:text-[#D1D5DB] hidden md:table-cell">{project.department}</td>
              <td className="py-4 px-4 text-[12px] md:text-[14px] text-[#4B5563] dark:text-[#D1D5DB] max-w-xs truncate hidden lg:table-cell" title={project.indicator}>
                {project.indicator}
              </td>
              <td className="py-4 px-4 text-[14px] md:text-[16px] text-[#4B5563] dark:text-[#D1D5DB] text-right">
                {project.target.toLocaleString()} {project.unit}
              </td>
              <td className="py-4 px-4 text-[14px] md:text-[16px] text-[#4B5563] dark:text-[#D1D5DB] text-right">
                {project.actual.toLocaleString()} {project.unit}
              </td>
              <td className="py-4 px-4 text-[14px] md:text-[16px] text-[#4B5563] dark:text-[#D1D5DB]">
                <span className={getStatusClass(project.status)}>
                  {project.status}
                </span>
              </td>
              <td className="py-4 px-4 text-[14px] md:text-[16px] text-[#4B5563] dark:text-[#D1D5DB] hidden sm:table-cell">
                {project.lastUpdated}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      </div>
    </div>
  );
}

