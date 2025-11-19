import type { Project } from "../data/mockData.ts";
import { useState } from "react";

interface ProjectTableProps {
  projects: Project[];
  onRowClick?: (project: Project) => void;
}

export default function ProjectTable({ projects, onRowClick }: ProjectTableProps) {
  const [hoveredRow, setHoveredRow] = useState<number | null>(null);

  const getStatusColor = (status: Project["status"]) => {
    switch (status) {
      case "On Track":
        return "#4B5563";
      case "Delayed":
        return "#D63636";
      case "Completed":
        return "#4B5563";
      default:
        return "#4B5563";
    }
  };

  return (
    <div className="overflow-x-auto">
      <table className="w-full border-collapse">
        <thead>
          <tr className="border-b border-[#E5E7EB] dark:border-[#374151]">
            <th className="text-left py-3 px-3 text-[16px] font-bold text-[#1F2937] dark:text-[#F9FAFB]">
              Project Name
            </th>
            <th className="text-left py-3 px-3 text-[16px] font-bold text-[#1F2937] dark:text-[#F9FAFB]">
              Department
            </th>
            <th className="text-right py-3 px-3 text-[16px] font-bold text-[#1F2937] dark:text-[#F9FAFB]">
              Target
            </th>
            <th className="text-right py-3 px-3 text-[16px] font-bold text-[#1F2937] dark:text-[#F9FAFB]">
              Actual
            </th>
            <th className="text-left py-3 px-3 text-[16px] font-bold text-[#1F2937] dark:text-[#F9FAFB]">
              Status
            </th>
            <th className="text-left py-3 px-3 text-[16px] font-bold text-[#1F2937] dark:text-[#F9FAFB]">
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
              } ${onRowClick ? "cursor-pointer" : ""}`}
              onMouseEnter={() => setHoveredRow(project.id)}
              onMouseLeave={() => setHoveredRow(null)}
              onClick={() => onRowClick?.(project)}
            >
              <td className="py-3 px-3 text-[16px] text-[#4B5563] dark:text-[#D1D5DB]">{project.name}</td>
              <td className="py-3 px-3 text-[16px] text-[#4B5563] dark:text-[#D1D5DB]">{project.department}</td>
              <td className="py-3 px-3 text-[16px] text-[#4B5563] dark:text-[#D1D5DB] text-right">
                {project.target}
              </td>
              <td className="py-3 px-3 text-[16px] text-[#4B5563] dark:text-[#D1D5DB] text-right">
                {project.actual}
              </td>
              <td className="py-3 px-3 text-[16px] text-[#4B5563] dark:text-[#D1D5DB]">
                <span style={{ color: getStatusColor(project.status) }}>
                  {project.status}
                </span>
              </td>
              <td className="py-3 px-3 text-[16px] text-[#4B5563] dark:text-[#D1D5DB]">
                {project.lastUpdated}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

