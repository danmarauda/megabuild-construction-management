import { query, mutation } from "./_generated/server";
import { v } from "convex/values";

export const listInvoices = query({
  handler: async (ctx) => {
    const invoices = await ctx.db.query("invoices").collect();
    return invoices;
  },
});

export const getInvoice = query({
  args: { id: v.id("invoices") },
  handler: async (ctx, args) => {
    const invoice = await ctx.db.get(args.id);
    return invoice;
  },
});

export const createInvoice = mutation({
  args: {
    projectId: v.id("projects"),
    customerId: v.id("customers"),
    status: v.string(),
    amount: v.number(),
    createdAt: v.string(),
    dueDate: v.string(),
    paidAt: v.optional(v.string()),
    items: v.array(
      v.object({
        description: v.string(),
        amount: v.number(),
      })
    ),
  },
  handler: async (ctx, args) => {
    const invoiceId = await ctx.db.insert("invoices", args);
    return invoiceId;
  },
});

export const updateInvoice = mutation({
  args: {
    id: v.id("invoices"),
    projectId: v.optional(v.id("projects")),
    customerId: v.optional(v.id("customers")),
    status: v.optional(v.string()),
    amount: v.optional(v.number()),
    createdAt: v.optional(v.string()),
    dueDate: v.optional(v.string()),
    paidAt: v.optional(v.string()),
    items: v.optional(
      v.array(
        v.object({
          description: v.string(),
          amount: v.number(),
        })
      )
    ),
  },
  handler: async (ctx, args) => {
    const { id, ...updates } = args;
    await ctx.db.patch(id, updates);
    return id;
  },
});

export const deleteInvoice = mutation({
  args: { id: v.id("invoices") },
  handler: async (ctx, args) => {
    await ctx.db.delete(args.id);
    return { success: true };
  },
});
