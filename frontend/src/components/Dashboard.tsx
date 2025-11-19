import { useState, useMemo } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import KPIWidget from "./KPIWidget";
import ProjectTable from "./ProjectTable";
import FilterBar from "./FilterBar";
import { projects, monthlyData } from "@/data/mockData";
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
} from "recharts";

export default function Dashboard() {
  const [selectedDepartment, setSelectedDepartment] = useState("all");
  const [selectedStatus, setSelectedStatus] = useState("all");
  const [selectedQuarter, setSelectedQuarter] = useState("all");
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

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
    const onTrackPercentage = totalProjects > 0 ? (onTrackProjects / totalProjects) * 100 : 0;
    const completionRate = totalProjects > 0 ? (completedProjects / totalProjects) * 100 : 0;

    return [
      { title: "Total Projects", value: totalProjects, target: 12 },
      { title: "% Projects On Track", value: Math.round(onTrackPercentage), target: 80 },
      { title: "Quarterly Completion Rate", value: Math.round(completionRate), target: 70 },
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
      <div className="mb-8">
        <h1 className="text-[28px] font-bold text-[#1F2937] dark:text-[#F9FAFB] mb-2">
          Monitoring & Reporting Dashboard
        </h1>
        <p className="text-[14px] text-[#4B5563] dark:text-[#D1D5DB]">
          Overview of programme performance, KPIs, and quarterly reporting
        </p>
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
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
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
            <div className="bg-[#F4F4F4] border border-[#E5E7EB] rounded-[4px] p-6 dark:bg-[#111827] dark:border-[#374151]">
              <h2 className="text-[20px] font-medium text-[#1F2937] dark:text-[#F9FAFB] mb-4">
                Quick Stats
              </h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div>
                  <div className="text-[12px] text-[#4B5563] dark:text-[#D1D5DB] mb-1">Total Programmes</div>
                  <div className="text-[24px] font-semibold text-[#1F2937] dark:text-[#F9FAFB]">
                    {filteredProjects.length}
                  </div>
                </div>
                <div>
                  <div className="text-[12px] text-[#4B5563] dark:text-[#D1D5DB] mb-1">On Track</div>
                  <div className="text-[24px] font-semibold text-[#1F2937] dark:text-[#F9FAFB]">
                    {filteredProjects.filter(p => p.status === "On Track").length}
                  </div>
                </div>
                <div>
                  <div className="text-[12px] text-[#4B5563] dark:text-[#D1D5DB] mb-1">Delayed</div>
                  <div className="text-[24px] font-semibold text-[#D63636]">
                    {filteredProjects.filter(p => p.status === "Delayed").length}
                  </div>
                </div>
                <div>
                  <div className="text-[12px] text-[#4B5563] dark:text-[#D1D5DB] mb-1">Completed</div>
                  <div className="text-[24px] font-semibold text-[#1F2937] dark:text-[#F9FAFB]">
                    {filteredProjects.filter(p => p.status === "Completed").length}
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="performance" className="space-y-6">
            <FilterBar
              selectedDepartment={selectedDepartment}
              selectedStatus={selectedStatus}
              selectedQuarter={selectedQuarter}
              onDepartmentChange={setSelectedDepartment}
              onStatusChange={setSelectedStatus}
              onQuarterChange={setSelectedQuarter}
              departments={departments}
            />
            <div className="bg-[#F4F4F4] border border-[#E5E7EB] rounded-[4px] p-4 dark:bg-[#111827] dark:border-[#374151]">
              <ProjectTable projects={filteredProjects} onRowClick={handleRowClick} />
            </div>
          </TabsContent>

          <TabsContent value="analytics" className="space-y-8">
            <div className="bg-[#F4F4F4] border border-[#E5E7EB] rounded-[4px] p-6 dark:bg-[#111827] dark:border-[#374151]">
              <h2 className="text-[24px] font-semibold text-[#1F2937] dark:text-[#F9FAFB] mb-6">
                Monthly Performance Trend
              </h2>
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
              <h2 className="text-[24px] font-semibold text-[#1F2937] dark:text-[#F9FAFB] mb-6">
                Department Performance
              </h2>
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
                <span className="text-[14px] font-medium text-[#4B5563] dark:text-[#D1D5DB]">Target: </span>
                <span className="text-[16px] text-[#1F2937] dark:text-[#F9FAFB]">{selectedProject.target}</span>
              </div>
              <div>
                <span className="text-[14px] font-medium text-[#4B5563] dark:text-[#D1D5DB]">Actual: </span>
                <span className="text-[16px] text-[#1F2937] dark:text-[#F9FAFB]">{selectedProject.actual}</span>
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

