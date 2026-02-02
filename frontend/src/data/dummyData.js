export const managers = [
  {
    id: 1,
    name: "John Smith",
    email: "john.smith@company.com",
    branch: "New York",
    role: "Manager",
    tasksCompleted: 45,
    tasksPending: 8,
    joinedDate: "2023-01-15",
    avatar: "https://ui-avatars.com/api/?name=John+Smith&background=0ea5e9&color=fff"
  },
  {
    id: 2,
    name: "Sarah Johnson",
    email: "sarah.j@company.com",
    branch: "Los Angeles",
    role: "Manager",
    tasksCompleted: 52,
    tasksPending: 5,
    joinedDate: "2022-11-20",
    avatar: "https://ui-avatars.com/api/?name=Sarah+Johnson&background=8b5cf6&color=fff"
  },
  {
    id: 3,
    name: "Michael Chen",
    email: "m.chen@company.com",
    branch: "Chicago",
    role: "Manager",
    tasksCompleted: 38,
    tasksPending: 12,
    joinedDate: "2023-03-10",
    avatar: "https://ui-avatars.com/api/?name=Michael+Chen&background=f59e0b&color=fff"
  },
  {
    id: 4,
    name: "Emily Davis",
    email: "emily.d@company.com",
    branch: "New York",
    role: "Manager",
    tasksCompleted: 61,
    tasksPending: 3,
    joinedDate: "2022-08-05",
    avatar: "https://ui-avatars.com/api/?name=Emily+Davis&background=ec4899&color=fff"
  },
  {
    id: 5,
    name: "Robert Martinez",
    email: "r.martinez@company.com",
    branch: "Houston",
    role: "Manager",
    tasksCompleted: 29,
    tasksPending: 15,
    joinedDate: "2023-05-22",
    avatar: "https://ui-avatars.com/api/?name=Robert+Martinez&background=10b981&color=fff"
  }
];

export const tasks = [
  {
    id: 1,
    title: "Q1 Sales Report Preparation",
    description: "Compile and analyze Q1 sales data for presentation to stakeholders",
    assignedTo: 1,
    status: "completed",
    priority: "high",
    dueDate: "2024-01-25",
    createdDate: "2024-01-10",
    branch: "New York",
    completedDate: "2024-01-24"
  },
  {
    id: 2,
    title: "Customer Satisfaction Survey",
    description: "Conduct monthly customer satisfaction survey and compile results",
    assignedTo: 2,
    status: "in-progress",
    priority: "medium",
    dueDate: "2024-02-05",
    createdDate: "2024-01-28",
    branch: "Los Angeles"
  },
  {
    id: 3,
    title: "Team Training Workshop",
    description: "Organize and conduct product knowledge training for new team members",
    assignedTo: 3,
    status: "pending",
    priority: "high",
    dueDate: "2024-02-10",
    createdDate: "2024-01-20",
    branch: "Chicago"
  },
  {
    id: 4,
    title: "Inventory Audit",
    description: "Complete quarterly inventory audit and update management system",
    assignedTo: 4,
    status: "overdue",
    priority: "high",
    dueDate: "2024-01-30",
    createdDate: "2024-01-15",
    branch: "New York"
  },
  {
    id: 5,
    title: "Budget Planning Meeting",
    description: "Prepare budget proposals for Q2 and schedule department meetings",
    assignedTo: 1,
    status: "in-progress",
    priority: "high",
    dueDate: "2024-02-08",
    createdDate: "2024-01-25",
    branch: "New York"
  },
  {
    id: 6,
    title: "Website Content Update",
    description: "Review and update product listings and promotional content on website",
    assignedTo: 2,
    status: "completed",
    priority: "low",
    dueDate: "2024-01-28",
    createdDate: "2024-01-18",
    branch: "Los Angeles",
    completedDate: "2024-01-27"
  },
  {
    id: 7,
    title: "Supplier Contract Renewal",
    description: "Review terms and negotiate contract renewal with key suppliers",
    assignedTo: 5,
    status: "pending",
    priority: "medium",
    dueDate: "2024-02-15",
    createdDate: "2024-01-22",
    branch: "Houston"
  },
  {
    id: 8,
    title: "Performance Review Process",
    description: "Complete annual performance reviews for all team members",
    assignedTo: 3,
    status: "overdue",
    priority: "high",
    dueDate: "2024-01-31",
    createdDate: "2024-01-12",
    branch: "Chicago"
  },
  {
    id: 9,
    title: "Marketing Campaign Launch",
    description: "Coordinate with marketing team to launch new product campaign",
    assignedTo: 4,
    status: "in-progress",
    priority: "high",
    dueDate: "2024-02-12",
    createdDate: "2024-01-29",
    branch: "New York"
  },
  {
    id: 10,
    title: "Employee Onboarding Program",
    description: "Develop comprehensive onboarding program for new hires",
    assignedTo: 5,
    status: "pending",
    priority: "medium",
    dueDate: "2024-02-20",
    createdDate: "2024-01-26",
    branch: "Houston"
  },
  {
    id: 11,
    title: "IT Infrastructure Upgrade",
    description: "Plan and execute IT infrastructure improvements for office",
    assignedTo: 1,
    status: "pending",
    priority: "low",
    dueDate: "2024-03-01",
    createdDate: "2024-01-30",
    branch: "New York"
  },
  {
    id: 12,
    title: "Client Presentation Preparation",
    description: "Prepare quarterly business review presentation for major client",
    assignedTo: 2,
    status: "in-progress",
    priority: "high",
    dueDate: "2024-02-06",
    createdDate: "2024-01-27",
    branch: "Los Angeles"
  }
];

export const branches = [
  {
    id: 1,
    name: "New York",
    address: "123 Broadway Ave, New York, NY 10001",
    phone: "+1 (212) 555-0100",
    managersCount: 2,
    tasksCount: 15,
    established: "2020-01-15"
  },
  {
    id: 2,
    name: "Los Angeles",
    address: "456 Sunset Blvd, Los Angeles, CA 90028",
    phone: "+1 (323) 555-0200",
    managersCount: 1,
    tasksCount: 12,
    established: "2020-06-20"
  },
  {
    id: 3,
    name: "Chicago",
    address: "789 Michigan Ave, Chicago, IL 60611",
    phone: "+1 (312) 555-0300",
    managersCount: 1,
    tasksCount: 8,
    established: "2021-03-10"
  },
  {
    id: 4,
    name: "Houston",
    address: "321 Main Street, Houston, TX 77002",
    phone: "+1 (713) 555-0400",
    managersCount: 1,
    tasksCount: 10,
    established: "2021-09-05"
  }
];

export const currentUser = {
  id: 1,
  name: "Admin User",
  email: "admin@company.com",
  role: "admin",
  avatar: "https://ui-avatars.com/api/?name=Admin+User&background=0ea5e9&color=fff"
};
