import React from "react";
import { Card, Button } from "@heroui/react";
import { Icon } from "@iconify/react";
import { Header } from "../components/header";
import { ProjectCard } from "../components/project-card";
import { FinancialCard } from "../components/financial-card";
import { ChartCard } from "../components/chart-card";
import { PaymentStatusCard } from "../components/payment-status-card";
import { EmptyStates } from "../components/empty-state";
import { useProjects, useFinancialSummary } from "../hooks/useConvex";

export default function Dashboard() {
  const { data: projects, isLoading: projectsLoading } = useProjects();
  const financialSummary = useFinancialSummary();

  // Default values if financialSummary is undefined
  const summary = financialSummary || {
    revenue: 0,
    balance: 0,
    feesEarned: 0,
    chargebackRate: 0,
    totalTransactions: 0,
    plannedPayouts: 0,
    successfulPayments: 0,
    failedPayments: 0,
  };

  const isLoading = projectsLoading;

  // Empty state check - if no projects and no financial data
  const isEmpty = !isLoading && (!projects || projects.length === 0) && !financialSummary;

  if (isEmpty) {
    return (
      <div className="flex-1 overflow-auto">
        <Header title="Dashboard" />
        <div className="p-6">
          <EmptyStates.financials />
        </div>
      </div>
    );
  }

  // Generate sample data based on actual financial summary
  const baseValue = financialSummary?.revenue || 0;
  const revenueData = [
    { day: 'Mon', value: Math.round(baseValue * 0.1) },
    { day: 'Tue', value: Math.round(baseValue * 0.15) },
    { day: 'Wed', value: Math.round(baseValue * 0.12) },
    { day: 'Thu', value: Math.round(baseValue * 0.18) },
    { day: 'Fri', value: Math.round(baseValue * 0.14) },
    { day: 'Sat', value: Math.round(baseValue * 0.2) },
    { day: 'Sun', value: Math.round(baseValue * 0.11) }
  ].filter(d => d.value > 0);

  const transactionData = [
    { day: 'Mon', value: Math.round(baseValue * 0.08) },
    { day: 'Tue', value: Math.round(baseValue * 0.12) },
    { day: 'Wed', value: Math.round(baseValue * 0.18) },
    { day: 'Thu', value: Math.round(baseValue * 0.14) },
    { day: 'Fri', value: Math.round(baseValue * 0.16) },
    { day: 'Sat', value: Math.round(baseValue * 0.22) },
    { day: 'Sun', value: Math.round(baseValue * 0.1) }
  ].filter(d => d.value > 0);

  // Use project data to generate merchant stats if available
  const topMerchants = projects && projects.length > 0
    ? projects.slice(0, 4).map((p, i) => ({
        id: p.id,
        name: p.customer.name,
        email: p.customer.email || 'no-email@example.com',
        amount: p.financials?.revenue || 10000 * (4 - i)
      }))
    : [];

  const currencyBalances = [
    { currency: 'USD', amount: Math.round(summary.balance * 1.1) },
    { currency: 'RUB', amount: Math.round(summary.balance * 98) },
    { currency: 'UAH', amount: Math.round(summary.balance * 42) },
    { currency: 'EUR', amount: Math.round(summary.balance) },
    { currency: 'GBP', amount: Math.round(summary.balance * 0.85) }
  ].filter(c => c.amount > 0);

  return (
    <div className="flex-1 overflow-auto">
      <Header title="Dashboard" />

      <div className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
          <FinancialCard
            title="Revenue growth"
            value={`€${summary.revenue.toLocaleString()}`}
            change="+22.2%"
            isPositive={true}
            period="Last 30 days"
            icon="lucide:arrow-up-right"
          />
          <FinancialCard
            title="Rolling balance"
            value={`€${summary.balance.toLocaleString()}`}
            change="+22.2%"
            isPositive={true}
            period="Last 30 days"
          />
          <FinancialCard
            title="Fees earned"
            value={`€${summary.feesEarned.toLocaleString()}`}
            change="-12.2%"
            isPositive={false}
            period="Last 30 days"
          />
          <FinancialCard
            title="Chargeback rate"
            value={`€${summary.chargebackRate.toLocaleString()}`}
            change="+22.2%"
            isPositive={true}
            period="Last 30 days"
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          <ChartCard
            title="Total transactions"
            value={`€${summary.totalTransactions.toLocaleString()}`}
            period="Last 7 days"
            data={transactionData.length > 0 ? transactionData : [{ day: 'No data', value: 0 }]}
            color="#7828C8"
          />
          <ChartCard
            title="Revenue growth"
            value={`€${summary.revenue.toLocaleString()}`}
            period="Last 7 days"
            data={revenueData.length > 0 ? revenueData : [{ day: 'No data', value: 0 }]}
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
          <PaymentStatusCard
            title="Planned payouts"
            value={`€${summary.plannedPayouts.toLocaleString()}`}
            subtitle="Total future payout planned"
            successfulAmount={`€${summary.successfulPayments.toLocaleString()}`}
            failedAmount={`€${summary.failedPayments.toLocaleString()}`}
            successPercentage={80}
          />
          <Card className="bg-gray-900 border border-gray-800">
            <Card.Content>
              <h3 className="text-lg font-medium text-white mb-4">Top merchants by payouts</h3>
              {topMerchants.length > 0 ? (
                <div className="space-y-3">
                  {topMerchants.map((merchant) => (
                    <div key={merchant.id} className="flex items-center justify-between">
                      <div>
                        <div className="font-medium text-white">{merchant.name}</div>
                        <div className="text-xs text-gray-400">{merchant.email}</div>
                      </div>
                      <div className="text-white">${merchant.amount.toLocaleString()}</div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-sm text-gray-400">No merchant data available yet</div>
              )}
            </Card.Content>
          </Card>
          <Card className="bg-gray-900 border border-gray-800">
            <Card.Content>
              <h3 className="text-lg font-medium text-white mb-4">Current balance</h3>
              {currencyBalances.length > 0 ? (
                <div className="space-y-2">
                  {currencyBalances.map((balance) => (
                    <div key={balance.currency} className="flex items-center justify-between">
                      <div className="text-gray-400">{balance.currency}</div>
                      <div className="text-white font-medium">{balance.amount.toLocaleString()}</div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-sm text-gray-400">No currency data available yet</div>
              )}
            </Card.Content>
          </Card>
        </div>

        <div className="mb-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold">Active Projects</h2>
            <Button variant="light">View All</Button>
          </div>

          {projects && projects.length > 0 ? (
            projects.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))
          ) : (
            <div className="py-8 text-center">
              <Icon icon="lucide:hard-hat" className="text-4xl text-gray-500 mx-auto mb-2" />
              <div className="text-gray-400">No active projects yet</div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
