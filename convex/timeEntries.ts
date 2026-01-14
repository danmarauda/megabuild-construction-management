import { query, mutation } from "./_generated/server";
import { v } from "convex/values";

export const listTimeEntries = query({
  args: {
    projectId: v.optional(v.id("projects")),
    taskId: v.optional(v.id("tasks")),
    workerId: v.optional(v.id("workers")),
    startDate: v.optional(v.string()),
    endDate: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    let entries;

    if (args.projectId) {
      const { projectId } = args;
      entries = await ctx.db
        .query("timeEntries")
        .withIndex("by_project", (q) =>
          q.eq("projectId", projectId)
        )
        .collect();
    } else if (args.taskId) {
      const { taskId } = args;
      entries = await ctx.db
        .query("timeEntries")
        .withIndex("by_task", (q) =>
          q.eq("taskId", taskId)
        )
        .collect();
    } else if (args.workerId) {
      const { workerId } = args;
      entries = await ctx.db
        .query("timeEntries")
        .withIndex("by_worker", (q) =>
          q.eq("workerId", workerId)
        )
        .collect();
    } else {
      entries = await ctx.db
        .query("timeEntries")
        .withIndex("by_date")
        .order("desc")
        .collect();
    }

    // Filter by date range if provided (date fields are ISO strings)
    if (args.startDate || args.endDate) {
      entries = entries.filter((entry) => {
        if (args.startDate && entry.date < args.startDate) return false;
        if (args.endDate && entry.date > args.endDate) return false;
        return true;
      });
    }

    // Fetch related data for each entry
    const entriesWithRelations = await Promise.all(
      entries.map(async (entry) => {
        const project = await ctx.db.get(entry.projectId);
        const worker = await ctx.db.get(entry.workerId);
        let task = null;
        if (entry.taskId) {
          task = await ctx.db.get(entry.taskId);
        }
        return { ...entry, project, worker, task };
      })
    );

    return entriesWithRelations;
  },
});

export const createTimeEntry = mutation({
  args: {
    taskId: v.optional(v.id("tasks")),
    projectId: v.id("projects"),
    workerId: v.id("workers"),
    date: v.string(),
    hours: v.number(),
    notes: v.string(),
  },
  handler: async (ctx, args) => {
    const entryId = await ctx.db.insert("timeEntries", {
      taskId: args.taskId,
      projectId: args.projectId,
      workerId: args.workerId,
      date: args.date,
      hours: args.hours,
      notes: args.notes,
    });
    return entryId;
  },
});

export const updateTimeEntry = mutation({
  args: {
    id: v.id("timeEntries"),
    taskId: v.optional(v.id("tasks")),
    projectId: v.optional(v.id("projects")),
    workerId: v.optional(v.id("workers")),
    date: v.optional(v.string()),
    hours: v.optional(v.number()),
    notes: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const { id, ...updates } = args;
    await ctx.db.patch(id, updates);
    return id;
  },
});

export const deleteTimeEntry = mutation({
  args: { id: v.id("timeEntries") },
  handler: async (ctx, args) => {
    await ctx.db.delete(args.id);
    return { success: true };
  },
});

export const getWeeklyTimeSummary = query({
  args: {
    workerId: v.optional(v.id("workers")),
    startDate: v.string(),
    endDate: v.string(),
  },
  handler: async (ctx, args) => {
    let entries = await ctx.db
      .query("timeEntries")
      .withIndex("by_date")
      .collect();

    // Filter by date range (strings)
    entries = entries.filter(
      (entry) => entry.date >= args.startDate && entry.date <= args.endDate
    );

    // Filter by worker if specified
    if (args.workerId) {
      entries = entries.filter((entry) => entry.workerId === args.workerId);
    }

    // Group by date
    const groupedByDate: Record<string, number> = {};
    entries.forEach((entry) => {
      if (!groupedByDate[entry.date]) {
        groupedByDate[entry.date] = 0;
      }
      groupedByDate[entry.date] += entry.hours;
    });

    // Calculate totals
    const totalHours = entries.reduce((sum, entry) => sum + entry.hours, 0);
    const regularHours = Math.min(totalHours, 40);
    const overtimeHours = Math.max(totalHours - 40, 0);

    return {
      totalHours,
      regularHours,
      overtimeHours,
      entries: entries.length,
      dailyBreakdown: Object.entries(groupedByDate).map(([date, hours]) => ({
        date,
        hours,
      })),
    };
  },
});
