import { query } from "./_generated/server";
import { v } from "convex/values";

export const listWorkers = query({
  handler: async (ctx) => {
    const workers = await ctx.db.query("workers").collect();
    return workers;
  },
});

export const getWorker = query({
  args: { id: v.id("workers") },
  handler: async (ctx, args) => {
    const worker = await ctx.db.get(args.id);
    if (!worker) {
      return null;
    }

    // Fetch assigned tasks
    const tasks = await ctx.db
      .query("tasks")
      .filter((q) => q.eq(q.field("assigneeId"), args.id))
      .collect();

    // Fetch recent time entries
    const timeEntries = await ctx.db
      .query("timeEntries")
      .filter((q) => q.eq(q.field("workerId"), args.id))
      .order("desc")
      .take(10);

    // Fetch all time entries for total hours
    const allTimeEntries = await ctx.db
      .query("timeEntries")
      .filter((q) => q.eq(q.field("workerId"), args.id))
      .collect();

    const totalHours = allTimeEntries.reduce((sum, entry) => sum + entry.hours, 0);

    return {
      ...worker,
      tasks,
      recentTimeEntries: timeEntries,
      totalHours,
      activeTasksCount: tasks.filter((t) => t.status === "in-progress").length,
    };
  },
});
