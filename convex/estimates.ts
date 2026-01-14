import { query, mutation } from "./_generated/server";
import { v } from "convex/values";

export const listEstimates = query({
  handler: async (ctx) => {
    const estimates = await ctx.db.query("estimates").collect();
    return estimates;
  },
});

export const getEstimate = query({
  args: { id: v.id("estimates") },
  handler: async (ctx, args) => {
    const estimate = await ctx.db.get(args.id);
    return estimate;
  },
});

export const createEstimate = mutation({
  args: {
    leadId: v.id("leads"),
    status: v.string(),
    amount: v.number(),
    createdAt: v.string(),
    validUntil: v.string(),
    sentAt: v.optional(v.string()),
    viewedAt: v.optional(v.string()),
    approvedAt: v.optional(v.string()),
    rejectedAt: v.optional(v.string()),
    items: v.array(
      v.object({
        description: v.string(),
        amount: v.number(),
      })
    ),
  },
  handler: async (ctx, args) => {
    const estimateId = await ctx.db.insert("estimates", args);
    return estimateId;
  },
});

export const updateEstimate = mutation({
  args: {
    id: v.id("estimates"),
    leadId: v.optional(v.id("leads")),
    status: v.optional(v.string()),
    amount: v.optional(v.number()),
    createdAt: v.optional(v.string()),
    validUntil: v.optional(v.string()),
    sentAt: v.optional(v.string()),
    viewedAt: v.optional(v.string()),
    approvedAt: v.optional(v.string()),
    rejectedAt: v.optional(v.string()),
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

export const deleteEstimate = mutation({
  args: { id: v.id("estimates") },
  handler: async (ctx, args) => {
    await ctx.db.delete(args.id);
    return { success: true };
  },
});
