import { useState, useMemo, useEffect } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import KPIWidget from "./KPIWidget";
import ProjectTable from "./ProjectTable";
import FilterBar from "./FilterBar";
import { projects, monthlyData, budgetData, alerts, recentActivity } from "@/data/mockData";
import type { Project } from "@/data/mockData";
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  ComposedChart,
} from "recharts";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Download, AlertCircle, TrendingUp, TrendingDown, Clock, CheckCircle2, XCircle, FileText, X } from "lucide-react";

export default function Dashboard() {
  const [selectedDepartment, setSelectedDepartment] = useState("all");
  const [selectedStatus, setSelectedStatus] = useState("all");
  const [selectedQuarter, setSelectedQuarter] = useState("all");
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  
  // Alerts state with localStorage persistence
  const [dismissedAlerts, setDismissedAlerts] = useState<number[]>(() => {
    const stored = localStorage.getItem("dismissedAlerts");
    return stored ? JSON.parse(stored) : [];
  });
  
  const [lastRepopulateTime, setLastRepopulateTime] = useState<number>(() => {
    const stored = localStorage.getItem("lastRepopulateTime");
    return stored ? parseInt(stored) : Date.now();
  });

  // Repopulate alerts if all are dismissed and 24 hours have passed
  useEffect(() => {
    const checkRepopulate = () => {
      const now = Date.now();
      const hoursSinceRepopulate = (now - lastRepopulateTime) / (1000 * 60 * 60);
      
      if (hoursSinceRepopulate >= 24 && dismissedAlerts.length === alerts.length) {
        // Reset dismissed alerts and update repopulate time
        setDismissedAlerts([]);
        setLastRepopulateTime(now);
        localStorage.setItem("dismissedAlerts", JSON.stringify([]));
        localStorage.setItem("lastRepopulateTime", now.toString());
      }
    };

    checkRepopulate();
    const interval = setInterval(checkRepopulate, 60 * 60 * 1000); // Check every hour
    
    return () => clearInterval(interval);
  }, [dismissedAlerts.length, lastRepopulateTime]);

  // Filter out dismissed alerts
  const visibleAlerts = useMemo(() => {
    return alerts.filter(alert => !dismissedAlerts.includes(alert.id));
  }, [dismissedAlerts]);

  const handleDismissAlert = (alertId: number) => {
    const newDismissed = [...dismissedAlerts, alertId];
    setDismissedAlerts(newDismissed);
    localStorage.setItem("dismissedAlerts", JSON.stringify(newDismissed));
  };

  // Get unique departments
  const departments = useMemo(() => {
    return Array.from(new Set(projects.map((p) => p.department)));
  }, []);

  // Filter projects based on selected filters
  const filteredProjects = useMemo(() => {
    return projects.filter((project) => {
      const matchesDepartment =
        selectedDepartment === "all" || project.department === selectedDepartment;
      const matchesStatus = selectedStatus === "all" || project.status === selectedStatus;
      return matchesDepartment && matchesStatus;
    });
  }, [selectedDepartment, selectedStatus]);

  // Calculate KPIs based on filtered projects
  const calculatedKPIs = useMemo(() => {
    const totalProjects = filteredProjects.length;
    const onTrackProjects = filteredProjects.filter((p) => p.status === "On Track").length;
    const completedProjects = filteredProjects.filter((p) => p.status === "Completed").length;
    const delayedProjects = filteredProjects.filter((p) => p.status === "Delayed").length;
    const onTrackPercentage = totalProjects > 0 ? (onTrackProjects / totalProjects) * 100 : 0;
    const completionRate = totalProjects > 0 ? (completedProjects / totalProjects) * 100 : 0;
    
    // Calculate total budget and expenditure
    const totalBudget = budgetData.reduce((sum, b) => sum + b.budget, 0);
    const totalExpenditure = budgetData.reduce((sum, b) => sum + b.expenditure, 0);
    const budgetUtilization = totalBudget > 0 ? (totalExpenditure / totalBudget) * 100 : 0;

    return [
      { title: "Total Projects", value: totalProjects, target: 12 },
      { title: "% Projects On Track", value: Math.round(onTrackPercentage), target: 80 },
      { title: "Quarterly Completion Rate", value: Math.round(completionRate), target: 70 },
      { title: "Budget Utilization", value: Math.round(budgetUtilization), target: 95 },
      { title: "Delayed Projects", value: delayedProjects, target: 0 },
      { title: "Total Budget (R)", value: Math.round(totalBudget / 1000000), target: 53 },
    ];
  }, [filteredProjects]);

  const handleRowClick = (project: Project) => {
    setSelectedProject(project);
    setIsDialogOpen(true);
  };

  // Chart colors from style guide
  const chartColors = {
    primary: "#1F2937",
    secondary: "#4B5563",
    accent: "#D63636",
  };

  return (
    <div className="mx-auto max-w-7xl">
      <div className="mb-6 md:mb-8 flex flex-col md:flex-row md:items-start md:justify-between gap-4">
        <div>
          <h1 className="text-[24px] md:text-[28px] font-bold text-[#1F2937] dark:text-[#F9FAFB] mb-2">
            Monitoring & Reporting Dashboard
          </h1>
          <p className="text-[14px] text-[#4B5563] dark:text-[#D1D5DB]">
            Overview of programme performance, KPIs, and quarterly reporting
          </p>
        </div>
        <div className="flex gap-2">
          <Button
            variant="outline"
            className="h-9 text-[12px] md:text-[14px] border-[#E5E7EB] dark:border-[#374151]"
          >
            <Download className="h-4 w-4 md:mr-2" />
            <span className="hidden md:inline">Export PDF</span>
            <span className="md:hidden">PDF</span>
          </Button>
          <Button
            variant="outline"
            className="h-9 text-[12px] md:text-[14px] border-[#E5E7EB] dark:border-[#374151]"
          >
            <Download className="h-4 w-4 md:mr-2" />
            <span className="hidden md:inline">Export Excel</span>
            <span className="md:hidden">Excel</span>
          </Button>
        </div>
      </div>

        <Tabs defaultValue="overview" className="w-full">
          <TabsList className="mb-8 bg-[#F4F4F4] border border-[#E5E7EB] rounded-[4px] dark:bg-[#111827] dark:border-[#374151]">
            <TabsTrigger
              value="overview"
              className="data-[state=active]:bg-[#1F2937] data-[state=active]:text-white text-[#4B5563] dark:text-[#D1D5DB]"
            >
              Overview
            </TabsTrigger>
            <TabsTrigger
              value="performance"
              className="data-[state=active]:bg-[#1F2937] data-[state=active]:text-white text-[#4B5563] dark:text-[#D1D5DB]"
            >
              Project Performance
            </TabsTrigger>
            <TabsTrigger
              value="analytics"
              className="data-[state=active]:bg-[#1F2937] data-[state=active]:text-white text-[#4B5563] dark:text-[#D1D5DB]"
            >
              KPI Analytics
            </TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-8">
            {/* Alerts Section */}
            <div className="mb-8">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-[20px] font-medium text-[#1F2937] dark:text-[#F9FAFB]">
                  Alerts & Notifications
                </h2>
                {visibleAlerts.filter(a => a.priority === "high").length > 0 && (
                  <Badge variant="destructive" className="bg-[#D63636] text-white">
                    {visibleAlerts.filter(a => a.priority === "high").length} High Priority
                  </Badge>
                )}
              </div>
              {visibleAlerts.length > 0 ? (
                <div className="space-y-3">
                  {visibleAlerts.map((alert) => (
                    <Alert
                      key={alert.id}
                      className={`relative rounded-none ${
                        alert.type === "error"
                          ? "border-[#D63636] bg-red-50 dark:bg-red-950/20"
                          : alert.type === "warning"
                          ? "border-yellow-500 bg-yellow-50 dark:bg-yellow-950/20"
                          : "border-blue-500 bg-blue-50 dark:bg-blue-950/20"
                      }`}
                    >
                      <AlertCircle className="h-4 w-4" />
                      <AlertTitle className="text-[14px] font-medium pr-8">
                        {alert.title}
                      </AlertTitle>
                      <AlertDescription className="text-[14px] text-[#4B5563] dark:text-[#D1D5DB]">
                        {alert.message}
                        {alert.projectName && (
                          <span className="font-medium ml-1">- {alert.projectName}</span>
                        )}
                        <span className="text-[12px] text-[#4B5563] dark:text-[#D1D5DB] ml-2">
                          {alert.timestamp}
                        </span>
                      </AlertDescription>
                      <button
                        onClick={() => handleDismissAlert(alert.id)}
                        className="absolute top-3 right-3 p-1 hover:bg-black/10 dark:hover:bg-white/10 rounded transition-colors"
                        aria-label="Dismiss alert"
                      >
                        <X className="h-4 w-4 text-[#4B5563] dark:text-[#D1D5DB]" />
                      </button>
                    </Alert>
                  ))}
                </div>
              ) : (
                <div className="text-[14px] text-[#4B5563] dark:text-[#D1D5DB] py-4">
                  No active alerts. All alerts have been dismissed.
                </div>
              )}
            </div>

            {/* KPI Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
              {calculatedKPIs.map((kpi, index) => (
                <KPIWidget
                  key={index}
                  title={kpi.title}
                  value={kpi.value}
                  target={kpi.target}
                  showIndicator={true}
                />
              ))}
            </div>
            {/* Programme Status Overview */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6">
              <div className="bg-[#F4F4F4] border border-[#E5E7EB] rounded-[4px] p-6 dark:bg-[#111827] dark:border-[#374151]">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-[20px] font-medium text-[#1F2937] dark:text-[#F9FAFB]">
                    Programme Status Overview
                  </h2>
                  <Button
                    variant="outline"
                    size="sm"
                    className="h-8 text-[14px] border-[#E5E7EB] dark:border-[#374151]"
                  >
                    <Download className="h-4 w-4 mr-2" />
                    Export
                  </Button>
                </div>
                <div className="grid grid-cols-2 gap-3 md:gap-4">
                  <div className="bg-white dark:bg-[#1F2937] rounded-[4px] p-4 border border-[#E5E7EB] dark:border-[#374151]">
                    <div className="flex items-center gap-2 mb-2">
                      <CheckCircle2 className="h-4 w-4 text-[#4B5563] dark:text-[#D1D5DB]" />
                      <div className="text-[12px] text-[#4B5563] dark:text-[#D1D5DB]">On Track</div>
                    </div>
                    <div className="text-[24px] font-semibold text-[#1F2937] dark:text-[#F9FAFB]">
                      {filteredProjects.filter(p => p.status === "On Track").length}
                    </div>
                    <div className="text-[12px] text-[#4B5563] dark:text-[#D1D5DB] mt-1">
                      {filteredProjects.length > 0
                        ? Math.round((filteredProjects.filter(p => p.status === "On Track").length / filteredProjects.length) * 100)
                        : 0}% of total
                    </div>
                  </div>
                  <div className="bg-white dark:bg-[#1F2937] rounded-[4px] p-4 border border-[#E5E7EB] dark:border-[#374151]">
                    <div className="flex items-center gap-2 mb-2">
                      <XCircle className="h-4 w-4 text-[#D63636]" />
                      <div className="text-[12px] text-[#4B5563] dark:text-[#D1D5DB]">Delayed</div>
                    </div>
                    <div className="text-[24px] font-semibold text-[#D63636]">
                      {filteredProjects.filter(p => p.status === "Delayed").length}
                    </div>
                    <div className="text-[12px] text-[#4B5563] dark:text-[#D1D5DB] mt-1">
                      {filteredProjects.length > 0
                        ? Math.round((filteredProjects.filter(p => p.status === "Delayed").length / filteredProjects.length) * 100)
                        : 0}% of total
                    </div>
                  </div>
                  <div className="bg-white dark:bg-[#1F2937] rounded-[4px] p-4 border border-[#E5E7EB] dark:border-[#374151]">
                    <div className="flex items-center gap-2 mb-2">
                      <CheckCircle2 className="h-4 w-4 text-[#4B5563] dark:text-[#D1D5DB]" />
                      <div className="text-[12px] text-[#4B5563] dark:text-[#D1D5DB]">Completed</div>
                    </div>
                    <div className="text-[24px] font-semibold text-[#1F2937] dark:text-[#F9FAFB]">
                      {filteredProjects.filter(p => p.status === "Completed").length}
                    </div>
                    <div className="text-[12px] text-[#4B5563] dark:text-[#D1D5DB] mt-1">
                      {filteredProjects.length > 0
                        ? Math.round((filteredProjects.filter(p => p.status === "Completed").length / filteredProjects.length) * 100)
                        : 0}% of total
                    </div>
                  </div>
                  <div className="bg-white dark:bg-[#1F2937] rounded-[4px] p-4 border border-[#E5E7EB] dark:border-[#374151]">
                    <div className="flex items-center gap-2 mb-2">
                      <TrendingUp className="h-4 w-4 text-[#4B5563] dark:text-[#D1D5DB]" />
                      <div className="text-[12px] text-[#4B5563] dark:text-[#D1D5DB]">Total</div>
                    </div>
                    <div className="text-[24px] font-semibold text-[#1F2937] dark:text-[#F9FAFB]">
                      {filteredProjects.length}
                    </div>
                    <div className="text-[12px] text-[#4B5563] dark:text-[#D1D5DB] mt-1">
                      Active programmes
                    </div>
                  </div>
                </div>
              </div>

              {/* Recent Activity */}
              <div className="bg-[#F4F4F4] border border-[#E5E7EB] rounded-[4px] p-6 dark:bg-[#111827] dark:border-[#374151]">
                <h2 className="text-[20px] font-medium text-[#1F2937] dark:text-[#F9FAFB] mb-4">
                  Recent Activity
                </h2>
                <div className="space-y-3">
                  {recentActivity.map((activity) => (
                    <div
                      key={activity.id}
                      className="flex items-start gap-3 p-3 bg-white dark:bg-[#1F2937] rounded-[4px] border border-[#E5E7EB] dark:border-[#374151]"
                    >
                      <div className="mt-1">
                        {activity.type === "submission" && (
                          <FileText className="h-4 w-4 text-[#4B5563] dark:text-[#D1D5DB]" />
                        )}
                        {activity.type === "approval" && (
                          <CheckCircle2 className="h-4 w-4 text-green-600" />
                        )}
                        {activity.type === "update" && (
                          <TrendingUp className="h-4 w-4 text-[#4B5563] dark:text-[#D1D5DB]" />
                        )}
                        {activity.type === "comment" && (
                          <AlertCircle className="h-4 w-4 text-blue-600" />
                        )}
                      </div>
                      <div className="flex-1">
                        <div className="text-[14px] text-[#1F2937] dark:text-[#F9FAFB]">
                          <span className="font-medium">{activity.user}</span> {activity.action}
                          {activity.projectName && (
                            <span className="font-medium"> - {activity.projectName}</span>
                          )}
                        </div>
                        <div className="text-[12px] text-[#4B5563] dark:text-[#D1D5DB] mt-1">
                          <Clock className="h-3 w-3 inline mr-1" />
                          {activity.timestamp}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="performance" className="space-y-4 md:space-y-6">
            <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-4 md:mb-6">
              <FilterBar
                selectedDepartment={selectedDepartment}
                selectedStatus={selectedStatus}
                selectedQuarter={selectedQuarter}
                onDepartmentChange={setSelectedDepartment}
                onStatusChange={setSelectedStatus}
                onQuarterChange={setSelectedQuarter}
                departments={departments}
              />
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  className="h-10 text-[12px] md:text-[14px] border-[#E5E7EB] dark:border-[#374151]"
                >
                  <Download className="h-4 w-4 md:mr-2" />
                  <span className="hidden md:inline">Export</span>
                </Button>
              </div>
            </div>
            <div className="bg-[#F4F4F4] border border-[#E5E7EB] rounded-[4px] p-4 dark:bg-[#111827] dark:border-[#374151]">
              <div className="mb-4 flex items-center justify-between">
                <h3 className="text-[18px] font-medium text-[#1F2937] dark:text-[#F9FAFB]">
                  Programme Performance Table
                </h3>
                <Badge variant="outline" className="text-[12px]">
                  {filteredProjects.length} programmes
                </Badge>
              </div>
              <ProjectTable projects={filteredProjects} onRowClick={handleRowClick} />
            </div>
          </TabsContent>

          <TabsContent value="analytics" className="space-y-8">
            {/* Budget vs Expenditure Chart */}
            <div className="bg-[#F4F4F4] border border-[#E5E7EB] rounded-[4px] p-6 dark:bg-[#111827] dark:border-[#374151]">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-[24px] font-semibold text-[#1F2937] dark:text-[#F9FAFB]">
                  Budget vs Expenditure
                </h2>
                <Button
                  variant="outline"
                  size="sm"
                  className="h-9 text-[14px] border-[#E5E7EB] dark:border-[#374151]"
                >
                  <Download className="h-4 w-4 mr-2" />
                  Export Report
                </Button>
              </div>
              <ResponsiveContainer width="100%" height={350}>
                <ComposedChart data={budgetData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                  <XAxis
                    dataKey="department"
                    stroke="#4B5563"
                    style={{ fontSize: "12px" }}
                    angle={-45}
                    textAnchor="end"
                    height={80}
                  />
                  <YAxis
                    yAxisId="left"
                    stroke="#4B5563"
                    style={{ fontSize: "12px" }}
                    tickFormatter={(value) => {
                      if (value >= 1000000000) {
                        return `R${(value / 1000000000).toFixed(1)}B`;
                      } else if (value >= 1000000) {
                        return `R${(value / 1000000).toFixed(0)}M`;
                      }
                      return `R${(value / 1000).toFixed(0)}K`;
                    }}
                  />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "#FFFFFF",
                      border: "1px solid #E5E7EB",
                      borderRadius: "4px",
                    }}
                    formatter={(value: number) => {
                      if (value >= 1000000000) {
                        return `R${(value / 1000000000).toFixed(2)}B`;
                      } else if (value >= 1000000) {
                        return `R${(value / 1000000).toFixed(2)}M`;
                      }
                      return `R${(value / 1000).toFixed(0)}K`;
                    }}
                  />
                  <Legend />
                  <Bar
                    yAxisId="left"
                    dataKey="budget"
                    fill={chartColors.secondary}
                    name="Budget"
                    opacity={0.7}
                  />
                  <Bar
                    yAxisId="left"
                    dataKey="expenditure"
                    fill={chartColors.accent}
                    name="Expenditure"
                  />
                </ComposedChart>
              </ResponsiveContainer>
              <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 md:gap-4">
                {budgetData.map((dept) => {
                  const variancePercent = ((dept.expenditure / dept.budget) * 100).toFixed(1);
                  const isOver = dept.expenditure > dept.budget;
                  return (
                    <div
                      key={dept.department}
                      className="bg-white dark:bg-[#1F2937] rounded-[4px] p-3 border border-[#E5E7EB] dark:border-[#374151]"
                    >
                      <div className="text-[12px] text-[#4B5563] dark:text-[#D1D5DB] mb-1">
                        {dept.department}
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-[16px] font-semibold text-[#1F2937] dark:text-[#F9FAFB]">
                          {variancePercent}%
                        </span>
                        {isOver ? (
                          <TrendingUp className="h-4 w-4 text-[#D63636]" />
                        ) : (
                          <TrendingDown className="h-4 w-4 text-[#4B5563]" />
                        )}
                      </div>
                      <div className="text-[12px] text-[#4B5563] dark:text-[#D1D5DB] mt-1">
                        Variance: {dept.variance >= 0 ? "+" : "-"}R{Math.abs(dept.variance) >= 1000000000 
                          ? (Math.abs(dept.variance) / 1000000000).toFixed(2) + "B"
                          : (Math.abs(dept.variance) / 1000000).toFixed(2) + "M"}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="bg-[#F4F4F4] border border-[#E5E7EB] rounded-[4px] p-6 dark:bg-[#111827] dark:border-[#374151]">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-[24px] font-semibold text-[#1F2937] dark:text-[#F9FAFB]">
                  Monthly Performance Trend
                </h2>
                <Button
                  variant="outline"
                  size="sm"
                  className="h-9 text-[14px] border-[#E5E7EB] dark:border-[#374151]"
                >
                  <Download className="h-4 w-4 mr-2" />
                  Export
                </Button>
              </div>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={monthlyData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                  <XAxis
                    dataKey="month"
                    stroke="#4B5563"
                    style={{ fontSize: "14px" }}
                  />
                  <YAxis stroke="#4B5563" style={{ fontSize: "14px" }} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "#FFFFFF",
                      border: "1px solid #E5E7EB",
                      borderRadius: "4px",
                    }}
                  />
                  <Legend />
                  <Line
                    type="monotone"
                    dataKey="target"
                    stroke={chartColors.primary}
                    strokeWidth={2}
                    name="Target"
                  />
                  <Line
                    type="monotone"
                    dataKey="actual"
                    stroke={chartColors.accent}
                    strokeWidth={2}
                    name="Actual"
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>

            <div className="bg-[#F4F4F4] border border-[#E5E7EB] rounded-[4px] p-6 dark:bg-[#111827] dark:border-[#374151]">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-[24px] font-semibold text-[#1F2937] dark:text-[#F9FAFB]">
                  Department Performance
                </h2>
                <Button
                  variant="outline"
                  size="sm"
                  className="h-9 text-[14px] border-[#E5E7EB] dark:border-[#374151]"
                >
                  <Download className="h-4 w-4 mr-2" />
                  Export
                </Button>
              </div>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart
                  data={departments.map((dept) => {
                    const deptProjects = filteredProjects.filter((p) => p.department === dept);
                    const avgActual =
                      deptProjects.length > 0
                        ? deptProjects.reduce((sum, p) => sum + p.actual, 0) / deptProjects.length
                        : 0;
                    return { department: dept, average: Math.round(avgActual) };
                  })}
                >
                  <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                  <XAxis
                    dataKey="department"
                    stroke="#4B5563"
                    style={{ fontSize: "14px" }}
                  />
                  <YAxis stroke="#4B5563" style={{ fontSize: "14px" }} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "#FFFFFF",
                      border: "1px solid #E5E7EB",
                      borderRadius: "4px",
                    }}
                  />
                  <Bar dataKey="average" fill={chartColors.secondary} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </TabsContent>
        </Tabs>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="bg-white border border-[#E5E7EB] rounded-[4px] dark:bg-[#111827] dark:border-[#374151]">
          <DialogHeader>
            <DialogTitle className="text-[20px] font-medium text-[#1F2937] dark:text-[#F9FAFB]">
              {selectedProject?.name}
            </DialogTitle>
          </DialogHeader>
          {selectedProject && (
            <div className="space-y-4 mt-4">
              <div>
                <span className="text-[14px] font-medium text-[#4B5563] dark:text-[#D1D5DB]">Department: </span>
                <span className="text-[16px] text-[#1F2937] dark:text-[#F9FAFB]">{selectedProject.department}</span>
              </div>
              <div>
                <span className="text-[14px] font-medium text-[#4B5563] dark:text-[#D1D5DB]">Indicator: </span>
                <span className="text-[16px] text-[#1F2937] dark:text-[#F9FAFB]">{selectedProject.indicator}</span>
              </div>
              <div>
                <span className="text-[14px] font-medium text-[#4B5563] dark:text-[#D1D5DB]">Quarter: </span>
                <span className="text-[16px] text-[#1F2937] dark:text-[#F9FAFB]">{selectedProject.quarter}</span>
              </div>
              <div>
                <span className="text-[14px] font-medium text-[#4B5563] dark:text-[#D1D5DB]">Target: </span>
                <span className="text-[16px] text-[#1F2937] dark:text-[#F9FAFB]">{selectedProject.target.toLocaleString()} {selectedProject.unit}</span>
              </div>
              <div>
                <span className="text-[14px] font-medium text-[#4B5563] dark:text-[#D1D5DB]">Actual: </span>
                <span className="text-[16px] text-[#1F2937] dark:text-[#F9FAFB]">{selectedProject.actual.toLocaleString()} {selectedProject.unit}</span>
              </div>
              <div>
                <span className="text-[14px] font-medium text-[#4B5563] dark:text-[#D1D5DB]">Status: </span>
                <span
                  className="text-[16px]"
                  style={{
                    color:
                      selectedProject.status === "Delayed"
                        ? "#D63636"
                        : selectedProject.status === "Completed"
                        ? "#4B5563"
                        : "#4B5563",
                  }}
                >
                  {selectedProject.status}
                </span>
              </div>
              <div>
                <span className="text-[14px] font-medium text-[#4B5563] dark:text-[#D1D5DB]">Last Updated: </span>
                <span className="text-[16px] text-[#1F2937] dark:text-[#F9FAFB]">{selectedProject.lastUpdated}</span>
              </div>
              <div>
                <span className="text-[14px] font-medium text-[#4B5563] dark:text-[#D1D5DB]">Variance: </span>
                <span
                  className="text-[16px]"
                  style={{
                    color: selectedProject.actual - selectedProject.target < 0 ? "#D63636" : "#4B5563",
                  }}
                >
                  {selectedProject.actual - selectedProject.target > 0 ? "+" : ""}
                  {selectedProject.actual - selectedProject.target}
                </span>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}

