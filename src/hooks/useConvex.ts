import { useQuery } from "convex/react";
import type {
  Project,
  Task,
  Worker,
  Customer,
  Lead,
  Invoice,
  Estimate,
  TimeEntry,
  FinancialSummary,
} from "../types/project";

// Import from generated Convex API
import { api } from "../../convex/_generated/api.js";

// Helper function to transform Convex data to app types
function transformProject(project: any): Project {
  return {
    id: project._id,
    title: project.title,
    customer: {
      name: project.customerName,
      email: project.customerEmail,
      phone: project.customerPhone,
      address: project.customerAddress,
    },
    status: project.status as any,
    startDate: project.startDate,
    endDate: project.endDate,
    completionPercentage: project.completionPercentage,
    tasks: [],
    team: [],
    financials: project.financials,
  };
}

function transformWorker(worker: any): Worker {
  return {
    id: worker._id,
    name: worker.name,
    avatar: worker.avatar,
    role: worker.role,
    phone: worker.phone,
    email: worker.email,
  };
}

function transformCustomer(customer: any): Customer {
  return {
    id: customer._id,
    name: customer.name,
    email: customer.email,
    phone: customer.phone,
    address: customer.address,
    status: customer.status as any,
    avatar: customer.avatar,
    projects: [],
  };
}

function transformLead(lead: any, assignee: Worker): Lead {
  return {
    id: lead._id,
    name: lead.name,
    email: lead.email,
    phone: lead.phone,
    address: lead.address,
    status: lead.status as any,
    source: lead.source,
    notes: lead.notes,
    assignee,
    estimatedValue: lead.estimatedValue,
    createdAt: lead.createdAt,
    convertedAt: lead.convertedAt,
  };
}

function transformInvoice(invoice: any): Invoice {
  return {
    id: invoice._id,
    projectId: invoice.projectId,
    customerId: invoice.customerId,
    status: invoice.status as any,
    amount: invoice.amount,
    createdAt: invoice.createdAt,
    dueDate: invoice.dueDate,
    paidAt: invoice.paidAt,
    items: invoice.items,
  };
}

function transformEstimate(estimate: any): Estimate {
  return {
    id: estimate._id,
    leadId: estimate.leadId,
    status: estimate.status as any,
    amount: estimate.amount,
    createdAt: estimate.createdAt,
    validUntil: estimate.validUntil,
    sentAt: estimate.sentAt,
    viewedAt: estimate.viewedAt,
    approvedAt: estimate.approvedAt,
    rejectedAt: estimate.rejectedAt,
    items: estimate.items,
  };
}

function transformTimeEntry(entry: any): TimeEntry {
  return {
    id: entry._id,
    workerId: entry.workerId,
    projectId: entry.projectId,
    taskId: entry.taskId,
    date: entry.date,
    hours: entry.hours,
    notes: entry.notes,
  };
}

// Type for consistent hook return values
type UseQueryResult<T> = {
  data: T[];
  isLoading: boolean;
};

// Custom hooks for data fetching with consistent return type
export function useProjects(): UseQueryResult<Project> {
  const projects = useQuery(api.projects.listProjects);
  return {
    data: projects?.map((project: any) => transformProject(project)) ?? [],
    isLoading: projects === undefined,
  };
}

export function useProject(id: string) {
  const project = useQuery(api.projects.getProject, { id: id as any });
  return project ? transformProject(project) : undefined;
}

export function useTasks(): UseQueryResult<Task> {
  // Tasks are currently embedded in projects
  // TODO: Add tasks query to Convex backend
  return {
    data: [],
    isLoading: false,
  };
}

export function useTimeEntries(filters?: any): UseQueryResult<TimeEntry> {
  const entries = useQuery(api.timeEntries.listTimeEntries, filters ?? {});
  return {
    data: entries?.map((entry: any) => transformTimeEntry(entry)) ?? [],
    isLoading: entries === undefined,
  };
}

export function useCustomers(): UseQueryResult<Customer> {
  const customers = useQuery(api.customers.listCustomers);
  return {
    data: customers?.map((customer: any) => transformCustomer(customer)) ?? [],
    isLoading: customers === undefined,
  };
}

export function useLeads(): UseQueryResult<Lead> {
  const leads = useQuery(api.leads.listLeads);
  const workersResult = useWorkers();

  const workerMap = new Map(workersResult.data.map((w) => [w.id, w]));

  return {
    data:
      leads?.map((lead: any) =>
        transformLead(lead, workerMap.get(lead.assigneeId) || ({} as Worker))
      ) ?? [],
    isLoading: leads === undefined || workersResult.isLoading,
  };
}

export function useInvoices(): UseQueryResult<Invoice> {
  const invoices = useQuery(api.invoices.listInvoices);
  return {
    data: invoices?.map((invoice: any) => transformInvoice(invoice)) ?? [],
    isLoading: invoices === undefined,
  };
}

export function useEstimates(): UseQueryResult<Estimate> {
  const estimates = useQuery(api.estimates.listEstimates);
  return {
    data: estimates?.map((estimate: any) => transformEstimate(estimate)) ?? [],
    isLoading: estimates === undefined,
  };
}

export function useWorkers(): UseQueryResult<Worker> {
  const workers = useQuery(api.workers.listWorkers);
  return {
    data: workers?.map((worker: any) => transformWorker(worker)) ?? [],
    isLoading: workers === undefined,
  };
}

export function useDashboardData(): FinancialSummary | undefined {
  const summary = useQuery(api.financial.get);
  return summary
    ? {
        revenue: summary.revenue,
        balance: summary.balance,
        feesEarned: summary.feesEarned,
        chargebackRate: summary.chargebackRate,
        totalTransactions: summary.totalTransactions,
        plannedPayouts: summary.plannedPayouts,
        successfulPayments: summary.successfulPayments,
        failedPayments: summary.failedPayments,
      }
    : undefined;
}

export function useFinancialSummary(): FinancialSummary | undefined {
  return useDashboardData();
}
