import { query } from "./_generated/server";

export const get = query({
  args: {},
  handler: async () => {
    // Return default financial summary values
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
