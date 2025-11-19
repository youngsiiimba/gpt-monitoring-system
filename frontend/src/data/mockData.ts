export interface Project {
  id: number;
  name: string;
  department: string;
  indicator: string;
  target: number;
  actual: number;
  unit: string;
  status: "On Track" | "Delayed" | "Completed";
  lastUpdated: string;
  quarter: string;
}

export interface KPI {
  title: string;
  value: number;
  target: number;
}

export const projects: Project[] = [
  {
    id: 1,
    name: "Programme 1: Administration",
    department: "Gauteng Provincial Treasury",
    indicator: "Percentage of quarterly reports submitted on time",
    target: 100,
    actual: 95,
    unit: "%",
    status: "On Track",
    lastUpdated: "2025-11-15",
    quarter: "Q2 2025/26",
  },
  {
    id: 2,
    name: "Programme 2: Health",
    department: "Gauteng Department of Health",
    indicator: "Number of primary healthcare facilities operational",
    target: 380,
    actual: 285,
    unit: "facilities",
    status: "Delayed",
    lastUpdated: "2025-11-12",
    quarter: "Q2 2025/26",
  },
  {
    id: 3,
    name: "Programme 3: Education",
    department: "Gauteng Department of Education",
    indicator: "Percentage of no-fee schools with nutrition programmes",
    target: 100,
    actual: 98,
    unit: "%",
    status: "On Track",
    lastUpdated: "2025-11-14",
    quarter: "Q2 2025/26",
  },
  {
    id: 4,
    name: "Programme 4: Infrastructure Development",
    department: "Gauteng Department of Infrastructure Development",
    indicator: "Number of infrastructure projects completed",
    target: 45,
    actual: 45,
    unit: "projects",
    status: "Completed",
    lastUpdated: "2025-11-10",
    quarter: "Q2 2025/26",
  },
  {
    id: 5,
    name: "Programme 5: Social Development",
    department: "Gauteng Department of Social Development",
    indicator: "Number of social workers deployed",
    target: 1200,
    actual: 840,
    unit: "social workers",
    status: "Delayed",
    lastUpdated: "2025-11-13",
    quarter: "Q2 2025/26",
  },
  {
    id: 6,
    name: "Programme 6: Community Safety",
    department: "Gauteng Department of Community Safety",
    indicator: "Percentage of police stations with functional CCTV systems",
    target: 95,
    actual: 92,
    unit: "%",
    status: "On Track",
    lastUpdated: "2025-11-15",
    quarter: "Q2 2025/26",
  },
  {
    id: 7,
    name: "Programme 7: Economic Development",
    department: "Gauteng Department of Economic Development",
    indicator: "Number of SMMEs supported through development programmes",
    target: 5000,
    actual: 3250,
    unit: "SMMEs",
    status: "Delayed",
    lastUpdated: "2025-11-11",
    quarter: "Q2 2025/26",
  },
  {
    id: 8,
    name: "Programme 8: Human Settlements",
    department: "Gauteng Department of Human Settlements",
    indicator: "Number of housing units delivered",
    target: 15000,
    actual: 14250,
    unit: "units",
    status: "On Track",
    lastUpdated: "2025-11-14",
    quarter: "Q2 2025/26",
  },
  {
    id: 9,
    name: "Programme 9: Roads and Transport",
    department: "Gauteng Department of Roads and Transport",
    indicator: "Kilometres of roads maintained",
    target: 8500,
    actual: 8160,
    unit: "km",
    status: "On Track",
    lastUpdated: "2025-11-13",
    quarter: "Q2 2025/26",
  },
  {
    id: 10,
    name: "Programme 10: Agriculture and Rural Development",
    department: "Gauteng Department of Agriculture and Rural Development",
    indicator: "Number of emerging farmers supported",
    target: 250,
    actual: 250,
    unit: "farmers",
    status: "Completed",
    lastUpdated: "2025-11-09",
    quarter: "Q2 2025/26",
  },
  {
    id: 11,
    name: "Programme 11: Sport, Arts, Culture and Recreation",
    department: "Gauteng Department of Sport, Arts, Culture and Recreation",
    indicator: "Number of youth participating in sports development programmes",
    target: 50000,
    actual: 48500,
    unit: "participants",
    status: "On Track",
    lastUpdated: "2025-11-15",
    quarter: "Q2 2025/26",
  },
  {
    id: 12,
    name: "Programme 12: e-Government",
    department: "Gauteng Department of e-Government",
    indicator: "Percentage of government services available online",
    target: 80,
    actual: 64,
    unit: "%",
    status: "Delayed",
    lastUpdated: "2025-11-12",
    quarter: "Q2 2025/26",
  },
];

