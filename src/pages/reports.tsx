import React from "react";
import { Header } from "../components/header";
import { Card, CardBody, Button, Tabs, Tab, Dropdown, DropdownTrigger, DropdownMenu, DropdownItem } from "@heroui/react";
import { Icon } from "@iconify/react";
import { LineChart, Line, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { useProjects, useInvoices } from "../hooks/useConvex";

export default function Reports() {
  const { data: projects, isLoading: projectsLoading } = useProjects();
  const { data: invoices, isLoading: invoicesLoading } = useInvoices();
  const [reportType, setReportType] = React.useState("financial");
  const [dateRange, setDateRange] = React.useState("Last 7 days");

  // Sample revenue data for charts
  const revenueData = [
    { day: 'Mon', value: 12000 },
    { day: 'Tue', value: 19000 },
    { day: 'Wed', value: 15000 },
    { day: 'Thu', value: 22000 },
    { day: 'Fri', value: 18000 },
    { day: 'Sat', value: 24000 },
    { day: 'Sun', value: 17000 }
  ];

  // Calculate data from actual Convex data
  const projectStatus = React.useMemo(() => [
    { name: 'Active', value: projects?.filter(p => p.status === 'active').length || 0 },
    { name: 'Completed', value: projects?.filter(p => p.status === 'completed').length || 0 },
    { name: 'On Hold', value: projects?.filter(p => p.status === 'on-hold').length || 0 }
  ], [projects]);

  const invoiceStatus = React.useMemo(() => [
    { name: 'Paid', value: invoices?.filter(i => i.status === 'paid').length || 0 },
    { name: 'Pending', value: invoices?.filter(i => i.status === 'pending').length || 0 },
    { name: 'Overdue', value: invoices?.filter(i => i.status === 'overdue').length || 0 }
  ], [invoices]);

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];
  
  return (
    <div className="flex-1 overflow-auto">
      <Header title="Reports" />
      
      <div className="p-6">
        <div className="flex justify-between items-center mb-6">
          <div className="text-xl font-semibold text-white">Reports Dashboard</div>
          
          <div className="flex gap-2">
            <Dropdown>
              <DropdownTrigger>
                <Button variant="flat">
                  <Icon icon="lucide:calendar" className="mr-2" />
                  {dateRange}
                </Button>
              </DropdownTrigger>
              <DropdownMenu aria-label="Date range">
                <DropdownItem key="today" onPress={() => setDateRange("Today")}>Today</DropdownItem>
                <DropdownItem key="yesterday" onPress={() => setDateRange("Yesterday")}>Yesterday</DropdownItem>
                <DropdownItem key="7days" onPress={() => setDateRange("Last 7 days")}>Last 7 days</DropdownItem>
                <DropdownItem key="30days" onPress={() => setDateRange("Last 30 days")}>Last 30 days</DropdownItem>
                <DropdownItem key="90days" onPress={() => setDateRange("Last 90 days")}>Last 90 days</DropdownItem>
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
              aria-label="Report types" 
              selectedKey={reportType} 
              onSelectionChange={setReportType as any}
              color="primary"
              variant="underlined"
            >
              <Tab key="financial" title="Financial" />
              <Tab key="projects" title="Projects" />
              <Tab key="team" title="Team" />
              <Tab key="customers" title="Customers" />
            </Tabs>
          </CardBody>
        </Card>
        
        {reportType === "financial" && (
          <>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
              <Card className="bg-gray-900 border border-gray-800">
                <CardBody>
                  <div className="text-gray-400 text-sm">Total Revenue</div>
                  <div className="text-3xl font-semibold text-white mt-1">$38,000</div>
                  <div className="flex items-center mt-2">
                    <Icon icon="lucide:trending-up" className="text-green-500 mr-1" />
                    <span className="text-green-500 text-sm">+22.5%</span>
                    <span className="text-xs text-gray-400 ml-1">vs. last period</span>
                  </div>
                </CardBody>
              </Card>
              
              <Card className="bg-gray-900 border border-gray-800">
                <CardBody>
                  <div className="text-gray-400 text-sm">Outstanding Invoices</div>
                  <div className="text-3xl font-semibold text-white mt-1">$9,000</div>
                  <div className="flex items-center mt-2">
                    <Icon icon="lucide:trending-down" className="text-red-500 mr-1" />
                    <span className="text-red-500 text-sm">-12.3%</span>
                    <span className="text-xs text-gray-400 ml-1">vs. last period</span>
                  </div>
                </CardBody>
              </Card>
              
              <Card className="bg-gray-900 border border-gray-800">
                <CardBody>
                  <div className="text-gray-400 text-sm">Profit Margin</div>
                  <div className="text-3xl font-semibold text-white mt-1">42%</div>
                  <div className="flex items-center mt-2">
                    <Icon icon="lucide:trending-up" className="text-green-500 mr-1" />
                    <span className="text-green-500 text-sm">+5.1%</span>
                    <span className="text-xs text-gray-400 ml-1">vs. last period</span>
                  </div>
                </CardBody>
              </Card>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
              <Card className="bg-gray-900 border border-gray-800">
                <CardBody>
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-lg font-medium text-white">Revenue Trends</h3>
                    <Button variant="light" size="sm">
                      <Icon icon="lucide:more-horizontal" />
                    </Button>
                  </div>
                  <div className="h-64">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={revenueData}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#333" />
                        <XAxis dataKey="day" stroke="#888" />
                        <YAxis stroke="#888" />
                        <Tooltip 
                          contentStyle={{ backgroundColor: "#222", borderColor: "#444" }}
                          labelStyle={{ color: "#fff" }}
                        />
                        <Legend />
                        <Line type="monotone" dataKey="value" stroke="#7828C8" activeDot={{ r: 8 }} name="Revenue" />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </CardBody>
              </Card>
              
              <Card className="bg-gray-900 border border-gray-800">
                <CardBody>
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-lg font-medium text-white">Invoice Status</h3>
                    <Button variant="light" size="sm">
                      <Icon icon="lucide:more-horizontal" />
                    </Button>
                  </div>
                  <div className="h-64">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={invoiceStatus}
                          cx="50%"
                          cy="50%"
                          innerRadius={60}
                          outerRadius={80}
                          fill="#8884d8"
                          paddingAngle={5}
                          dataKey="value"
                          label={({name, value}) => `${name}: ${value}`}
                        >
                          {invoiceStatus.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                          ))}
                        </Pie>
                        <Tooltip 
                          contentStyle={{ backgroundColor: "#222", borderColor: "#444" }}
                          labelStyle={{ color: "#fff" }}
                        />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                </CardBody>
              </Card>
            </div>
          </>
        )}
        
        {reportType === "projects" && (
          <>
            {projectsLoading ? (
              <div className="py-12 text-center">
                <Icon
                  icon="lucide:loader-2"
                  className="text-4xl text-gray-400 mx-auto animate-spin"
                />
                <div className="mt-2 text-xl font-medium text-gray-300">
                  Loading project reports...
                </div>
              </div>
            ) : (
              <>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                  <Card className="bg-gray-900 border border-gray-800">
                    <CardBody>
                      <div className="text-gray-400 text-sm">Total Projects</div>
                      <div className="text-3xl font-semibold text-white mt-1">
                        {projects?.length || 0}
                      </div>
                    </CardBody>
                  </Card>
              
              <Card className="bg-gray-900 border border-gray-800">
                <CardBody>
                  <div className="text-gray-400 text-sm">Avg. Completion Time</div>
                  <div className="text-3xl font-semibold text-white mt-1">14 days</div>
                </CardBody>
              </Card>
              
              <Card className="bg-gray-900 border border-gray-800">
                <CardBody>
                  <div className="text-gray-400 text-sm">Avg. Project Value</div>
                  <div className="text-3xl font-semibold text-white mt-1">$19,000</div>
                </CardBody>
              </Card>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
              <Card className="bg-gray-900 border border-gray-800">
                <CardBody>
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-lg font-medium text-white">Project Status</h3>
                    <Button variant="light" size="sm">
                      <Icon icon="lucide:more-horizontal" />
                    </Button>
                  </div>
                  <div className="h-64">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={projectStatus}
                          cx="50%"
                          cy="50%"
                          innerRadius={60}
                          outerRadius={80}
                          fill="#8884d8"
                          paddingAngle={5}
                          dataKey="value"
                          label={({name, value}) => `${name}: ${value}`}
                        >
                          {projectStatus.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                          ))}
                        </Pie>
                        <Tooltip 
                          contentStyle={{ backgroundColor: "#222", borderColor: "#444" }}
                          labelStyle={{ color: "#fff" }}
                        />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                </CardBody>
              </Card>
              
              <Card className="bg-gray-900 border border-gray-800">
                <CardBody>
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-lg font-medium text-white">Completion Rate</h3>
                    <Button variant="light" size="sm">
                      <Icon icon="lucide:more-horizontal" />
                    </Button>
                  </div>
                  <div className="h-64">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={projects?.map(p => ({ name: p.title.split(' - ')[1] || p.title, value: p.completionPercentage })) || []}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#333" />
                        <XAxis dataKey="name" stroke="#888" />
                        <YAxis stroke="#888" />
                        <Tooltip
                          contentStyle={{ backgroundColor: "#222", borderColor: "#444" }}
                          labelStyle={{ color: "#fff" }}
                        />
                        <Bar dataKey="value" fill="#7828C8" name="Completion %" />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </CardBody>
              </Card>
            </div>
          </>
            )}
          </>
        )}

        {reportType === "team" && (
          <div className="text-center py-12">
            <Icon icon="lucide:users" className="text-5xl text-gray-400 mx-auto" />
            <div className="text-xl font-medium text-gray-300 mt-4">Team reports coming soon</div>
            <div className="text-sm text-gray-400 max-w-md mx-auto mt-2">
              We're working on comprehensive team analytics. Check back soon for insights on team performance,
              workload distribution, and productivity metrics.
            </div>
          </div>
        )}
        
        {reportType === "customers" && (
          <div className="text-center py-12">
            <Icon icon="lucide:users" className="text-5xl text-gray-400 mx-auto" />
            <div className="text-xl font-medium text-gray-300 mt-4">Customer reports coming soon</div>
            <div className="text-sm text-gray-400 max-w-md mx-auto mt-2">
              We're developing detailed customer analytics. Soon you'll be able to track customer acquisition,
              retention rates, and lifetime value metrics.
            </div>
          </div>
        )}
      </div>
    </div>
  );
}