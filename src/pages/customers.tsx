import React from "react";
import { Header } from "../components/header";
import { CustomerCard } from "../components/customer-card";
import { Card, CardBody, Button, Input, Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Tabs, Tab } from "@heroui/react";
import { Icon } from "@iconify/react";
import { useCustomers } from "../hooks/useConvex";

export default function Customers() {
  const { data: customers, isLoading } = useCustomers();
  const [selected, setSelected] = React.useState("all");
  const [searchText, setSearchText] = React.useState("");
  const [view, setView] = React.useState("grid");

  if (isLoading) {
    return (
      <div className="flex-1 overflow-auto">
        <Header title="Customers" />
        <div className="p-6">
          <p className="text-muted-foreground">Loading customers...</p>
        </div>
      </div>
    );
  }

  if (!customers || customers.length === 0) {
    return (
      <div className="flex-1 overflow-auto">
        <Header title="Customers" />
        <div className="p-6">
          <p className="text-muted-foreground">No customers found. Add your first customer to get started.</p>
        </div>
      </div>
    );
  }

  const filteredCustomers = React.useMemo(() => {
    let filtered = [...customers];
    
    // Filter by status
    if (selected !== "all") {
      filtered = filtered.filter(customer => customer.status === selected);
    }
    
    // Filter by search text
    if (searchText) {
      const lowercaseSearch = searchText.toLowerCase();
      filtered = filtered.filter(
        customer => 
          customer.name.toLowerCase().includes(lowercaseSearch) || 
          customer.email.toLowerCase().includes(lowercaseSearch) ||
          customer.phone.toLowerCase().includes(lowercaseSearch)
      );
    }
    
    return filtered;
  }, [selected, searchText]);

  return (
    <div className="flex-1 overflow-auto">
      <Header title="Customers" />
      
      <div className="p-6">
        <div className="flex justify-between items-center mb-6">
          <div className="flex-1 max-w-md">
            <Input
              placeholder="Search customers..."
              value={searchText}
              onValueChange={setSearchText}
              startContent={<Icon icon="lucide:search" />}
              className="bg-gray-900"
            />
          </div>
          
          <div className="flex gap-2">
            <div className="flex border border-gray-700 rounded overflow-hidden">
              <Button 
                variant="flat" 
                isIconOnly 
                className={view === "grid" ? "bg-gray-700" : ""}
                onPress={() => setView("grid")}
              >
                <Icon icon="lucide:grid" />
              </Button>
              <Button 
                variant="flat" 
                isIconOnly
                className={view === "list" ? "bg-gray-700" : ""}
                onPress={() => setView("list")}
              >
                <Icon icon="lucide:list" />
              </Button>
            </div>
            
            <Button color="primary">
              <Icon icon="lucide:plus" className="mr-2" />
              Add Customer
            </Button>
          </div>
        </div>
        
        <Card className="bg-gray-900 border border-gray-800 mb-6">
          <CardBody>
            <Tabs 
              aria-label="Customer status" 
              selectedKey={selected} 
              onSelectionChange={setSelected as any}
              color="primary"
              variant="underlined"
            >
              <Tab key="all" title="All Customers" />
              <Tab key="active" title="Active" />
              <Tab key="inactive" title="Inactive" />
            </Tabs>
          </CardBody>
        </Card>
        
        <div className={view === "grid" ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" : "space-y-4"}>
          {filteredCustomers.map(customer => (
            <CustomerCard key={customer.id} customer={customer} />
          ))}
          
          {filteredCustomers.length === 0 && (
            <div className="col-span-3 py-12 text-center">
              <Icon icon="lucide:users" className="text-4xl text-gray-400 mx-auto" />
              <div className="mt-2 text-xl font-medium text-gray-300">No customers found</div>
              <div className="mt-1 text-gray-400">Try adjusting your filters or add a new customer</div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}