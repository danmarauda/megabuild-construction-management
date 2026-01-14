import React from "react";
import { Header } from "../components/header";
import { LeadCard } from "../components/lead-card";
import { Card, CardBody, CardHeader, Button, Input, Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Tabs, Tab } from "@heroui/react";
import { Icon } from "@iconify/react";
import { useLeads } from "../hooks/useConvex";

export default function Leads() {
  const leads = useLeads();
  const [selected, setSelected] = React.useState("all");
  const [searchText, setSearchText] = React.useState("");
  const [sortBy, setSortBy] = React.useState("newest");

  if (!leads) {
    return <div className="p-6"><p className="text-muted-foreground">Loading leads...</p></div>;
  }
  if (leads.length === 0) {
    return <div className="p-6"><p className="text-muted-foreground">No leads found. Add your first lead to get started.</p></div>;
  }

  const filteredLeads = React.useMemo(() => {
    let filtered = [...leads];

    // Filter by status
    if (selected !== "all") {
      filtered = filtered.filter(lead => lead.status === selected);
    }

    // Filter by search text
    if (searchText) {
      const lowercaseSearch = searchText.toLowerCase();
      filtered = filtered.filter(
        lead =>
          lead.name.toLowerCase().includes(lowercaseSearch) ||
          lead.email.toLowerCase().includes(lowercaseSearch) ||
          lead.phone.toLowerCase().includes(lowercaseSearch)
      );
    }

    // Sort
    if (sortBy === "newest") {
      filtered.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
    } else if (sortBy === "oldest") {
      filtered.sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime());
    } else if (sortBy === "value-high") {
      filtered.sort((a, b) => b.estimatedValue - a.estimatedValue);
    } else if (sortBy === "value-low") {
      filtered.sort((a, b) => a.estimatedValue - b.estimatedValue);
    }

    return filtered;
  }, [leads, selected, searchText, sortBy]);

  const statuses = ["all", "new", "contacted", "qualified", "proposal", "converted", "lost"];

  return (
    <div className="flex-1 overflow-auto">
      <Header title="Lead Pipeline" />
      
      <div className="p-6">
        <div className="flex justify-between items-center mb-6">
          <div className="flex-1 max-w-md">
            <Input
              placeholder="Search leads..."
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
                  Sort: {sortBy === "newest" ? "Newest First" : sortBy === "oldest" ? "Oldest First" : sortBy === "value-high" ? "Highest Value" : "Lowest Value"}
                </Button>
              </DropdownTrigger>
              <DropdownMenu aria-label="Sort options">
                <DropdownItem key="newest" onPress={() => setSortBy("newest")}>Newest First</DropdownItem>
                <DropdownItem key="oldest" onPress={() => setSortBy("oldest")}>Oldest First</DropdownItem>
                <DropdownItem key="value-high" onPress={() => setSortBy("value-high")}>Highest Value</DropdownItem>
                <DropdownItem key="value-low" onPress={() => setSortBy("value-low")}>Lowest Value</DropdownItem>
              </DropdownMenu>
            </Dropdown>
            
            <Button color="primary">
              <Icon icon="lucide:plus" className="mr-2" />
              Add Lead
            </Button>
          </div>
        </div>
        
        <Card className="bg-gray-900 border border-gray-800 mb-6">
          <CardBody>
            <Tabs 
              aria-label="Lead status" 
              selectedKey={selected} 
              onSelectionChange={setSelected as any}
              color="primary"
              variant="underlined"
            >
              {statuses.map(status => (
                <Tab 
                  key={status} 
                  title={status === "all" ? "All Leads" : status.charAt(0).toUpperCase() + status.slice(1)} 
                />
              ))}
            </Tabs>
          </CardBody>
        </Card>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredLeads.map(lead => (
            <LeadCard key={lead.id} lead={lead} />
          ))}
          
          {filteredLeads.length === 0 && (
            <div className="col-span-3 py-12 text-center">
              <Icon icon="lucide:database" className="text-4xl text-gray-400 mx-auto" />
              <div className="mt-2 text-xl font-medium text-gray-300">No leads found</div>
              <div className="mt-1 text-gray-400">Try adjusting your filters or create a new lead</div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}