export const kpis: KPI[] = [
  { title: "Total Programmes", value: 12, target: 12 },
  { title: "% Programmes On Track", value: 67, target: 80 },
  { title: "Quarterly Report Submission Rate", value: 92, target: 100 },
];

// Chart data for analytics
export interface ChartDataPoint {
  month: string;
  target: number;
  actual: number;
}

export const monthlyData: ChartDataPoint[] = [
  { month: "Jul", target: 85, actual: 82 },
  { month: "Aug", target: 87, actual: 84 },
  { month: "Sep", target: 90, actual: 86 },
  { month: "Oct", target: 92, actual: 89 },
  { month: "Nov", target: 95, actual: 91 },
  { month: "Dec", target: 98, actual: 94 },
];

// Budget vs Expenditure data
export interface BudgetData {
  department: string;
  budget: number;
  expenditure: number;
  variance: number;
}

export const budgetData: BudgetData[] = [
  { department: "Gauteng Provincial Treasury", budget: 850000000, expenditure: 807500000, variance: -42500000 },
  { department: "Gauteng Department of Education", budget: 52000000000, expenditure: 49400000000, variance: -2600000000 },
  { department: "Gauteng Department of Health", budget: 48000000000, expenditure: 45600000000, variance: -2400000000 },
  { department: "Gauteng Department of Infrastructure Development", budget: 8500000000, expenditure: 8075000000, variance: -425000000 },
  { department: "Gauteng Department of e-Government", budget: 1200000000, expenditure: 1140000000, variance: -60000000 },
  { department: "Gauteng Department of Community Safety", budget: 3200000000, expenditure: 3040000000, variance: -160000000 },
];

// Alerts/Notifications
export interface Alert {
  id: number;
  type: "warning" | "error" | "info";
  title: string;
  message: string;
  projectName?: string;
  timestamp: string;
  priority: "high" | "medium" | "low";
}

export const alerts: Alert[] = [
  {
    id: 1,
    type: "error",
    title: "Programme Indicator Delayed",
    message: "Programme 2: Health - Primary healthcare facilities indicator is 25% behind target",
    projectName: "Programme 2: Health",
    timestamp: "2025-11-15 10:30",
    priority: "high",
  },
  {
    id: 2,
    type: "warning",
    title: "Quarterly Report Submission Pending",
    message: "3 programmes awaiting Q2 2025/26 quarterly report submission",
    timestamp: "2025-11-15 09:15",
    priority: "medium",
  },
  {
    id: 3,
    type: "error",
    title: "Programme Indicator Delayed",
    message: "Programme 5: Social Development - Social workers deployment is 30% behind target",
    projectName: "Programme 5: Social Development",
    timestamp: "2025-11-14 16:45",
    priority: "high",
  },
  {
    id: 4,
    type: "info",
    title: "Quarterly Report Deadline",
    message: "Q2 2025/26 quarterly performance report submission deadline in 5 days",
    timestamp: "2025-11-14 14:20",
    priority: "medium",
  },
];

// Recent Activity
export interface Activity {
  id: number;
  type: "submission" | "approval" | "update" | "comment";
  user: string;
  action: string;
  projectName?: string;
  timestamp: string;
}

export const recentActivity: Activity[] = [
  {
    id: 1,
    type: "submission",
    user: "Thabo Mthembu",
    action: "submitted Q2 2025/26 quarterly report",
    projectName: "Programme 3: Education",
    timestamp: "2 hours ago",
  },
  {
    id: 2,
    type: "approval",
    user: "Nomsa Dlamini",
    action: "approved quarterly report",
    projectName: "Programme 4: Infrastructure Development",
    timestamp: "4 hours ago",
  },
  {
    id: 3,
    type: "update",
    user: "Sipho Nkosi",
    action: "updated indicator progress",
    projectName: "Programme 6: Community Safety",
    timestamp: "6 hours ago",
  },
  {
    id: 4,
    type: "comment",
    user: "Lindiwe Khumalo",
    action: "added review comment",
    projectName: "Programme 2: Health",
    timestamp: "1 day ago",
  },
  {
    id: 5,
    type: "submission",
    user: "Mandla Zulu",
    action: "submitted Q2 2025/26 quarterly report",
    projectName: "Programme 8: Human Settlements",
    timestamp: "1 day ago",
  },
];

