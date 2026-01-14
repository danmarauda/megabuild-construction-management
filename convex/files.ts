import { query, mutation } from "./_generated/server";
import { v } from "convex/values";

export const listFiles = query({
  args: {
    projectId: v.optional(v.id("projects")),
    type: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    let files;

    if (args.projectId) {
      const { projectId } = args;
      files = await ctx.db
        .query("files")
        .withIndex("by_project", (q) =>
          q.eq("projectId", projectId)
        )
        .collect();
    } else if (args.type) {
      const { type } = args;
      files = await ctx.db
        .query("files")
        .withIndex("by_type", (q) =>
          q.eq("type", type)
        )
        .collect();
    } else {
      files = await ctx.db.query("files").order("desc").collect();
    }

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
    uploadedById: v.optional(v.id("workers")),
  },
  handler: async (ctx, args) => {
    const fileId = await ctx.db.insert("files", {
      name: args.name,
      url: args.url,
      type: args.type,
      size: args.size ?? 0,
      projectId: args.projectId,
      uploadedAt: new Date().toISOString(),
      uploadedById: args.uploadedById ?? args.projectId as any, // Default fallback
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
