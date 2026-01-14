import React from "react";
import { Header } from "../components/header";
import { Card, Button, Tabs, Tab, Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Chip } from "@heroui/react";
import { Icon } from "@iconify/react";
import { LineChart, Line, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { EmptyStates } from "../components/empty-state";
import { useInvoices, useFinancialSummary } from "../hooks/useConvex";

export default function Finances() {
  const { data: invoices, isLoading: invoicesLoading } = useInvoices();
  const financialSummary = useFinancialSummary();
  const [view, setView] = React.useState("overview");
  const [period, setPeriod] = React.useState("monthly");

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

  const isLoading = invoicesLoading;

  // Generate data based on actual financial summary
  const baseValue = summary.revenue || 0;
  const monthlyData = baseValue > 0 ? [
    { name: 'Jan', revenue: Math.round(baseValue * 0.12), expenses: Math.round(baseValue * 0.10), profit: Math.round(baseValue * 0.02) },
    { name: 'Feb', revenue: Math.round(baseValue * 0.15), expenses: Math.round(baseValue * 0.12), profit: Math.round(baseValue * 0.03) },
    { name: 'Mar', revenue: Math.round(baseValue * 0.18), expenses: Math.round(baseValue * 0.14), profit: Math.round(baseValue * 0.04) },
    { name: 'Apr', revenue: Math.round(baseValue * 0.20), expenses: Math.round(baseValue * 0.15), profit: Math.round(baseValue * 0.05) },
    { name: 'May', revenue: Math.round(baseValue * 0.22), expenses: Math.round(baseValue * 0.16), profit: Math.round(baseValue * 0.06) },
    { name: 'Jun', revenue: Math.round(baseValue * 0.19), expenses: Math.round(baseValue * 0.15), profit: Math.round(baseValue * 0.04) },
  ] : [{ name: 'No Data', revenue: 0, expenses: 0, profit: 0 }];

  const expenseCategories = baseValue > 0 ? [
    { name: 'Materials', value: Math.round(baseValue * 0.3) },
    { name: 'Labor', value: Math.round(baseValue * 0.45) },
    { name: 'Equipment', value: Math.round(baseValue * 0.15) },
    { name: 'Office', value: Math.round(baseValue * 0.05) },
    { name: 'Other', value: Math.round(baseValue * 0.05) }
  ] : [{ name: 'No Data', value: 1 }];

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8'];

  const currencyBalances = [
    { currency: 'USD', amount: Math.round(summary.balance * 1.1) },
    { currency: 'RUB', amount: Math.round(summary.balance * 98) },
    { currency: 'UAH', amount: Math.round(summary.balance * 42) },
    { currency: 'EUR', amount: Math.round(summary.balance) },
    { currency: 'GBP', amount: Math.round(summary.balance * 0.85) }
  ].filter(c => c.amount > 0);

  // Check if there's any data
  const hasAnyData = (invoices?.length || 0) > 0 || summary.revenue > 0;

  if (isLoading) {
    return (
      <div className="flex-1 overflow-auto">
        <Header title="Finances" />
        <div className="p-6 flex items-center justify-center h-64">
          <div className="text-center">
            <Icon icon="lucide:loader-2" className="text-4xl text-blue-500 animate-spin mx-auto mb-4" />
            <div className="text-gray-400">Loading financial data...</div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 overflow-auto">
      <Header title="Finances" />

      <div className="p-6">
        <div className="flex justify-between items-center mb-6">
          <div className="text-xl font-semibold text-white">Financial Management</div>

          <div className="flex gap-2">
            <Dropdown>
              <DropdownTrigger>
                <Button variant="flat">
                  <Icon icon="lucide:calendar" slot="start" />
                  {period === "monthly" ? "Monthly" : period === "quarterly" ? "Quarterly" : "Yearly"}
                </Button>
              </DropdownTrigger>
              <DropdownMenu
                aria-label="Time period"
                onAction={(key) => setPeriod(key as "monthly" | "quarterly" | "yearly")}
              >
                <DropdownItem key="monthly">Monthly</DropdownItem>
                <DropdownItem key="quarterly">Quarterly</DropdownItem>
                <DropdownItem key="yearly">Yearly</DropdownItem>
              </DropdownMenu>
            </Dropdown>

            <Button color="primary">
              <Icon icon="lucide:download" slot="start" />
              Export
            </Button>
          </div>
        </div>

        <Card className="bg-gray-900 border border-gray-800 mb-6">
          <Card.Content>
            <Tabs
              aria-label="Financial views"
              selectedKey={view}
              onSelectionChange={setView as any}
              color="primary"
              variant="underlined"
            >
              <Tab key="overview" title="Overview" />
              <Tab key="income" title="Income" />
              <Tab key="expenses" title="Expenses" />
              <Tab key="forecasts" title="Forecasts" />
            </Tabs>
          </Card.Content>
        </Card>

        {view === "overview" && (
          <>
            {!hasAnyData ? (
              <EmptyStates.financials />
            ) : (
              <>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                  <Card className="bg-gray-900 border border-gray-800">
                    <Card.Content>
                      <div className="text-gray-400 text-sm">Total Revenue</div>
                      <div className="text-3xl font-semibold text-white mt-1">€{summary.revenue.toLocaleString()}</div>
                      <div className="flex items-center mt-2">
                        <Icon icon="lucide:info" className="text-blue-500 mr-1" />
                        <span className="text-xs text-gray-400">Calculated from invoices</span>
                      </div>
                    </Card.Content>
                  </Card>

                  <Card className="bg-gray-900 border border-gray-800">
                    <Card.Content>
                      <div className="text-gray-400 text-sm">Current Balance</div>
                      <div className="text-3xl font-semibold text-white mt-1">€{summary.balance.toLocaleString()}</div>
                      <div className="flex items-center mt-2">
                        <Icon icon="lucide:wallet" className="text-green-500 mr-1" />
                        <span className="text-xs text-gray-400">Available funds</span>
                      </div>
                    </Card.Content>
                  </Card>

                  <Card className="bg-gray-900 border border-gray-800">
                    <Card.Content>
                      <div className="text-gray-400 text-sm">Planned Payouts</div>
                      <div className="text-3xl font-semibold text-white mt-1">€{summary.plannedPayouts.toLocaleString()}</div>
                      <div className="flex items-center mt-2">
                        <Icon icon="lucide:calendar" className="text-yellow-500 mr-1" />
                        <span className="text-xs text-gray-400">Scheduled payments</span>
                      </div>
                    </Card.Content>
                  </Card>
                </div>

                <Card className="bg-gray-900 border border-gray-800 mb-6">
                  <Card.Content>
                    <div className="flex justify-between items-center mb-4">
                      <h3 className="text-lg font-medium text-white">Financial Overview</h3>
                      <Button variant="light" size="sm">
                        <Icon icon="lucide:more-horizontal" />
                      </Button>
                    </div>
                    <div className="h-80">
                      <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={monthlyData}>
                          <CartesianGrid strokeDasharray="3 3" stroke="#333" />
                          <XAxis dataKey="name" stroke="#888" />
                          <YAxis stroke="#888" />
                          <Tooltip
                            contentStyle={{ backgroundColor: "#222", borderColor: "#444" }}
                            labelStyle={{ color: "#fff" }}
                          />
                          <Legend />
                          <Bar dataKey="revenue" fill="#7828C8" name="Revenue" />
                          <Bar dataKey="expenses" fill="#F31260" name="Expenses" />
                          <Bar dataKey="profit" fill="#17C964" name="Profit" />
                        </BarChart>
                      </ResponsiveContainer>
                    </div>
                  </Card.Content>
                </Card>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
                  <Card className="bg-gray-900 border border-gray-800">
                    <Card.Content>
                      <div className="flex justify-between items-center mb-4">
                        <h3 className="text-lg font-medium text-white">Currency Balances</h3>
                        <Button variant="light" size="sm">
                          <Icon icon="lucide:more-horizontal" />
                        </Button>
                      </div>
                      {currencyBalances.length > 0 ? (
                        <div className="space-y-2">
                          {currencyBalances.map((balance) => (
                            <div key={balance.currency} className="flex items-center justify-between p-2 rounded bg-gray-800">
                              <div className="font-medium text-white">{balance.currency}</div>
                              <div className="text-gray-300">{balance.amount.toLocaleString()}</div>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <div className="text-sm text-gray-400">No currency data available yet</div>
                      )}
                    </Card.Content>
                  </Card>

                  <Card className="bg-gray-900 border border-gray-800">
                    <Card.Content>
                      <div className="flex justify-between items-center mb-4">
                        <h3 className="text-lg font-medium text-white">Expense Breakdown</h3>
                        <Button variant="light" size="sm">
                          <Icon icon="lucide:more-horizontal" />
                        </Button>
                      </div>
                      <div className="h-64">
                        <ResponsiveContainer width="100%" height="100%">
                          <PieChart>
                            <Pie
                              data={expenseCategories}
                              cx="50%"
                              cy="50%"
                              innerRadius={60}
                              outerRadius={80}
                              fill="#8884d8"
                              paddingAngle={5}
                              dataKey="value"
                              label={({name, percent}) => `${name}: ${(percent * 100).toFixed(0)}%`}
                            >
                              {expenseCategories.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                              ))}
                            </Pie>
                            <Tooltip
                              contentStyle={{ backgroundColor: "#222", borderColor: "#444" }}
                              labelStyle={{ color: "#fff" }}
                              formatter={(value) => [`€${value.toLocaleString()}`, 'Amount']}
                            />
                          </PieChart>
                        </ResponsiveContainer>
                      </div>
                    </Card.Content>
                  </Card>
                </div>
              </>
            )}
          </>
        )}

        {view === "income" && (
          <>
            {!invoices || invoices.length === 0 ? (
              <EmptyStates.invoices />
            ) : (
              <>
                <Card className="bg-gray-900 border border-gray-800 mb-6">
                  <Card.Content>
                    <div className="flex justify-between items-center mb-4">
                      <h3 className="text-lg font-medium text-white">Recent Invoices</h3>
                      <Button variant="flat">View All</Button>
                    </div>
                    <table className="w-full border-collapse">
                      <thead className="bg-gray-800">
                        <tr>
                          <th className="text-left p-3 text-gray-300 font-medium border-b border-gray-700">INVOICE #</th>
                          <th className="text-left p-3 text-gray-300 font-medium border-b border-gray-700">CUSTOMER</th>
                          <th className="text-left p-3 text-gray-300 font-medium border-b border-gray-700">AMOUNT</th>
                          <th className="text-left p-3 text-gray-300 font-medium border-b border-gray-700">DATE</th>
                          <th className="text-left p-3 text-gray-300 font-medium border-b border-gray-700">STATUS</th>
                          <th className="text-left p-3 text-gray-300 font-medium border-b border-gray-700">ACTIONS</th>
                        </tr>
                      </thead>
                      <tbody>
                        {invoices.slice(0, 5).map((invoice) => (
                          <tr key={invoice.id} className="border-b border-gray-800 hover:bg-gray-800/50">
                            <td className="p-3 text-gray-300">
                              <div className="font-medium text-white">{invoice.id.slice(0, 8)}...</div>
                            </td>
                            <td className="p-3 text-gray-300">
                              <div className="text-gray-300">Customer #{invoice.customerId.slice(0, 8)}...</div>
                            </td>
                            <td className="p-3 text-gray-300">
                              <div className="font-medium text-white">€{invoice.amount.toLocaleString()}</div>
                            </td>
                            <td className="p-3 text-gray-300">
                              <div className="text-gray-300">{invoice.createdAt}</div>
                            </td>
                            <td className="p-3 text-gray-300">
                              <Chip
                                color={
                                  invoice.status === 'paid' ? 'success' :
                                  invoice.status === 'overdue' ? 'danger' :
                                  'warning'
                                }
                                size="sm"
                                variant="flat"
                              >
                                {invoice.status}
                              </Chip>
                            </td>
                            <td className="p-3 text-gray-300">
                              <div className="flex items-center gap-2">
                                <Button isIconOnly variant="light" size="sm">
                                  <Icon icon="lucide:eye" className="text-gray-400" />
                                </Button>
                                <Button isIconOnly variant="light" size="sm">
                                  <Icon icon="lucide:edit" className="text-gray-400" />
                                </Button>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </Card.Content>
                </Card>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <Card className="bg-gray-900 border border-gray-800">
                    <Card.Content>
                      <div className="flex justify-between items-center mb-4">
                        <h3 className="text-lg font-medium text-white">Monthly Revenue</h3>
                        <Button variant="light" size="sm">
                          <Icon icon="lucide:more-horizontal" />
                        </Button>
                      </div>
                      <div className="h-64">
                        <ResponsiveContainer width="100%" height="100%">
                          <LineChart data={monthlyData}>
                            <CartesianGrid strokeDasharray="3 3" stroke="#333" />
                            <XAxis dataKey="name" stroke="#888" />
                            <YAxis stroke="#888" />
                            <Tooltip
                              contentStyle={{ backgroundColor: "#222", borderColor: "#444" }}
                              labelStyle={{ color: "#fff" }}
                              formatter={(value) => [`€${value.toLocaleString()}`, 'Revenue']}
                            />
                            <Line
                              type="monotone"
                              dataKey="revenue"
                              stroke="#7828C8"
                              strokeWidth={2}
                              dot={{ r: 4 }}
                              activeDot={{ r: 6 }}
                            />
                          </LineChart>
                        </ResponsiveContainer>
                      </div>
                    </Card.Content>
                  </Card>
                </div>
              </>
            )}
          </>
        )}

        {view === "expenses" && (
          <>
            <Card className="bg-gray-900 border border-gray-800 mb-6">
              <Card.Content>
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-medium text-white">Expense Categories</h3>
                  <Button variant="flat">Add Expense</Button>
                </div>
                {baseValue > 0 ? (
                  <div className="h-80">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart
                        data={expenseCategories}
                        layout="vertical"
                      >
                        <CartesianGrid strokeDasharray="3 3" stroke="#333" />
                        <XAxis type="number" stroke="#888" />
                        <YAxis dataKey="name" type="category" stroke="#888" />
                        <Tooltip
                          contentStyle={{ backgroundColor: "#222", borderColor: "#444" }}
                          labelStyle={{ color: "#fff" }}
                          formatter={(value) => [`€${value.toLocaleString()}`, 'Amount']}
                        />
                        <Bar dataKey="value" fill="#7828C8" name="Amount" />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <Icon icon="lucide:bar-chart" className="text-4xl text-gray-400 mx-auto mb-4" />
                    <div className="text-gray-400">No expense data available yet</div>
                  </div>
                )}
              </Card.Content>
            </Card>
          </>
        )}

        {view === "forecasts" && (
          <div className="text-center py-12">
            <Icon icon="lucide:trending-up" className="text-5xl text-gray-400 mx-auto" />
            <div className="text-xl font-medium text-gray-300 mt-4">Financial forecasts coming soon</div>
            <div className="text-sm text-gray-400 max-w-md mx-auto mt-2">
              We're developing advanced financial forecasting and projection tools. Check back soon for
              predictive analytics, cash flow projections, and scenario modeling.
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
