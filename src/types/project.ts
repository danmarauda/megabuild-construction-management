export interface Worker {
  id: string;
  name: string;
  avatar: string;
  role?: string;
  phone?: string;
  email?: string;
}

export interface Task {
  id: string;
  title: string;
  start: string;
  end: string;
  duration: number;
  progress: number;
  assignee: Worker;
  status: 'pending' | 'in-progress' | 'completed' | 'overdue';
  taskNumber?: string;
  hours?: number;
}

export interface Project {
  id: string;
  title: string;
  customer: {
    name: string;
    address?: string;
    phone?: string;
    email?: string;
  };
  status: 'active' | 'completed' | 'on-hold';
  startDate: string;
  endDate: string;
  completionPercentage: number;
  tasks: Task[];
  team: Worker[];
  financials?: {
    estimatedCost: number;
    actualCost: number;
    revenue: number;
    profit: number;
  };
  projectManager?: Worker;
  salesPerson?: Worker;
}

export interface Customer {
  id: string;
  name: string;
  email: string;
  phone: string;
  address: string;
  projects: string[];
  status: 'active' | 'inactive';
  avatar: string;
}

export interface Lead {
  id: string;
  name: string;
  email: string;
  phone: string;
  address: string;
  status: 'new' | 'contacted' | 'qualified' | 'proposal' | 'converted' | 'lost';
  source: string;
  notes: string;
  assignee: Worker;
  estimatedValue: number;
  createdAt: string;
  convertedAt?: string;
}

export interface InvoiceItem {
  description: string;
  amount: number;
}

export interface Invoice {
  id: string;
  projectId: string;
  customerId: string;
  status: 'draft' | 'sent' | 'viewed' | 'pending' | 'paid' | 'overdue';
  amount: number;
  createdAt: string;
  dueDate: string;
  paidAt?: string;
  items: InvoiceItem[];
}

export interface Estimate {
  id: string;
  leadId: string;
  status: 'draft' | 'sent' | 'viewed' | 'approved' | 'rejected';
  amount: number;
  createdAt: string;
  validUntil: string;
  sentAt?: string;
  viewedAt?: string;
  approvedAt?: string;
  rejectedAt?: string;
  items: InvoiceItem[];
}

export interface TimeEntry {
  id: string;
  workerId: string;
  projectId: string;
  taskId: string;
  date: string;
  hours: number;
  notes: string;
}

export interface File {
  id: string;
  name: string;
  type: 'image' | 'document' | 'spreadsheet' | 'other';
  size: number;
  projectId: string;
  uploadedAt: string;
  uploadedBy: Worker;
  url: string;
}

export interface FinancialSummary {
  revenue: number;
  balance: number;
  feesEarned: number;
  chargebackRate: number;
  totalTransactions: number;
  plannedPayouts: number;
  successfulPayments: number;
  failedPayments: number;
}
