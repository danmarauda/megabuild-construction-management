import { v } from "convex/values";
import { mutation, query } from "./_generated/server";
import { workers, projects, customers, leads, invoices, estimates, timeEntries, files } from "../src/data/mock-data";

/**
 * Seed data mutation - Populates the database with initial data
 * This can be called from the Convex dashboard or via CLI
 *
 * Usage:
 *   npx convex run seed:seed
 *
 * Or from dashboard Functions > seed > seed
 */
export const seed = mutation({
  args: {},
  handler: async (ctx) => {
    // Check if data already exists to avoid duplicates
    const existingWorkers = await ctx.db.query("workers").first();
    if (existingWorkers) {
      console.log("Database already seeded. Skipping...");
      return { status: "already_seeded", message: "Database already contains data" };
    }

    const results = {
      workers: 0,
      projects: 0,
      customers: 0,
      leads: 0,
      invoices: 0,
      estimates: 0,
      timeEntries: 0,
      files: 0,
    };

    // Map to store Convex IDs for references
    const workerIdMap = new Map<string, any>();
    const projectIdMap = new Map<string, any>();
    const customerIdMap = new Map<string, any>();
    const leadIdMap = new Map<string, any>();
    const taskIdMap = new Map<string, any>();

    // 1. Insert Workers (7 workers)
    console.log("Seeding workers...");
    for (const worker of workers) {
      const workerId = await ctx.db.insert("workers", {
        name: worker.name,
        avatar: worker.avatar,
        role: worker.role,
        phone: worker.phone,
        email: worker.email,
      });
      workerIdMap.set(worker.id, workerId);
      results.workers++;
    }
    console.log(`Inserted ${results.workers} workers`);

    // 2. Insert Customers (3 customers)
    console.log("Seeding customers...");
    for (const customer of customers) {
      const customerId = await ctx.db.insert("customers", {
        name: customer.name,
        email: customer.email,
        phone: customer.phone,
        address: customer.address,
        projectIds: [], // Will update after projects are created
        status: customer.status,
        avatar: customer.avatar,
      });
      customerIdMap.set(customer.id, customerId);
      results.customers++;
    }
    console.log(`Inserted ${results.customers} customers`);

    // 3. Insert Projects with Tasks (2 projects with 8 tasks total)
    console.log("Seeding projects and tasks...");
    for (const project of projects) {
      // Insert project
      const projectId = await ctx.db.insert("projects", {
        title: project.title,
        customerName: project.customer.name,
        customerAddress: project.customer.address,
        customerPhone: project.customer.phone,
        customerEmail: project.customer.email,
        status: project.status,
        startDate: project.startDate,
        endDate: project.endDate,
        completionPercentage: project.completionPercentage,
        estimatedCost: project.financials?.estimatedCost,
        actualCost: project.financials?.actualCost,
        revenue: project.financials?.revenue,
        profit: project.financials?.profit,
        projectManagerId: project.projectManager ? workerIdMap.get(project.projectManager.id) : undefined,
        salesPersonId: project.salesPerson ? workerIdMap.get(project.salesPerson.id) : undefined,
      });
      projectIdMap.set(project.id, projectId);
      results.projects++;

      // Insert tasks for this project
      for (const task of project.tasks) {
        const taskId = await ctx.db.insert("tasks", {
          title: task.title,
          start: task.start,
          end: task.end,
          duration: task.duration,
          progress: task.progress,
          assigneeId: workerIdMap.get(task.assignee.id),
          status: task.status,
          taskNumber: task.taskNumber,
          hours: task.hours,
        });
        taskIdMap.set(task.id, taskId);
      }
    }
    console.log(`Inserted ${results.projects} projects with tasks`);

    // Update customers with project IDs
    console.log("Updating customers with project references...");
    for (const project of projects) {
      const customer = customers.find((c) => c.id === project.customer.name.split(" ")[0]?.toLowerCase() || project.id === "1" ? "1" : "2");
      if (customer) {
        const customerId = customerIdMap.get(customer.id);
        if (customerId) {
          const existingCustomer = await ctx.db.get(customerId);
          if (existingCustomer) {
            await ctx.db.patch(customerId, {
              projectIds: [...existingCustomer.projectIds, projectIdMap.get(project.id)],
            });
          }
        }
      }
    }

    // 4. Insert Leads (4 leads)
    console.log("Seeding leads...");
    for (const lead of leads) {
      const leadId = await ctx.db.insert("leads", {
        name: lead.name,
        email: lead.email,
        phone: lead.phone,
        address: lead.address,
        status: lead.status,
        source: lead.source,
        notes: lead.notes,
        assigneeId: workerIdMap.get(lead.assignee.id),
        estimatedValue: lead.estimatedValue,
        createdAt: lead.createdAt,
      });
      leadIdMap.set(lead.id, leadId);
      results.leads++;
    }
    console.log(`Inserted ${results.leads} leads`);

    // 5. Insert Invoices (4 invoices)
    console.log("Seeding invoices...");
    for (const invoice of invoices) {
      const projectId = projectIdMap.get(invoice.projectId);
      const customerId = customerIdMap.get(invoice.customerId);

      if (projectId && customerId) {
        await ctx.db.insert("invoices", {
          projectId,
          customerId,
          status: invoice.status,
          amount: invoice.amount,
          createdAt: invoice.createdAt,
          dueDate: invoice.dueDate,
          paidAt: invoice.paidAt,
          items: invoice.items,
        });
        results.invoices++;
      }
    }
    console.log(`Inserted ${results.invoices} invoices`);

    // 6. Insert Estimates (3 estimates)
    console.log("Seeding estimates...");
    for (const estimate of estimates) {
      const leadId = leadIdMap.get(estimate.leadId);

      if (leadId) {
        await ctx.db.insert("estimates", {
          leadId,
          status: estimate.status,
          amount: estimate.amount,
          createdAt: estimate.createdAt,
          validUntil: estimate.validUntil,
          sentAt: estimate.sentAt,
          approvedAt: estimate.approvedAt,
          items: estimate.items,
        });
        results.estimates++;
      }
    }
    console.log(`Inserted ${results.estimates} estimates`);

    // 7. Insert Time Entries (5 time entries)
    console.log("Seeding time entries...");
    for (const entry of timeEntries) {
      const workerId = workerIdMap.get(entry.workerId);
      const projectId = projectIdMap.get(entry.projectId);
      const taskId = taskIdMap.get(entry.taskId);

      if (workerId && projectId && taskId) {
        await ctx.db.insert("timeEntries", {
          workerId,
          projectId,
          taskId,
          date: entry.date,
          hours: entry.hours,
          notes: entry.notes,
        });
        results.timeEntries++;
      }
    }
    console.log(`Inserted ${results.timeEntries} time entries`);

    // 8. Insert Files (5 files)
    console.log("Seeding files...");
    for (const file of files) {
      const projectId = projectIdMap.get(file.projectId);
      const uploadedById = workerIdMap.get(file.uploadedBy.id);

      if (projectId && uploadedById) {
        await ctx.db.insert("files", {
          name: file.name,
          type: file.type,
          size: file.size,
          projectId,
          uploadedAt: file.uploadedAt,
          uploadedById,
          url: file.url,
        });
        results.files++;
      }
    }
    console.log(`Inserted ${results.files} files`);

    console.log("Database seeding completed!", JSON.stringify(results, null, 2));
    return {
      status: "success",
      message: "Database seeded successfully",
      results
    };
  },
});

