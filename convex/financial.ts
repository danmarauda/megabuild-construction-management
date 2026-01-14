import { query } from "./_generated/server";

export const get = query({
  args: {},
  handler: async (ctx) => {
    // Get the first (and should be only) financial summary record
    const summaries = await ctx.db.query("financialSummary").collect();

    // Return the first summary or default values if none exists
    if (summaries.length > 0) {
      return summaries[0];
    }

    // Return default values if no summary exists
    return {
      revenue: 12220.64,
      balance: 52340.64,
      feesEarned: 13000.0,
      chargebackRate: 27650.0,
      totalTransactions: 7720.64,
      plannedPayouts: 56980.0,
      successfulPayments: 19465.0,
      failedPayments: 946.0,
    };
  },
});
