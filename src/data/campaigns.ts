export interface Campaign {
  id: string;
  name: string;
  enabled: boolean;
  list: string;
  agent: string;
  createdAt: string;
  dials: number;
  answered: number;
  minutesUsed: number;
  status: "completed" | "running";
}

export const campaigns: Campaign[] = [
  {
    id: "1",
    name: "Q1 Lead Outreach",
    enabled: true,
    list: "Acme Corporation",
    agent: "Outreach Agent",
    createdAt: "Jan 15, 2025",
    dials: 320,
    answered: 185,
    minutesUsed: 412,
    status: "running",
  },
  {
    id: "2",
    name: "Customer Satisfaction Survey",
    enabled: true,
    list: "Global Solutions Ltd.",
    agent: "Survey Caller",
    createdAt: "Jan 10, 2025",
    dials: 150,
    answered: 98,
    minutesUsed: 203,
    status: "running",
  },
  {
    id: "3",
    name: "Renewal Reminders",
    enabled: false,
    list: "CloudNine Services",
    agent: "Retention Agent",
    createdAt: "Dec 20, 2024",
    dials: 540,
    answered: 312,
    minutesUsed: 678,
    status: "completed",
  },
  {
    id: "4",
    name: "Product Demo Booking",
    enabled: false,
    list: "TechStart Inc.",
    agent: "Appointment Setter",
    createdAt: "Jan 5, 2025",
    dials: 210,
    answered: 127,
    minutesUsed: 295,
    status: "completed",
  },
  {
    id: "5",
    name: "Win-Back Campaign",
    enabled: true,
    list: "NextGen Media",
    agent: "Retention Agent",
    createdAt: "Jan 22, 2025",
    dials: 88,
    answered: 42,
    minutesUsed: 96,
    status: "running",
  },
  {
    id: "6",
    name: "Onboarding Calls",
    enabled: false,
    list: "Pioneer Healthcare",
    agent: "Onboarding Guide",
    createdAt: "Jan 18, 2025",
    dials: 75,
    answered: 61,
    minutesUsed: 154,
    status: "completed",
  },
  {
    id: "7",
    name: "Upsell Blitz",
    enabled: true,
    list: "Sunrise Retail",
    agent: "Sales Assistant",
    createdAt: "Jan 25, 2025",
    dials: 45,
    answered: 20,
    minutesUsed: 48,
    status: "running",
  },
  {
    id: "8",
    name: "Payment Follow-Up",
    enabled: false,
    list: "BlueWave Logistics",
    agent: "Billing Helper",
    createdAt: "Dec 15, 2024",
    dials: 390,
    answered: 245,
    minutesUsed: 520,
    status: "completed",
  },
];
