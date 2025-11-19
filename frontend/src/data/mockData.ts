export interface Project {
  id: number;
  name: string;
  department: string;
  target: number;
  actual: number;
  status: "On Track" | "Delayed" | "Completed";
  lastUpdated: string;
}

export interface KPI {
  title: string;
  value: number;
  target: number;
}

export const projects: Project[] = [
  {
    id: 1,
    name: "Budget Tracking",
    department: "Finance",
    target: 100,
    actual: 95,
    status: "On Track",
    lastUpdated: "2025-11-15",
  },
  {
    id: 2,
    name: "Education Outreach",
    department: "Education",
    target: 80,
    actual: 60,
    status: "Delayed",
    lastUpdated: "2025-11-12",
  },
  {
    id: 3,
    name: "Healthcare Access",
    department: "Health",
    target: 90,
    actual: 88,
    status: "On Track",
    lastUpdated: "2025-11-14",
  },
  {
    id: 4,
    name: "Infrastructure Upgrade",
    department: "Public Works",
    target: 75,
    actual: 75,
    status: "Completed",
    lastUpdated: "2025-11-10",
  },
  {
    id: 5,
    name: "Digital Services",
    department: "IT",
    target: 85,
    actual: 70,
    status: "Delayed",
    lastUpdated: "2025-11-13",
  },
  {
    id: 6,
    name: "Community Safety",
    department: "Public Safety",
    target: 95,
    actual: 92,
    status: "On Track",
    lastUpdated: "2025-11-15",
  },
  {
    id: 7,
    name: "Environmental Initiative",
    department: "Environment",
    target: 70,
    actual: 65,
    status: "Delayed",
    lastUpdated: "2025-11-11",
  },
  {
    id: 8,
    name: "Transportation Network",
    department: "Transportation",
    target: 88,
    actual: 85,
    status: "On Track",
    lastUpdated: "2025-11-14",
  },
  {
    id: 9,
    name: "Housing Program",
    department: "Housing",
    target: 80,
    actual: 78,
    status: "On Track",
    lastUpdated: "2025-11-13",
  },
  {
    id: 10,
    name: "Youth Development",
    department: "Education",
    target: 65,
    actual: 65,
    status: "Completed",
    lastUpdated: "2025-11-09",
  },
  {
    id: 11,
    name: "Senior Services",
    department: "Health",
    target: 90,
    actual: 87,
    status: "On Track",
    lastUpdated: "2025-11-15",
  },
  {
    id: 12,
    name: "Economic Development",
    department: "Finance",
    target: 75,
    actual: 60,
    status: "Delayed",
    lastUpdated: "2025-11-12",
  },
];

export const kpis: KPI[] = [
  { title: "Total Projects", value: 12, target: 12 },
  { title: "% Projects On Track", value: 75, target: 80 },
  { title: "Quarterly Completion Rate", value: 67, target: 70 },
];

// Chart data for analytics
export interface ChartDataPoint {
  month: string;
  target: number;
  actual: number;
}

export const monthlyData: ChartDataPoint[] = [
  { month: "Jan", target: 80, actual: 75 },
  { month: "Feb", target: 82, actual: 78 },
  { month: "Mar", target: 85, actual: 80 },
  { month: "Apr", target: 88, actual: 82 },
  { month: "May", target: 90, actual: 85 },
  { month: "Jun", target: 92, actual: 88 },
];

// Budget vs Expenditure data
export interface BudgetData {
  department: string;
  budget: number;
  expenditure: number;
  variance: number;
}

export const budgetData: BudgetData[] = [
  { department: "Finance", budget: 5000000, expenditure: 4750000, variance: -250000 },
  { department: "Education", budget: 12000000, expenditure: 10800000, variance: -1200000 },
  { department: "Health", budget: 15000000, expenditure: 14250000, variance: -750000 },
  { department: "Public Works", budget: 8000000, expenditure: 7600000, variance: -400000 },
  { department: "IT", budget: 3000000, expenditure: 2850000, variance: -150000 },
  { department: "Public Safety", budget: 10000000, expenditure: 9500000, variance: -500000 },
];

