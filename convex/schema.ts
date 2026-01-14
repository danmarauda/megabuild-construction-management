import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

// Define common validation schemas
const workerFields = {
  name: v.string(),
  avatar: v.string(),
  role: v.optional(v.string()),
  phone: v.optional(v.string()),
  email: v.optional(v.string()),
};

const invoiceItemFields = {
  description: v.string(),
  amount: v.number(),
};

export default defineSchema({
  // Workers table - team members and staff
  workers: defineTable({
    ...workerFields,
  })
    .index("by_name", ["name"])
    .index("by_email", ["email"])
    .index("by_role", ["role"]),

  // Tasks table - project tasks with assignments
  tasks: defineTable({
    title: v.string(),
    start: v.string(), // ISO date string
    end: v.string(), // ISO date string
    duration: v.number(),
    progress: v.number(),
    assigneeId: v.id("workers"),
    status: v.string(), // 'pending' | 'in-progress' | 'completed' | 'overdue'
    taskNumber: v.optional(v.string()),
    hours: v.optional(v.number()),
  })
    .index("by_assignee", ["assigneeId"])
    .index("by_status", ["status"])
    .index("by_start_date", ["start"])
    .index("by_end_date", ["end"]),

  // Projects table - main construction projects
  projects: defineTable({
    title: v.string(),
    customerName: v.string(),
    customerAddress: v.optional(v.string()),
    customerPhone: v.optional(v.string()),
    customerEmail: v.optional(v.string()),
    status: v.string(), // 'active' | 'completed' | 'on-hold'
    startDate: v.string(), // ISO date string
    endDate: v.string(), // ISO date string
    completionPercentage: v.number(),
    estimatedCost: v.optional(v.number()),
    actualCost: v.optional(v.number()),
    revenue: v.optional(v.number()),
    profit: v.optional(v.number()),
    projectManagerId: v.optional(v.id("workers")),
    salesPersonId: v.optional(v.id("workers")),
  })
    .index("by_status", ["status"])
    .index("by_start_date", ["startDate"])
    .index("by_end_date", ["endDate"])
    .index("by_project_manager", ["projectManagerId"])
    .index("by_sales_person", ["salesPersonId"])
    .index("by_customer", ["customerName"]),

  // Customers table - client information
  customers: defineTable({
    name: v.string(),
    email: v.string(),
    phone: v.string(),
    address: v.string(),
    projectIds: v.array(v.id("projects")),
    status: v.string(), // 'active' | 'inactive'
    avatar: v.string(),
  })
    .index("by_name", ["name"])
    .index("by_email", ["email"])
    .index("by_status", ["status"]),

  // Leads table - sales leads pipeline
  leads: defineTable({
    name: v.string(),
    email: v.string(),
    phone: v.string(),
    address: v.string(),
    status: v.string(), // 'new' | 'contacted' | 'qualified' | 'proposal' | 'converted' | 'lost'
    source: v.string(),
    notes: v.string(),
    assigneeId: v.id("workers"),
    estimatedValue: v.number(),
    createdAt: v.string(), // ISO date string
    convertedAt: v.optional(v.string()), // ISO date string
  })
    .index("by_status", ["status"])
    .index("by_assignee", ["assigneeId"])
    .index("by_created_at", ["createdAt"])
    .index("by_source", ["source"]),

  // Invoices table - billing and payments
  invoices: defineTable({
    projectId: v.id("projects"),
    customerId: v.id("customers"),
    status: v.string(), // 'draft' | 'sent' | 'viewed' | 'pending' | 'paid' | 'overdue'
    amount: v.number(),
    createdAt: v.string(), // ISO date string
    dueDate: v.string(), // ISO date string
    paidAt: v.optional(v.string()), // ISO date string
    items: v.array(v.object(invoiceItemFields)),
  })
    .index("by_project", ["projectId"])
    .index("by_customer", ["customerId"])
    .index("by_status", ["status"])
    .index("by_created_at", ["createdAt"])
    .index("by_due_date", ["dueDate"]),

  // Estimates table - project estimates for leads
  estimates: defineTable({
    leadId: v.id("leads"),
    status: v.string(), // 'draft' | 'sent' | 'viewed' | 'approved' | 'rejected'
    amount: v.number(),
    createdAt: v.string(), // ISO date string
    validUntil: v.string(), // ISO date string
    sentAt: v.optional(v.string()), // ISO date string
    viewedAt: v.optional(v.string()), // ISO date string
    approvedAt: v.optional(v.string()), // ISO date string
    rejectedAt: v.optional(v.string()), // ISO date string
    items: v.array(v.object(invoiceItemFields)),
  })
    .index("by_lead", ["leadId"])
    .index("by_status", ["status"])
    .index("by_created_at", ["createdAt"])
    .index("by_valid_until", ["validUntil"]),

  // Time entries table - worker time tracking
  timeEntries: defineTable({
    workerId: v.id("workers"),
    projectId: v.id("projects"),
    taskId: v.optional(v.id("tasks")),
    date: v.string(), // ISO date string
    hours: v.number(),
    notes: v.string(),
  })
    .index("by_worker", ["workerId"])
    .index("by_project", ["projectId"])
    .index("by_task", ["taskId"])
    .index("by_date", ["date"])
    .index("by_worker_and_date", ["workerId", "date"])
    .index("by_project_and_date", ["projectId", "date"]),

  // Files table - project documents and media
  files: defineTable({
    name: v.string(),
    type: v.string(), // 'image' | 'document' | 'spreadsheet' | 'other'
    size: v.number(), // bytes
    projectId: v.id("projects"),
    uploadedAt: v.string(), // ISO date string
    uploadedById: v.id("workers"),
    url: v.string(),
  })
    .index("by_project", ["projectId"])
    .index("by_uploaded_by", ["uploadedById"])
    .index("by_type", ["type"])
    .index("by_uploaded_at", ["uploadedAt"]),
});
