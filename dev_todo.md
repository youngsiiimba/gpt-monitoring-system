---

# **POC Project Plan – Monitoring & Reporting System Dashboard**

## **1. Objective**

Create a bare-minimum proof-of-concept (POC) of the Monitoring & Reporting System dashboard using React, Tailwind CSS, and shadcn/ui. The POC will:

* Demonstrate capability to handle realistic data
* Show interactive dashboards with filters
* Include a simple workflow: mock login → view dashboard → filter data → view drilldowns
* Be deployable on Vercel for fast stakeholder review

---

## **2. Project Structure**

```
/frontend
│
├─ /public
│   └─ index.html
│
├─ /src
│   ├─ /components
│   │   ├─ Dashboard.jsx
│   │   ├─ KPIWidget.jsx
│   │   ├─ ProjectTable.jsx
│   │   ├─ FilterBar.jsx
│   │   └─ Login.jsx
│   │
│   ├─ /data
│   │   └─ mockData.js
│   │
│   ├─ /pages
│   │   └─ Home.jsx
│   │
│   │
│   └─ index.css
│   │
│   └─ App.tsx
│   │
│   └─ main.tsx
│
├─ tailwind.config.js
├─ package.json
└─ README.md
```

---

## **3. Components & Functionality**

### **3.1 Login Component**

* Simple login form (email/password)
* No authentication backend, just mock validation
* On submit → redirect to dashboard

### **3.2 Dashboard**

* Layout: 3 main sections/tabs:

  1. **Overview** – summary KPIs (cards showing % complete, total projects, etc.)
  2. **Project Performance** – table listing projects with status, target, actual, variance
  3. **KPI Analytics** – charts showing trend data, monthly performance, or target vs actual

### **3.3 KPI Widget**

* Card component showing one KPI (metric, target vs actual)
* Color-coded (green = on target, yellow = near target, red = below target)
* Props: title, value, target, percentage

### **3.4 Project Table**

* Table listing all mock projects
* Columns: Project Name, Department, Target, Actual, Status, Last Updated
* Filterable by Department and Status

### **3.5 Filter Bar**

* Dropdowns to filter table & charts:

  * Department
  * Quarter/Month
  * Status (On Track, Delayed, Completed)
* Filters update table and charts in real-time

---

## **4. Mock Data Design**

`mockData.js` should include realistic structures:

```javascript
export const projects = [
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
  ...
];

export const kpis = [
  { title: "Total Projects", value: 12, target: 12 },
  { title: "% Projects On Track", value: 75, target: 80 },
  { title: "Quarterly Completion Rate", value: 67, target: 70 },
];
```

---

## **5. Libraries & Dependencies**

* **React** – front-end framework
* **Tailwind CSS** – utility-first styling
* **shadcn/ui** – ready-to-use components
* **React Router** – navigation between login/dashboard
* **Recharts** – charts (line/bar/pie)
* Optional: **React Query** for state management if needed (overkill for POC, can skip)

---

## **6. Workflow**

1. User lands on Login page → enters credentials → clicks “Login”
2. Redirect to Dashboard
3. Dashboard shows:

   * KPI cards
   * Project table
   * Charts
4. User interacts with filters → updates table & charts
5. Mock “drilldown” by clicking a row → modal/popup showing project details

---

## **7. Styling & UX**

* Keep simple, clean layout
* Tailwind + shadcn/ui for rapid design
* Use color coding for KPI/Status
* Cards, tables, and charts responsive

---

## **8. Deployment on Vercel**

1. `npx create-react-app mrs-poc` or `vite` for faster build
2. Set up Tailwind + shadcn/ui
3. Push repo to GitHub
4. Link GitHub repo to Vercel
5. Automatic deploy on push → live POC URL
6. Optional: password-protect via simple environment variable for demo

---

## **9. Timeline **

| Task                                | 
| ----------------------------------- | 
| Project setup & repo                | 
| Build Login page                    | 
| Build Dashboard + KPI cards         | 
| Build Project Table + Filters       | 
| Build Charts + Analytics            | 
| Integrate mock data & interactivity | 
| Styling & final tweaks              | 
| **Total**                           | 

---

## **10. Success Criteria**

* Fully navigable dashboard (Login → Dashboard)
* Filters and mock data interactivity
* Realistic KPIs, project tables, charts
* Responsive UI, polished with Tailwind/shadcn

---
