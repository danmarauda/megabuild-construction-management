import { useQuery, useMutation, useAction } from "convex/react";
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

// Import from generated Convex API - this will be resolved by Vite
// The Convex build process generates these files during deployment
import type { FunctionReference } from "convex/server";

// Create a proper API reference that works both in dev and production
// The actual API is loaded at runtime through the Convex client
function getApi() {
  // Try to access the global API that Convex provides
  if (typeof window !== "undefined" && (window as any).__convexClient) {
    return (window as any).__convexClient;
  }
  // Fallback for SSR/build time
  return {};
}

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

// Create API function references that work with Convex's useQuery
function createQueryReference(tableName: string, functionName: string) {
  return { tableName, functionName };
}

// Custom hooks for data fetching
export function useProjects() {
  // Create a reference to the projects.listProjects function
  const projects = useQuery(createQueryReference("projects", "listProjects"));
  return projects?.map((project: any) => transformProject(project)) ?? [];
}

export function useProject(id: string) {
  const project = useQuery(createQueryReference("projects", "getProject"), { id });
  return project ? transformProject(project) : undefined;
}

export function useTasks() {
  return [];
}

export function useTimeEntries(filters?: any) {
  const entries = useQuery(createQueryReference("timeEntries", "listTimeEntries"), filters ?? {});
  return entries?.map((entry: any) => transformTimeEntry(entry)) ?? [];
}

export function useCustomers() {
  const customers = useQuery(createQueryReference("customers", "listCustomers"));
  return customers?.map((customer: any) => transformCustomer(customer)) ?? [];
}

export function useLeads() {
  const leads = useQuery(createQueryReference("leads", "listLeads"));
  const workers = useWorkers();
  const workerMap = new Map(workers?.map((w) => [w.id, w]) || []);
  return leads?.map((lead: any) =>
    transformLead(lead, workerMap.get(lead.assigneeId) || ({} as Worker))
  ) ?? [];
}

export function useInvoices() {
  const invoices = useQuery(createQueryReference("invoices", "listInvoices"));
  return invoices?.map((invoice: any) => transformInvoice(invoice)) ?? [];
}

export function useEstimates() {
  const estimates = useQuery(createQueryReference("estimates", "listEstimates"));
  return estimates?.map((estimate: any) => transformEstimate(estimate)) ?? [];
}

export function useWorkers() {
  const workers = useQuery(createQueryReference("workers", "listWorkers"));
  return workers?.map((worker: any) => transformWorker(worker)) ?? [];
}

export function useDashboardData(): FinancialSummary | undefined {
  const summary = useQuery(createQueryReference("financial", "get"));
  return summary ? {
    revenue: summary.revenue,
    balance: summary.balance,
    feesEarned: summary.feesEarned,
    chargebackRate: summary.chargebackRate,
    totalTransactions: summary.totalTransactions,
    plannedPayouts: summary.plannedPayouts,
    successfulPayments: summary.successfulPayments,
    failedPayments: summary.failedPayments,
  } : undefined;
}

export function useFinancialSummary(): FinancialSummary | undefined {
  return useDashboardData();
}
