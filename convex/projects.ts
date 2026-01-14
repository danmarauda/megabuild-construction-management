import { query, mutation } from "./_generated/server";
import { v } from "convex/values";

export const listProjects = query({
  handler: async (ctx) => {
    const projects = await ctx.db.query("projects").collect();
    return projects;
  },
});

export const getProject = query({
  args: { id: v.id("projects") },
  handler: async (ctx, args) => {
    const project = await ctx.db.get(args.id);
    return project;
  },
});

export const createProject = mutation({
  args: {
    title: v.string(),
    customerName: v.string(),
    customerAddress: v.optional(v.string()),
    customerPhone: v.optional(v.string()),
    customerEmail: v.optional(v.string()),
    status: v.string(),
    startDate: v.string(),
    endDate: v.string(),
    completionPercentage: v.number(),
    estimatedCost: v.optional(v.number()),
    actualCost: v.optional(v.number()),
    revenue: v.optional(v.number()),
    profit: v.optional(v.number()),
    projectManagerId: v.optional(v.id("workers")),
    salesPersonId: v.optional(v.id("workers")),
  },
  handler: async (ctx, args) => {
    const projectId = await ctx.db.insert("projects", args);
    return projectId;
  },
});

export const updateProject = mutation({
  args: {
    id: v.id("projects"),
    title: v.optional(v.string()),
    customerName: v.optional(v.string()),
    customerAddress: v.optional(v.string()),
    customerPhone: v.optional(v.string()),
    customerEmail: v.optional(v.string()),
    status: v.optional(v.string()),
    startDate: v.optional(v.string()),
    endDate: v.optional(v.string()),
    completionPercentage: v.optional(v.number()),
    estimatedCost: v.optional(v.number()),
    actualCost: v.optional(v.number()),
    revenue: v.optional(v.number()),
    profit: v.optional(v.number()),
    projectManagerId: v.optional(v.id("workers")),
    salesPersonId: v.optional(v.id("workers")),
  },
  handler: async (ctx, args) => {
    const { id, ...updates } = args;
    await ctx.db.patch(id, updates);
    return id;
  },
});

export const deleteProject = mutation({
  args: { id: v.id("projects") },
  handler: async (ctx, args) => {
    // Check for related time entries
    const timeEntries = await ctx.db
      .query("timeEntries")
      .withIndex("by_project", (q) => q.eq("projectId", args.id))
      .collect();

    for (const entry of timeEntries) {
      await ctx.db.delete(entry._id);
    }

    // Check for related files
    const files = await ctx.db
      .query("files")
      .withIndex("by_project", (q) => q.eq("projectId", args.id))
      .collect();

    for (const file of files) {
      await ctx.db.delete(file._id);
    }

    // Check for related invoices
    const invoices = await ctx.db
      .query("invoices")
      .withIndex("by_project", (q) => q.eq("projectId", args.id))
      .collect();

    for (const invoice of invoices) {
      await ctx.db.delete(invoice._id);
    }

    // Delete the project
    await ctx.db.delete(args.id);
    return { success: true };
  },
});
