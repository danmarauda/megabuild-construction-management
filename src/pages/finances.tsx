import React from "react";
import { Header } from "../components/header";
import { Card, CardBody, Button, Tabs, Tab, Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, Chip } from "@heroui/react";
import { Icon } from "@iconify/react";
import { LineChart, Line, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { useInvoices, useFinancialSummary } from "../hooks/useConvex";

export default function Finances() {
  const invoices = useInvoices();
  const financialSummary = useFinancialSummary();
  const [view, setView] = React.useState("overview");
  const [period, setPeriod] = React.useState("monthly");

  if (!invoices || !financialSummary) {
    return <div className="p-6"><p className="text-muted-foreground">Loading financial data...</p></div>;
  }

  const currencyBalances = [
    { currency: 'EUR', amount: financialSummary.balance },
    { currency: 'USD', amount: Math.round(financialSummary.balance * 1.1) },
    { currency: 'GBP', amount: Math.round(financialSummary.balance * 0.85) },
    { currency: 'RUB', amount: Math.round(financialSummary.balance * 98) },
    { currency: 'UAH', amount: Math.round(financialSummary.balance * 42) },
  ];
  
  // Sample data for financial charts
  const monthlyData = [
    { name: 'Jan', revenue: 12000, expenses: 10000, profit: 2000 },
    { name: 'Feb', revenue: 15000, expenses: 12000, profit: 3000 },
    { name: 'Mar', revenue: 18000, expenses: 14000, profit: 4000 },
    { name: 'Apr', revenue: 20000, expenses: 15000, profit: 5000 },
    { name: 'May', revenue: 22000, expenses: 16000, profit: 6000 },
    { name: 'Jun', revenue: 19000, expenses: 14500, profit: 4500 },
  ];
  
  const expenseCategories = [
    { name: 'Materials', value: 15000 },
    { name: 'Labor', value: 22000 },
    { name: 'Equipment', value: 8000 },
    { name: 'Office', value: 5000 },
    { name: 'Insurance', value: 3500 },
    { name: 'Misc', value: 2500 }
  ];
  
  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8', '#83a6ed'];

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
                  <Icon icon="lucide:calendar" className="mr-2" />
                  {period === "monthly" ? "Monthly" : period === "quarterly" ? "Quarterly" : "Yearly"}
                </Button>
              </DropdownTrigger>
              <DropdownMenu aria-label="Time period">
                <DropdownItem key="monthly" onPress={() => setPeriod("monthly")}>Monthly</DropdownItem>
                <DropdownItem key="quarterly" onPress={() => setPeriod("quarterly")}>Quarterly</DropdownItem>
                <DropdownItem key="yearly" onPress={() => setPeriod("yearly")}>Yearly</DropdownItem>
              </DropdownMenu>
            </Dropdown>
            
            <Button color="primary">
              <Icon icon="lucide:download" className="mr-2" />
              Export
            </Button>
          </div>
        </div>
        
        <Card className="bg-gray-900 border border-gray-800 mb-6">
          <CardBody>
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
          </CardBody>
        </Card>
        
        {view === "overview" && (
          <>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
              <Card className="bg-gray-900 border border-gray-800">
                <CardBody>
                  <div className="text-gray-400 text-sm">Total Revenue</div>
                  <div className="text-3xl font-semibold text-white mt-1">€{financialSummary.revenue.toLocaleString()}</div>
                  <div className="flex items-center mt-2">
                    <Icon icon="lucide:trending-up" className="text-green-500 mr-1" />
                    <span className="text-green-500 text-sm">+22.2%</span>
                    <span className="text-xs text-gray-400 ml-1">vs. last month</span>
                  </div>
                </CardBody>
              </Card>
              
              <Card className="bg-gray-900 border border-gray-800">
                <CardBody>
                  <div className="text-gray-400 text-sm">Current Balance</div>
                  <div className="text-3xl font-semibold text-white mt-1">€{financialSummary.balance.toLocaleString()}</div>
                  <div className="flex items-center mt-2">
                    <Icon icon="lucide:trending-up" className="text-green-500 mr-1" />
                    <span className="text-green-500 text-sm">+16.8%</span>
                    <span className="text-xs text-gray-400 ml-1">vs. last month</span>
                  </div>
                </CardBody>
              </Card>
              
              <Card className="bg-gray-900 border border-gray-800">
                <CardBody>
                  <div className="text-gray-400 text-sm">Planned Payouts</div>
                  <div className="text-3xl font-semibold text-white mt-1">€{financialSummary.plannedPayouts.toLocaleString()}</div>
                  <div className="flex items-center mt-2">
                    <Icon icon="lucide:trending-down" className="text-red-500 mr-1" />
                    <span className="text-red-500 text-sm">-5.4%</span>
                    <span className="text-xs text-gray-400 ml-1">vs. last month</span>
                  </div>
                </CardBody>
              </Card>
            </div>
            
            <Card className="bg-gray-900 border border-gray-800 mb-6">
              <CardBody>
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
              </CardBody>
            </Card>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
              <Card className="bg-gray-900 border border-gray-800">
                <CardBody>
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-lg font-medium text-white">Currency Balances</h3>
                    <Button variant="light" size="sm">
                      <Icon icon="lucide:more-horizontal" />
                    </Button>
                  </div>
                  <Table aria-label="Currency balances">
                    <TableHeader>
                      <TableColumn>CURRENCY</TableColumn>
                      <TableColumn>AMOUNT</TableColumn>
                      <TableColumn>EQUIVALENT (EUR)</TableColumn>
                    </TableHeader>
                    <TableBody>
                      {currencyBalances.map((balance, index) => (
                        <TableRow key={index} className="border-b border-gray-800">
                          <TableCell>
                            <div className="font-medium text-white">{balance.currency}</div>
                          </TableCell>
                          <TableCell>
                            <div className="text-gray-300">
                              {balance.currency === 'USD' && '$'}
                              {balance.currency === 'EUR' && '€'}
                              {balance.currency === 'GBP' && '£'}
                              {balance.currency === 'RUB' && '₽'}
                              {balance.currency === 'UAH' && '₴'}
                              {balance.amount.toLocaleString()}
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="text-gray-300">€{(balance.amount / (balance.currency === 'EUR' ? 1 : 1.1)).toFixed(2)}</div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardBody>
              </Card>
              
              <Card className="bg-gray-900 border border-gray-800">
                <CardBody>
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
                          formatter={(value) => [`$${value.toLocaleString()}`, 'Amount']}
                        />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                </CardBody>
              </Card>
            </div>
          </>
        )}
        
        {view === "income" && (
          <>
            <Card className="bg-gray-900 border border-gray-800 mb-6">
              <CardBody>
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-medium text-white">Recent Invoices</h3>
                  <Button variant="flat">View All</Button>
                </div>
                <Table aria-label="Recent invoices">
                  <TableHeader>
                    <TableColumn>INVOICE #</TableColumn>
                    <TableColumn>CUSTOMER</TableColumn>
                    <TableColumn>AMOUNT</TableColumn>
                    <TableColumn>DATE</TableColumn>
                    <TableColumn>STATUS</TableColumn>
                    <TableColumn>ACTIONS</TableColumn>
                  </TableHeader>
                  <TableBody>
                    {invoices.map((invoice) => (
                      <TableRow key={invoice.id} className="border-b border-gray-800">
                        <TableCell>
                          <div className="font-medium text-white">{invoice.id}</div>
                        </TableCell>
                        <TableCell>
                          <div className="text-gray-300">Customer #{invoice.customerId}</div>
                        </TableCell>
                        <TableCell>
                          <div className="font-medium text-white">${invoice.amount.toLocaleString()}</div>
                        </TableCell>
                        <TableCell>
                          <div className="text-gray-300">{invoice.createdAt}</div>
                        </TableCell>
                        <TableCell>
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
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <Button isIconOnly variant="light" size="sm">
                              <Icon icon="lucide:eye" className="text-gray-400" />
                            </Button>
                            <Button isIconOnly variant="light" size="sm">
                              <Icon icon="lucide:edit" className="text-gray-400" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardBody>
            </Card>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="bg-gray-900 border border-gray-800">
                <CardBody>
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-lg font-medium text-white">Income by Source</h3>
                    <Button variant="light" size="sm">
                      <Icon icon="lucide:more-horizontal" />
                    </Button>
                  </div>
                  <div className="h-64">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={[
                            { name: 'Projects', value: 45000 },
                            { name: 'Maintenance', value: 15000 },
                            { name: 'Consulting', value: 10000 },
                            { name: 'Materials', value: 5000 },
                          ]}
                          cx="50%"
                          cy="50%"
                          innerRadius={60}
                          outerRadius={80}
                          fill="#8884d8"
                          paddingAngle={5}
                          dataKey="value"
                          label={({name, percent}) => `${name}: ${(percent * 100).toFixed(0)}%`}
                        >
                          {[0, 1, 2, 3].map((index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                          ))}
                        </Pie>
                        <Tooltip 
                          contentStyle={{ backgroundColor: "#222", borderColor: "#444" }}
                          labelStyle={{ color: "#fff" }}
                          formatter={(value) => [`$${value.toLocaleString()}`, 'Amount']}
                        />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                </CardBody>
              </Card>
              
              <Card className="bg-gray-900 border border-gray-800">
                <CardBody>
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
                          formatter={(value) => [`$${value.toLocaleString()}`, 'Revenue']}
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
                </CardBody>
              </Card>
            </div>
          </>
        )}
        
        {view === "expenses" && (
          <>
            <Card className="bg-gray-900 border border-gray-800 mb-6">
              <CardBody>
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-medium text-white">Expense Categories</h3>
                  <Button variant="flat">Add Expense</Button>
                </div>
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
                        formatter={(value) => [`$${value.toLocaleString()}`, 'Amount']}
                      />
                      <Bar dataKey="value" fill="#7828C8" name="Amount" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardBody>
            </Card>
            
            <Card className="bg-gray-900 border border-gray-800">
              <CardBody>
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-medium text-white">Recent Expenses</h3>
                  <Button variant="light" size="sm">
                    <Icon icon="lucide:filter" className="mr-2" />
                    Filter
                  </Button>
                </div>
                <Table aria-label="Recent expenses">
                  <TableHeader>
                    <TableColumn>INVOICE #</TableColumn>
                    <TableColumn>STATUS</TableColumn>
                    <TableColumn>AMOUNT</TableColumn>
                    <TableColumn>DATE</TableColumn>
                    <TableColumn>ACTIONS</TableColumn>
                  </TableHeader>
                  <TableBody>
                    {invoices.slice(0, 5).map((invoice) => (
                      <TableRow key={invoice.id} className="border-b border-gray-800">
                        <TableCell>
                          <div className="font-medium text-white">{invoice.id}</div>
                        </TableCell>
                        <TableCell>
                          <div className="text-gray-300">{invoice.status}</div>
                        </TableCell>
                        <TableCell>
                          <div className="font-medium text-white">${invoice.amount.toLocaleString()}</div>
                        </TableCell>
                        <TableCell>
                          <div className="text-gray-300">{invoice.createdAt}</div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <Button isIconOnly variant="light" size="sm">
                              <Icon icon="lucide:edit" className="text-gray-400" />
                            </Button>
                            <Button isIconOnly variant="light" size="sm">
                              <Icon icon="lucide:trash-2" className="text-gray-400" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardBody>
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