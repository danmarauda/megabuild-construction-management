import { query, mutation } from "./_generated/server";
import { v } from "convex/values";

export const listLeads = query({
  handler: async (ctx) => {
    const leads = await ctx.db.query("leads").collect();
    return leads;
  },
});

export const getLead = query({
  args: { id: v.id("leads") },
  handler: async (ctx, args) => {
    const lead = await ctx.db.get(args.id);
    return lead;
  },
});

export const createLead = mutation({
  args: {
    name: v.string(),
    email: v.string(),
    phone: v.string(),
    address: v.string(),
    status: v.string(),
    source: v.string(),
    notes: v.string(),
    assigneeId: v.id("workers"),
    estimatedValue: v.number(),
    createdAt: v.string(),
    convertedAt: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const leadId = await ctx.db.insert("leads", args);
    return leadId;
  },
});

export const updateLeadStatus = mutation({
  args: {
    id: v.id("leads"),
    status: v.string(),
    convertedAt: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const { id, ...updates } = args;
    await ctx.db.patch(id, updates);
    return id;
  },
});

export const updateLead = mutation({
  args: {
    id: v.id("leads"),
    name: v.optional(v.string()),
    email: v.optional(v.string()),
    phone: v.optional(v.string()),
    address: v.optional(v.string()),
    status: v.optional(v.string()),
    source: v.optional(v.string()),
    notes: v.optional(v.string()),
    assigneeId: v.optional(v.id("workers")),
    estimatedValue: v.optional(v.number()),
    createdAt: v.optional(v.string()),
    convertedAt: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const { id, ...updates } = args;
    await ctx.db.patch(id, updates);
    return id;
  },
});

export const deleteLead = mutation({
  args: { id: v.id("leads") },
  handler: async (ctx, args) => {
    // Check for related estimates
    const estimates = await ctx.db
      .query("estimates")
      .filter((q) => q.eq(q.field("leadId"), args.id))
      .collect();

    for (const estimate of estimates) {
      await ctx.db.delete(estimate._id);
    }

    await ctx.db.delete(args.id);
    return { success: true };
  },
});
