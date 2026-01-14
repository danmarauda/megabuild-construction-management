import { query, mutation } from "./_generated/server";
import { v } from "convex/values";

export const listCustomers = query({
  handler: async (ctx) => {
    const customers = await ctx.db.query("customers").collect();
    return customers;
  },
});

export const getCustomer = query({
  args: { id: v.id("customers") },
  handler: async (ctx, args) => {
    const customer = await ctx.db.get(args.id);
    return customer;
  },
});

export const createCustomer = mutation({
  args: {
    name: v.string(),
    email: v.string(),
    phone: v.string(),
    address: v.string(),
    projectIds: v.array(v.id("projects")),
    status: v.string(),
    avatar: v.string(),
  },
  handler: async (ctx, args) => {
    const customerId = await ctx.db.insert("customers", args);
    return customerId;
  },
});

export const updateCustomer = mutation({
  args: {
    id: v.id("customers"),
    name: v.optional(v.string()),
    email: v.optional(v.string()),
    phone: v.optional(v.string()),
    address: v.optional(v.string()),
    projectIds: v.optional(v.array(v.id("projects"))),
    status: v.optional(v.string()),
    avatar: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const { id, ...updates } = args;
    await ctx.db.patch(id, updates);
    return id;
  },
});

export const deleteCustomer = mutation({
  args: { id: v.id("customers") },
  handler: async (ctx, args) => {
    // Check for related projects
    const projects = await ctx.db
      .query("projects")
      .filter((q) => q.eq(q.field("customerName"), args.id))
      .collect();

    if (projects.length > 0) {
      throw new Error(
        "Cannot delete customer with associated projects"
      );
    }

    // Check for related invoices
    const invoices = await ctx.db
      .query("invoices")
      .filter((q) => q.eq(q.field("customerId"), args.id))
      .collect();

    if (invoices.length > 0) {
      throw new Error(
        "Cannot delete customer with associated invoices"
      );
    }

    await ctx.db.delete(args.id);
    return { success: true };
  },
});
