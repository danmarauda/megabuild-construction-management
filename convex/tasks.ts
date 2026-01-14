import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

export const list = query({
  args: {},
  handler: async (ctx) => {
    const tasks = await ctx.db.query("tasks").collect();
    return tasks;
  },
});

export const listByProject = query({
  args: { projectId: v.id("projects") },
  handler: async (ctx, args) => {
    const tasks = await ctx.db
      .query("tasks")
      .withIndex("by_project", (q) => q.eq("projectId", args.projectId))
      .collect();
    return tasks;
  },
});

export const create = mutation({
  args: {
    title: v.string(),
    start: v.string(),
    end: v.string(),
    duration: v.number(),
    progress: v.number(),
    assigneeId: v.id("workers"),
    status: v.string(),
    taskNumber: v.optional(v.string()),
    hours: v.optional(v.number()),
    projectId: v.id("projects"),
  },
  handler: async (ctx, args) => {
    const taskId = await ctx.db.insert("tasks", {
      title: args.title,
      start: args.start,
      end: args.end,
      duration: args.duration,
      progress: args.progress,
      assigneeId: args.assigneeId,
      status: args.status,
      taskNumber: args.taskNumber,
      hours: args.hours,
      projectId: args.projectId,
    });
    return taskId;
  },
});

export const getTask = query({
  args: { id: v.id("tasks") },
  handler: async (ctx, args) => {
    const task = await ctx.db.get(args.id);
    return task;
  },
});

export const updateTask = mutation({
  args: {
    id: v.id("tasks"),
    title: v.optional(v.string()),
    start: v.optional(v.string()),
    end: v.optional(v.string()),
    duration: v.optional(v.number()),
    progress: v.optional(v.number()),
    assigneeId: v.optional(v.id("workers")),
    status: v.optional(v.string()),
    taskNumber: v.optional(v.string()),
    hours: v.optional(v.number()),
  },
  handler: async (ctx, args) => {
    const { id, ...updates } = args;
    await ctx.db.patch(id, updates);
    return id;
  },
});

export const deleteTask = mutation({
  args: { id: v.id("tasks") },
  handler: async (ctx, args) => {
    // Delete related time entries
    const timeEntries = await ctx.db
      .query("timeEntries")
      .filter((q) => q.eq(q.field("taskId"), args.id))
      .collect();

    for (const entry of timeEntries) {
      await ctx.db.delete(entry._id);
    }

    await ctx.db.delete(args.id);
    return { success: true };
  },
});
