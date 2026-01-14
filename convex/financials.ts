import { query } from "./_generated/server";

export const getDashboardData = query({
  handler: async (ctx) => {
    // Get all projects
    const projects = await ctx.db.query("projects").collect();

    // Get all invoices
    const invoices = await ctx.db.query("invoices").collect();

    // Get all leads
    const leads = await ctx.db.query("leads").collect();

    // Get all estimates
    const estimates = await ctx.db.query("estimates").collect();

    // Calculate project statistics
    const activeProjects = projects.filter((p) => p.status === "active").length;
    const completedProjects = projects.filter((p) => p.status === "completed").length;
    const totalProjects = projects.length;

    // Calculate financial statistics
    const totalRevenue = projects.reduce((sum, p) => sum + (p.revenue || 0), 0);
    const totalProfit = projects.reduce((sum, p) => sum + (p.profit || 0), 0);
    const totalEstimatedCost = projects.reduce((sum, p) => sum + (p.estimatedCost || 0), 0);

    // Calculate invoice statistics
    const paidInvoices = invoices.filter((i) => i.status === "paid").length;
    const pendingInvoices = invoices.filter((i) => i.status === "pending" || i.status === "sent").length;
    const totalInvoices = invoices.length;
    const totalInvoiceAmount = invoices.reduce((sum, i) => sum + i.amount, 0);
    const paidAmount = invoices.filter((i) => i.status === "paid").reduce((sum, i) => sum + i.amount, 0);

    // Calculate lead statistics
    const newLeads = leads.filter((l) => l.status === "new").length;
    const convertedLeads = leads.filter((l) => l.status === "converted").length;
    const totalLeads = leads.length;
    const totalPipelineValue = leads.reduce((sum, l) => sum + l.estimatedValue, 0);

    // Calculate estimate statistics
    const approvedEstimates = estimates.filter((e) => e.status === "approved").length;
    const pendingEstimates = estimates.filter((e) => e.status === "sent" || e.status === "viewed").length;
    const totalEstimates = estimates.length;
    const totalEstimateAmount = estimates.reduce((sum, e) => sum + e.amount, 0);

    return {
      projects: {
        total: totalProjects,
        active: activeProjects,
        completed: completedProjects,
        onHold: totalProjects - activeProjects - completedProjects,
      },
      revenue: {
        total: totalRevenue,
        profit: totalProfit,
        estimatedCost: totalEstimatedCost,
      },
      invoices: {
        total: totalInvoices,
        paid: paidInvoices,
        pending: pendingInvoices,
        totalAmount: totalInvoiceAmount,
        paidAmount: paidAmount,
        outstandingAmount: totalInvoiceAmount - paidAmount,
      },
      leads: {
        total: totalLeads,
        new: newLeads,
        converted: convertedLeads,
        pipelineValue: totalPipelineValue,
      },
      estimates: {
        total: totalEstimates,
        approved: approvedEstimates,
        pending: pendingEstimates,
        totalAmount: totalEstimateAmount,
      },
    };
  },
});

export const getFinancialSummary = query({
  handler: async (ctx) => {
    // Fetch all invoices
    const invoices = await ctx.db.query("invoices").collect();

    // Fetch all estimates
    const estimates = await ctx.db.query("estimates").collect();

    // Fetch all projects
    const projects = await ctx.db.query("projects").collect();

    // Calculate invoice metrics
    const totalInvoiced = invoices.reduce((sum, inv) => sum + inv.amount, 0);
    const paidInvoices = invoices.filter((inv) => inv.status === "paid");
    const totalPaid = paidInvoices.reduce((sum, inv) => sum + inv.amount, 0);
    const pendingInvoices = invoices.filter(
      (inv) => inv.status === "sent" || inv.status === "pending" || inv.status === "viewed"
    );
    const totalPending = pendingInvoices.reduce(
      (sum, inv) => sum + inv.amount,
      0
    );
    const overdueInvoices = invoices.filter((inv) => inv.status === "overdue");
    const totalOverdue = overdueInvoices.reduce(
      (sum, inv) => sum + inv.amount,
      0
    );

    // Calculate estimate metrics
    const totalEstimated = estimates.reduce(
      (sum, est) => sum + est.amount,
      0
    );
    const acceptedEstimates = estimates.filter(
      (est) => est.status === "approved"
    );
    const totalAccepted = acceptedEstimates.reduce(
      (sum, est) => sum + est.amount,
      0
    );
    const pendingEstimates = estimates.filter(
      (est) => est.status === "sent" || est.status === "draft" || est.status === "viewed"
    );
    const totalPendingEstimates = pendingEstimates.reduce(
      (sum, est) => sum + est.amount,
      0
    );

    // Project metrics
    const totalProjectValue = projects.reduce(
      (sum, proj) => sum + (proj.revenue || 0),
      0
    );
    const totalProjectBudget = projects.reduce(
      (sum, proj) => sum + (proj.estimatedCost || 0),
      0
    );
    const activeProjects = projects.filter(
      (proj) => proj.status === "active"
    ).length;
    const completedProjects = projects.filter(
      (proj) => proj.status === "completed"
    ).length;

    // Calculate conversion rate
    const conversionRate =
      estimates.length > 0
        ? (acceptedEstimates.length / estimates.length) * 100
        : 0;

    // Calculate profit margin (total paid - total budget) / total paid
    const profitMargin =
      totalPaid > 0 ? ((totalPaid - totalProjectBudget) / totalPaid) * 100 : 0;

    return {
      invoices: {
        total: invoices.length,
        totalAmount: totalInvoiced,
        paid: {
          count: paidInvoices.length,
          amount: totalPaid,
        },
        pending: {
          count: pendingInvoices.length,
          amount: totalPending,
        },
        overdue: {
          count: overdueInvoices.length,
          amount: totalOverdue,
        },
      },
      estimates: {
        total: estimates.length,
        totalAmount: totalEstimated,
        accepted: {
          count: acceptedEstimates.length,
          amount: totalAccepted,
        },
        pending: {
          count: pendingEstimates.length,
          amount: totalPendingEstimates,
        },
        conversionRate,
      },
      projects: {
        total: projects.length,
        activeCount: activeProjects,
        completedCount: completedProjects,
        totalValue: totalProjectValue,
        totalBudget: totalProjectBudget,
      },
      summary: {
        totalRevenue: totalPaid,
        totalPending: totalPending,
        totalOverdue: totalOverdue,
        profitMargin,
        averageProjectValue:
          projects.length > 0 ? totalProjectValue / projects.length : 0,
      },
    };
  },
});
