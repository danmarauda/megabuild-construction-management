import React from "react";
import { Header } from "../components/header";
import { InvoiceCard } from "../components/invoice-card";
import { Card, CardBody, Button, Input, Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Tabs, Tab } from "@heroui/react";
import { Icon } from "@iconify/react";
import { useInvoices } from "../hooks/useConvex";

export default function Invoices() {
  const invoices = useInvoices();
  const [selected, setSelected] = React.useState("all");
  const [searchText, setSearchText] = React.useState("");
  const [sortBy, setSortBy] = React.useState("newest");

  if (!invoices) {
    return <div className="p-6"><p className="text-muted-foreground">Loading invoices...</p></div>;
  }
  if (invoices.length === 0) {
    return <div className="p-6"><p className="text-muted-foreground">No invoices found. Create your first invoice to get started.</p></div>;
  }

  const filteredInvoices = React.useMemo(() => {
    let filtered = [...invoices];
    
    // Filter by status
    if (selected !== "all") {
      filtered = filtered.filter(inv => inv.status === selected);
    }
    
    // Filter by search text
    if (searchText) {
      const lowercaseSearch = searchText.toLowerCase();
      filtered = filtered.filter(
        inv => inv.id.toLowerCase().includes(lowercaseSearch)
      );
    }
    
    // Sort
    if (sortBy === "newest") {
      filtered.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
    } else if (sortBy === "oldest") {
      filtered.sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime());
    } else if (sortBy === "amount-high") {
      filtered.sort((a, b) => b.amount - a.amount);
    } else if (sortBy === "amount-low") {
      filtered.sort((a, b) => a.amount - b.amount);
    }
    
    return filtered;
  }, [selected, searchText, sortBy]);

  const calculateTotals = () => {
    let totalAmount = 0;
    let totalPaid = 0;
    let totalPending = 0;
    
    invoices.forEach(inv => {
      totalAmount += inv.amount;
      if (inv.status === 'paid') totalPaid += inv.amount;
      if (inv.status === 'pending') totalPending += inv.amount;
    });
    
    return { totalAmount, totalPaid, totalPending };
  };
  
  const { totalAmount, totalPaid, totalPending } = calculateTotals();
  const statuses = ["all", "draft", "sent", "viewed", "pending", "paid", "overdue"];

  return (
    <div className="flex-1 overflow-auto">
      <Header title="Invoices" />
      
      <div className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          <Card className="bg-gray-900 border border-gray-800">
            <CardBody>
              <div className="text-gray-400 text-sm">Total Amount</div>
              <div className="text-3xl font-semibold text-white mt-1">${totalAmount.toLocaleString()}</div>
            </CardBody>
          </Card>
          
          <Card className="bg-gray-900 border border-gray-800">
            <CardBody>
              <div className="text-gray-400 text-sm">Paid</div>
              <div className="text-3xl font-semibold text-green-500 mt-1">${totalPaid.toLocaleString()}</div>
            </CardBody>
          </Card>
          
          <Card className="bg-gray-900 border border-gray-800">
            <CardBody>
              <div className="text-gray-400 text-sm">Pending</div>
              <div className="text-3xl font-semibold text-yellow-500 mt-1">${totalPending.toLocaleString()}</div>
            </CardBody>
          </Card>
        </div>
        
        <div className="flex justify-between items-center mb-6">
          <div className="flex-1 max-w-md">
            <Input
              placeholder="Search invoices..."
              value={searchText}
              onValueChange={setSearchText}
              startContent={<Icon icon="lucide:search" />}
              className="bg-gray-900"
            />
          </div>
          
          <div className="flex gap-2">
            <Dropdown>
              <DropdownTrigger>
                <Button variant="flat">
                  <Icon icon="lucide:arrow-up-down" className="mr-2" />
                  Sort: {sortBy === "newest" ? "Newest First" : sortBy === "oldest" ? "Oldest First" : sortBy === "amount-high" ? "Highest Amount" : "Lowest Amount"}
                </Button>
              </DropdownTrigger>
              <DropdownMenu aria-label="Sort options">
                <DropdownItem key="newest" onPress={() => setSortBy("newest")}>Newest First</DropdownItem>
                <DropdownItem key="oldest" onPress={() => setSortBy("oldest")}>Oldest First</DropdownItem>
                <DropdownItem key="amount-high" onPress={() => setSortBy("amount-high")}>Highest Amount</DropdownItem>
                <DropdownItem key="amount-low" onPress={() => setSortBy("amount-low")}>Lowest Amount</DropdownItem>
              </DropdownMenu>
            </Dropdown>
            
            <Button color="primary">
              <Icon icon="lucide:plus" className="mr-2" />
              New Invoice
            </Button>
          </div>
        </div>
        
        <Card className="bg-gray-900 border border-gray-800 mb-6">
          <CardBody>
            <Tabs 
              aria-label="Invoice status" 
              selectedKey={selected} 
              onSelectionChange={setSelected as any}
              color="primary"
              variant="underlined"
            >
              {statuses.map(status => (
                <Tab 
                  key={status} 
                  title={status === "all" ? "All Invoices" : status.charAt(0).toUpperCase() + status.slice(1)} 
                />
              ))}
            </Tabs>
          </CardBody>
        </Card>
        
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {filteredInvoices.map(invoice => (
            <InvoiceCard key={invoice.id} invoice={invoice} />
          ))}
          
          {filteredInvoices.length === 0 && (
            <div className="col-span-3 py-12 text-center">
              <Icon icon="lucide:database" className="text-4xl text-gray-400 mx-auto" />
              <div className="mt-2 text-xl font-medium text-gray-300">No invoices found</div>
              <div className="mt-1 text-gray-400">Try adjusting your filters or create a new invoice</div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}