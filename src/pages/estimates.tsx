import React from "react";
import { Header } from "../components/header";
import { EstimateCard } from "../components/estimate-card";
import { Card, CardBody, Button, Input, Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Tabs, Tab } from "@heroui/react";
import { Icon } from "@iconify/react";
import { useEstimates } from "../hooks/useConvex";

export default function Estimates() {
  const estimates = useEstimates();

  if (!estimates) {
    return <div className="p-6"><p className="text-muted-foreground">Loading estimates...</p></div>;
  }
  if (estimates.length === 0) {
    return <div className="p-6"><p className="text-muted-foreground">No estimates found. Create your first estimate to get started.</p></div>;
  }

  const [selected, setSelected] = React.useState("all");
  const [searchText, setSearchText] = React.useState("");
  const [sortBy, setSortBy] = React.useState("newest");

  const filteredEstimates = React.useMemo(() => {
    let filtered = [...estimates];
    
    // Filter by status
    if (selected !== "all") {
      filtered = filtered.filter(est => est.status === selected);
    }
    
    // Filter by search text
    if (searchText) {
      const lowercaseSearch = searchText.toLowerCase();
      filtered = filtered.filter(
        est => est.id.toLowerCase().includes(lowercaseSearch)
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
    let totalPending = 0;
    let totalApproved = 0;
    
    estimates.forEach(est => {
      totalAmount += est.amount;
      if (est.status === 'sent' || est.status === 'viewed') totalPending += est.amount;
      if (est.status === 'approved') totalApproved += est.amount;
    });
    
    return { totalAmount, totalPending, totalApproved };
  };
  
  const { totalAmount, totalPending, totalApproved } = calculateTotals();
  const statuses = ["all", "draft", "sent", "viewed", "approved", "rejected"];

  return (
    <div className="flex-1 overflow-auto">
      <Header title="Estimates" />
      
      <div className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          <Card className="bg-gray-900 border border-gray-800">
            <CardBody>
              <div className="text-gray-400 text-sm">Total Estimated</div>
              <div className="text-3xl font-semibold text-white mt-1">${totalAmount.toLocaleString()}</div>
            </CardBody>
          </Card>
          
          <Card className="bg-gray-900 border border-gray-800">
            <CardBody>
              <div className="text-gray-400 text-sm">Pending</div>
              <div className="text-3xl font-semibold text-white mt-1">${totalPending.toLocaleString()}</div>
            </CardBody>
          </Card>
          
          <Card className="bg-gray-900 border border-gray-800">
            <CardBody>
              <div className="text-gray-400 text-sm">Approved</div>
              <div className="text-3xl font-semibold text-white mt-1">${totalApproved.toLocaleString()}</div>
            </CardBody>
          </Card>
        </div>
        
        <div className="flex justify-between items-center mb-6">
          <div className="flex-1 max-w-md">
            <Input
              placeholder="Search estimates..."
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
              New Estimate
            </Button>
          </div>
        </div>
        
        <Card className="bg-gray-900 border border-gray-800 mb-6">
          <CardBody>
            <Tabs 
              aria-label="Estimate status" 
              selectedKey={selected} 
              onSelectionChange={setSelected as any}
              color="primary"
              variant="underlined"
            >
              {statuses.map(status => (
                <Tab 
                  key={status} 
                  title={status === "all" ? "All Estimates" : status.charAt(0).toUpperCase() + status.slice(1)} 
                />
              ))}
            </Tabs>
          </CardBody>
        </Card>
        
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {filteredEstimates.map(estimate => (
            <EstimateCard key={estimate.id} estimate={estimate} />
          ))}
          
          {filteredEstimates.length === 0 && (
            <div className="col-span-3 py-12 text-center">
              <Icon icon="lucide:database" className="text-4xl text-gray-400 mx-auto" />
              <div className="mt-2 text-xl font-medium text-gray-300">No estimates found</div>
              <div className="mt-1 text-gray-400">Try adjusting your filters or create a new estimate</div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}