/**
 * Clear all data - Use with caution!
 * This will delete all data from the database
 *
 * Usage:
 *   npx convex run seed:clear
 */
export const clear = mutation({
  args: {},
  handler: async (ctx) => {
    // Delete in order of dependencies (children first)
    let deleted = 0;

    // Delete files
    const files = await ctx.db.query("files").collect();
    for (const file of files) {
      await ctx.db.delete(file._id);
      deleted++;
    }

    // Delete time entries
    const timeEntries = await ctx.db.query("timeEntries").collect();
    for (const entry of timeEntries) {
      await ctx.db.delete(entry._id);
      deleted++;
    }

    // Delete estimates
    const estimates = await ctx.db.query("estimates").collect();
    for (const estimate of estimates) {
      await ctx.db.delete(estimate._id);
      deleted++;
    }

    // Delete invoices
    const invoices = await ctx.db.query("invoices").collect();
    for (const invoice of invoices) {
      await ctx.db.delete(invoice._id);
      deleted++;
    }

    // Delete leads
    const leadsData = await ctx.db.query("leads").collect();
    for (const lead of leadsData) {
      await ctx.db.delete(lead._id);
      deleted++;
    }

    // Delete tasks
    const tasks = await ctx.db.query("tasks").collect();
    for (const task of tasks) {
      await ctx.db.delete(task._id);
      deleted++;
    }

    // Delete projects
    const projects = await ctx.db.query("projects").collect();
    for (const project of projects) {
      await ctx.db.delete(project._id);
      deleted++;
    }

    // Delete customers
    const customers = await ctx.db.query("customers").collect();
    for (const customer of customers) {
      await ctx.db.delete(customer._id);
      deleted++;
    }

    // Delete workers
    const workers = await ctx.db.query("workers").collect();
    for (const worker of workers) {
      await ctx.db.delete(worker._id);
      deleted++;
    }

    return {
      status: "success",
      message: `Cleared ${deleted} records from database`
    };
  },
});

/**
 * Query to check seeding status
 *
 * Usage:
 *   npx convex run seed:status
 */
export const status = query({
  args: {},
  handler: async (ctx) => {
    const [
      workerCount,
      projectCount,
      customerCount,
      leadCount,
      invoiceCount,
      estimateCount,
      timeEntryCount,
      fileCount,
    ] = await Promise.all([
      ctx.db.query("workers").collect().then((items) => items.length),
      ctx.db.query("projects").collect().then((items) => items.length),
      ctx.db.query("customers").collect().then((items) => items.length),
      ctx.db.query("leads").collect().then((items) => items.length),
      ctx.db.query("invoices").collect().then((items) => items.length),
      ctx.db.query("estimates").collect().then((items) => items.length),
      ctx.db.query("timeEntries").collect().then((items) => items.length),
      ctx.db.query("files").collect().then((items) => items.length),
    ]);

    return {
      isSeeded: workerCount > 0,
      counts: {
        workers: workerCount,
        projects: projectCount,
        customers: customerCount,
        leads: leadCount,
        invoices: invoiceCount,
        estimates: estimateCount,
        timeEntries: timeEntryCount,
        files: fileCount,
      },
    };
  },
});
