import { useQuery, useMutation, useAction } from "convex/react";
import { api } from "../../convex/_generated";
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
    tasks: [], // Will be populated separately
    team: [], // Will be populated separately
    financials: project.financials,
  };
}

function transformTask(task: any, assignee: Worker): Task {
  return {
    id: task._id,
    title: task.title,
    start: task.start,
    end: task.end,
    duration: task.duration,
    progress: task.progress,
    assignee,
    status: task.status as any,
    taskNumber: task.taskNumber,
    hours: task.hours,
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

// Hook return type
type HookResult<T> = {
  data: T | null | undefined;
  isLoading: boolean;
  error: Error | null;
};

// Custom hooks for data fetching
export function useProjects(): HookResult<Project[]> {
  const projects = useQuery(api.projects.listProjects);

  return {
    data: projects?.map((project) => transformProject(project)),
    isLoading: projects === undefined,
    error: null,
  };
}

export function useProject(id: string): HookResult<Project> {
  const project = useQuery(api.projects.getProject, { id });

  return {
    data: project ? transformProject(project) : undefined,
    isLoading: project === undefined,
    error: null,
  };
}

export function useTasks(projectId?: string): HookResult<Task[]> {
  // For now, return empty array as tasks need to be fetched separately
  // TODO: Implement task filtering by project when backend functions are ready
  return {
    data: [],
    isLoading: false,
    error: null,
  };
}

export function useTimeEntries(filters?: {
  projectId?: string;
  taskId?: string;
  workerId?: string;
  startDate?: number;
  endDate?: number;
}): HookResult<TimeEntry[]> {
  const entries = useQuery(api.timeEntries.listTimeEntries, filters || {});

  return {
    data: entries?.map((entry) => transformTimeEntry(entry)),
    isLoading: entries === undefined,
    error: null,
  };
}

export function useCustomers(): HookResult<Customer[]> {
  const customers = useQuery(api.customers.listCustomers);

  return {
    data: customers?.map((customer) => transformCustomer(customer)),
    isLoading: customers === undefined,
    error: null,
  };
}

export function useLeads(): HookResult<Lead[]> {
  const leads = useQuery(api.leads.listLeads);
  const workers = useWorkers();

  const workerMap = new Map(workers.data?.map((w) => [w.id, w]) || []);

  return {
    data: leads?.map((lead) =>
      transformLead(lead, workerMap.get(lead.assigneeId) || ({} as Worker))
    ),
    isLoading: leads === undefined,
    error: null,
  };
}

export function useInvoices(): HookResult<Invoice[]> {
  const invoices = useQuery(api.invoices.listInvoices);

  return {
    data: invoices?.map((invoice) => transformInvoice(invoice)),
    isLoading: invoices === undefined,
    error: null,
  };
}

export function useEstimates(): HookResult<Estimate[]> {
  const estimates = useQuery(api.estimates.listEstimates);

  return {
    data: estimates?.map((estimate) => transformEstimate(estimate)),
    isLoading: estimates === undefined,
    error: null,
  };
}

export function useWorkers(): HookResult<Worker[]> {
  const workers = useQuery(api.workers.listWorkers);

  return {
    data: workers?.map((worker) => transformWorker(worker)),
    isLoading: workers === undefined,
    error: null,
  };
}

export function useDashboardData(): HookResult<FinancialSummary> {
  const summary = useQuery(api.financial.get);

  return {
    data: summary
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
      : undefined,
    isLoading: summary === undefined,
    error: null,
  };
}

// Legacy aliases for backward compatibility
export function useFinancialSummary(): FinancialSummary | undefined {
  return useDashboardData().data;
}
