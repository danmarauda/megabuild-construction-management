import React from "react";
import { Header } from "../components/header";
import { EstimateCard } from "../components/estimate-card";
import { Card, Button, Input, Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Tabs, Tab } from "@heroui/react";
import { Icon } from "@iconify/react";
import { EmptyStates } from "../components/empty-state";
import { useEstimates } from "../hooks/useConvex";

export default function Estimates() {
  const { data: estimates, isLoading } = useEstimates();
  const [selected, setSelected] = React.useState("all");
  const [searchText, setSearchText] = React.useState("");
  const [sortBy, setSortBy] = React.useState("newest");

  if (isLoading) {
    return (
      <div className="flex-1 overflow-auto">
        <Header title="Estimates" />
        <div className="p-6 flex items-center justify-center h-64">
          <div className="animate-pulse text-gray-400">Loading estimates...</div>
        </div>
      </div>
    );
  }

  if (estimates.length === 0) {
    return (
      <div className="flex-1 overflow-auto">
        <Header title="Estimates" />
        <div className="p-6">
          <EmptyStates.estimates />
        </div>
      </div>
    );
  }

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
  }, [estimates, selected, searchText, sortBy]);

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
            <Card.Content>
              <div className="text-gray-400 text-sm">Total Estimated</div>
              <div className="text-3xl font-semibold text-white mt-1">${totalAmount.toLocaleString()}</div>
            </Card.Content>
          </Card>

          <Card className="bg-gray-900 border border-gray-800">
            <Card.Content>
              <div className="text-gray-400 text-sm">Pending</div>
              <div className="text-3xl font-semibold text-white mt-1">${totalPending.toLocaleString()}</div>
            </Card.Content>
          </Card>

          <Card className="bg-gray-900 border border-gray-800">
            <Card.Content>
              <div className="text-gray-400 text-sm">Approved</div>
              <div className="text-3xl font-semibold text-green-500 mt-1">${totalApproved.toLocaleString()}</div>
            </Card.Content>
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
                  <Icon icon="lucide:arrow-up-down" slot="start" />
                  Sort: {sortBy === "newest" ? "Newest First" : sortBy === "oldest" ? "Oldest First" : sortBy === "amount-high" ? "Highest Amount" : "Lowest Amount"}
                </Button>
              </DropdownTrigger>
              <DropdownMenu
                aria-label="Sort options"
                onAction={(key) => setSortBy(key as "newest" | "oldest" | "amount-high" | "amount-low")}
              >
                <DropdownItem key="newest">Newest First</DropdownItem>
                <DropdownItem key="oldest">Oldest First</DropdownItem>
                <DropdownItem key="amount-high">Highest Amount</DropdownItem>
                <DropdownItem key="amount-low">Lowest Amount</DropdownItem>
              </DropdownMenu>
            </Dropdown>

            <Button color="primary">
              <Icon icon="lucide:plus" slot="start" />
              New Estimate
            </Button>
          </div>
        </div>

        <Card className="bg-gray-900 border border-gray-800 mb-6">
          <Card.Content>
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
          </Card.Content>
        </Card>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {filteredEstimates.map(estimate => (
            <EstimateCard key={estimate.id} estimate={estimate} />
          ))}

          {filteredEstimates.length === 0 && (
            <div className="col-span-3">
              <EmptyStates.filtered />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
