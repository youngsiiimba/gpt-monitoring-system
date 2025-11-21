import { useState, useMemo, useEffect } from "react";
import { Badge } from "./ui/badge.tsx";
import { Card } from "./ui/card.tsx";
import { Input } from "./ui/input.tsx";
import { auditLogs } from "../data/mockData.ts";
import { CheckCircle2 } from "lucide-react";
import { Search, Filter, User, Clock, FileText } from "lucide-react"; // adjust imports for icons

const roleColors: Record<string, string> = {
  programme_manager: "#3B82F6",
  reviewer: "#F59E0B",
  treasury_manager: "#10B981",
};

export default function AuditTrail() {
  const [searchQuery, setSearchQuery] = useState("");
  const [filterAction, setFilterAction] = useState<string>("all");
  const [filterRole, setFilterRole] = useState<string>("all");

  // Run onboarding effect once on mount
  useEffect(() => {
    const dismissed = localStorage.getItem("mrs_onboarding_dismissed");
    if (!dismissed) {
      window.dispatchEvent(
        new CustomEvent("openOnboarding", { detail: { page: "audit" } })
      );
    }
  }, []);

  const uniqueActions = useMemo(() => {
    return Array.from(new Set(auditLogs.map((log) => log.action)));
  }, []);

  const filteredLogs = useMemo(() => {
    return auditLogs.filter((log) => {
      const matchesSearch =
        log.user.toLowerCase().includes(searchQuery.toLowerCase()) ||
        log.action.toLowerCase().includes(searchQuery.toLowerCase()) ||
        log.projectName?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        log.details?.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesAction = filterAction === "all" || log.action === filterAction;
      const matchesRole = filterRole === "all" || log.userRole === filterRole;

      return matchesSearch && matchesAction && matchesRole;
    });
  }, [searchQuery, filterAction, filterRole]);

  const actionIcons: Record<string, JSX.Element> = {
    // Map actions to icons if needed
  };

  return (
    <div className="mx-auto max-w-7xl">
      {/* Header */}
      <div className="mb-6 md:mb-8">
        <h1 className="text-[24px] md:text-[28px] font-bold text-[#1F2937] dark:text-[#F9FAFB] mb-2">
          Audit Trail
        </h1>
        <p className="text-[14px] text-[#4B5563] dark:text-[#D1D5DB]">
          Complete history of all system actions, changes, and user activities
        </p>
      </div>

      {/* Filters */}
      <div className="mb-6 space-y-4">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative" data-onboarding="audit.search">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-[#4B5563] dark:text-[#D1D5DB]" />
            <Input
              type="text"
              placeholder="Search by user, action, project, or details..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 border-[#E5E7EB] dark:border-[#374151]"
            />
          </div>
        </div>

        <div className="flex flex-wrap gap-2">
          <div className="flex items-center gap-2" data-onboarding="audit.filter">
            <Filter className="h-4 w-4 text-[#4B5563] dark:text-[#D1D5DB]" />
            <span className="text-[12px] text-[#4B5563] dark:text-[#D1D5DB]">Action:</span>
            <select
              value={filterAction}
              onChange={(e) => setFilterAction(e.target.value)}
              className="px-3 py-1.5 border border-[#E5E7EB] dark:border-[#374151] bg-white dark:bg-[#1F2937] text-[#1F2937] dark:text-[#F9FAFB] text-[12px]"
            >
              <option value="all">All Actions</option>
              {uniqueActions.map((action) => (
                <option key={action} value={action}>
                  {action}
                </option>
              ))}
            </select>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-[12px] text-[#4B5563] dark:text-[#D1D5DB]">Role:</span>
            <select
              value={filterRole}
              onChange={(e) => setFilterRole(e.target.value)}
              className="px-3 py-1.5 border border-[#E5E7EB] dark:border-[#374151] bg-white dark:bg-[#1F2937] text-[#1F2937] dark:text-[#F9FAFB] text-[12px]"
            >
              <option value="all">All Roles</option>
              <option value="programme_manager">Programme Manager</option>
              <option value="reviewer">Reviewer</option>
              <option value="treasury_manager">Treasury Manager</option>
            </select>
          </div>
        </div>
      </div>

      {/* Audit Logs */}
      <div className="space-y-3">
        {filteredLogs.length > 0 ? (
          filteredLogs.map((log) => (
            <Card key={log.id} className="p-4 border border-[#E5E7EB] dark:border-[#374151]">
              <div className="flex items-start gap-4">
                <div className="mt-1">{actionIcons[log.action] || <FileText className="h-4 w-4 text-[#4B5563]" />}</div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-4 mb-2">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 flex-wrap mb-1">
                        <span className="text-[14px] font-medium text-[#1F2937] dark:text-[#F9FAFB]">{log.action}</span>
                        {log.projectName && <Badge variant="outline" className="text-[11px]">{log.projectName}</Badge>}
                      </div>
                      <div className="flex items-center gap-4 text-[12px] text-[#4B5563] dark:text-[#D1D5DB] flex-wrap">
                        <div className="flex items-center gap-1">
                          <User className="h-3 w-3" />
                          <span>{log.user}</span>
                          <Badge
                            style={{
                              backgroundColor: roleColors[log.userRole] || "#4B5563",
                              color: "white",
                              fontSize: "10px",
                              padding: "2px 6px",
                            }}
                            className="ml-2"
                          >
                            {log.userRole.replace("_", " ").replace(/\b\w/g, (l) => l.toUpperCase())}
                          </Badge>
                        </div>
                        <div className="flex items-center gap-1">
                          <Clock className="h-3 w-3" />
                          <span>{log.timestamp}</span>
                        </div>
                        {log.ipAddress && <span className="text-[11px] text-[#9CA3AF]">IP: {log.ipAddress}</span>}
                      </div>
                    </div>
                  </div>
                  {log.details && (
                    <div className="mt-2 text-[13px] text-[#4B5563] dark:text-[#D1D5DB] bg-[#F4F4F4] dark:bg-[#111827] p-2 border border-[#E5E7EB] dark:border-[#374151]">
                      {log.details}
                    </div>
                  )}
                </div>
              </div>
            </Card>
          ))
        ) : (
          <div className="text-center py-12 bg-[#F4F4F4] dark:bg-[#111827] border border-[#E5E7EB] dark:border-[#374151]">
            <FileText className="h-12 w-12 text-[#4B5563] dark:text-[#D1D5DB] mx-auto mb-3" />
            <p className="text-[14px] text-[#4B5563] dark:text-[#D1D5DB]">
              No audit logs found matching your criteria.
            </p>
          </div>
        )}
      </div>

      {/* Summary Stats */}
      <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="p-4 border border-[#E5E7EB] dark:border-[#374151]">
          <div className="text-[12px] text-[#4B5563] dark:text-[#D1D5DB] mb-1">Total Logs</div>
          <div className="text-[24px] font-semibold text-[#1F2937] dark:text-[#F9FAFB]">{auditLogs.length}</div>
        </Card>
        <Card className="p-4 border border-[#E5E7EB] dark:border-[#374151]">
          <div className="text-[12px] text-[#4B5563] dark:text-[#D1D5DB] mb-1">Filtered Results</div>
          <div className="text-[24px] font-semibold text-[#1F2937] dark:text-[#F9FAFB]">{filteredLogs.length}</div>
        </Card>
        <Card className="p-4 border border-[#E5E7EB] dark:border-[#374151]">
          <div className="text-[12px] text-[#4B5563] dark:text-[#D1D5DB] mb-1">Unique Users</div>
          <div className="text-[24px] font-semibold text-[#1F2937] dark:text-[#F9FAFB]">{new Set(auditLogs.map((log) => log.user)).size}</div>
        </Card>
      </div>
    </div>
  );
}

