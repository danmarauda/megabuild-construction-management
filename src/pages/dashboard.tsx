import React from "react";
import { Card, CardBody, Button } from "@heroui/react";
import { Icon } from "@iconify/react";
import { Header } from "../components/header";
import { ProjectCard } from "../components/project-card";
import { FinancialCard } from "../components/financial-card";
import { ChartCard } from "../components/chart-card";
import { PaymentStatusCard } from "../components/payment-status-card";
import { MerchantList } from "../components/merchant-list";
import { CurrencyBalanceCard } from "../components/currency-balance-card";
import { useProjects, useFinancialSummary } from "../hooks/useConvex";

export default function Dashboard() {
  const projects = useProjects();
  const financialSummary = useFinancialSummary();

  // Sample data for charts - in production this would come from Convex
  const topMerchants = [
    { id: '1', name: 'Masum Parvej', email: 'hello@masum.design', amount: 430871 },
    { id: '2', name: 'Floyd Miles', email: 'floyed@gmail.com', amount: 361253 },
    { id: '3', name: 'Dianne Russell', email: 'michael@example.com', amount: 297105 },
    { id: '4', name: 'Ronald Richards', email: 'tanyahill@example.com', amount: 12893 }
  ];

  const currencyBalances = [
    { currency: 'USD', amount: 10180.00 },
    { currency: 'RUB', amount: 33180.00 },
    { currency: 'UAH', amount: 898110.00 },
    { currency: 'EUR', amount: 59609.00 },
    { currency: 'GBP', amount: 15043.00 }
  ];

  const revenueData = [
    { day: 'Sat 26', value: 3000 },
    { day: 'Sun 27', value: 9000 },
    { day: 'Mon 28', value: 15000 },
    { day: 'Tue 29', value: 8000 },
    { day: 'Wed 30', value: 5000 },
    { day: 'Thu 31', value: 10000 },
    { day: 'Fri 01', value: 12000 }
  ];

  const transactionData = [
    { day: 'Sat 26', value: 2000 },
    { day: 'Sun 27', value: 4000 },
    { day: 'Mon 28', value: 10000 },
    { day: 'Tue 29', value: 7000 },
    { day: 'Wed 30', value: 9000 },
    { day: 'Thu 31', value: 5000 },
    { day: 'Fri 01', value: 12000 }
  ];

  // Show loading state if data is not yet loaded
  if (!projects || !financialSummary) {
    return (
      <div className="flex-1 overflow-auto">
        <Header title="Dashboard" />
        <div className="p-6">
          <div className="flex items-center justify-center h-64">
            <p className="text-muted-foreground">Loading...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 overflow-auto">
      <Header title="Dashboard" />

      <div className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
          <FinancialCard
            title="Revenue growth"
            value={`€${financialSummary.revenue.toLocaleString()}`}
            change="+22.2%"
            isPositive={true}
            period="Last 30 days"
            icon="lucide:arrow-up-right"
          />
          <FinancialCard
            title="Rolling balance"
            value={`€${financialSummary.balance.toLocaleString()}`}
            change="+22.2%"
            isPositive={true}
            period="Last 30 days"
          />
          <FinancialCard
            title="Fees earned"
            value={`€${financialSummary.feesEarned.toLocaleString()}`}
            change="-12.2%"
            isPositive={false}
            period="Last 30 days"
          />
          <FinancialCard
            title="Chargeback rate"
            value={`€${financialSummary.chargebackRate.toLocaleString()}`}
            change="+22.2%"
            isPositive={true}
            period="Last 30 days"
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          <ChartCard
            title="Total transactions"
            value={`€${financialSummary.totalTransactions.toLocaleString()}`}
            period="Last 7 days"
            data={transactionData}
            color="#7828C8"
          />
          <ChartCard
            title="Revenue growth"
            value={`€${financialSummary.revenue.toLocaleString()}`}
            period="Last 7 days"
            data={revenueData}
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
          <PaymentStatusCard
            title="Planned payouts"
            value={`€${financialSummary.plannedPayouts.toLocaleString()}`}
            subtitle="Total future payout planned"
            successfulAmount={`€${financialSummary.successfulPayments.toLocaleString()}`}
            failedAmount={`€${financialSummary.failedPayments.toLocaleString()}`}
            successPercentage={80}
          />
          <MerchantList
            title="Top merchants by payouts"
            merchants={topMerchants}
          />
          <CurrencyBalanceCard
            title="Current balance"
            balances={currencyBalances}
          />
        </div>

        <div className="mb-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold">Active Projects</h2>
            <Button variant="light">View All</Button>
          </div>

          {projects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      </div>
    </div>
  );
}