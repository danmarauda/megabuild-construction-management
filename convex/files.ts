import { query, mutation } from "./_generated/server";
import { v } from "convex/values";

export const listFiles = query({
  args: {
    projectId: v.optional(v.id("projects")),
    type: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    let filesQuery = ctx.db.query("files");

    if (args.projectId) {
      filesQuery = filesQuery.withIndex("by_project", (q) =>
        q.eq("projectId", args.projectId)
      );
    } else if (args.type) {
      filesQuery = filesQuery.withIndex("by_type", (q) =>
        q.eq("type", args.type as string)
      );
    }

    const files = await filesQuery.order("desc").collect();

    // Fetch related project for each file
    const filesWithProjects = await Promise.all(
      files.map(async (file) => {
        const project = await ctx.db.get(file.projectId);
        return { ...file, project };
      })
    );

    return filesWithProjects;
  },
});

export const createFile = mutation({
  args: {
    projectId: v.id("projects"),
    name: v.string(),
    url: v.string(),
    type: v.string(),
    size: v.optional(v.number()),
    uploadedBy: v.optional(v.string()),
    description: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const now = Date.now();
    const fileId = await ctx.db.insert("files", {
      ...args,
      createdAt: now,
    });
    return fileId;
  },
});

export const deleteFile = mutation({
  args: { id: v.id("files") },
  handler: async (ctx, args) => {
    await ctx.db.delete(args.id);
    return { success: true };
  },
});

export const getFile = query({
  args: { id: v.id("files") },
  handler: async (ctx, args) => {
    const file = await ctx.db.get(args.id);
    if (!file) {
      return null;
    }

    // Fetch related project
    const project = await ctx.db.get(file.projectId);
    return { ...file, project };
  },
});
