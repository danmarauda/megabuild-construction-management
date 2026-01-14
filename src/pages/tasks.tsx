import React from "react";
import { Header } from "../components/header";
import { TaskList } from "../components/task-list";
import { Tabs, Tab, Card, Input, Button, Dropdown, DropdownTrigger, DropdownMenu, DropdownItem } from "@heroui/react";
import { Icon } from "@iconify/react";
import { EmptyStates } from "../components/empty-state";
import { useTasks } from "../hooks/useConvex";

export default function Tasks() {
  const { data: tasks, isLoading } = useTasks();
  const [selected, setSelected] = React.useState("all");
  const [searchText, setSearchText] = React.useState("");

  if (isLoading) {
    return (
      <div className="flex-1 overflow-auto">
        <Header title="Task List" />
        <div className="p-6 flex items-center justify-center h-64">
          <div className="animate-pulse text-gray-400">Loading tasks...</div>
        </div>
      </div>
    );
  }

  if (tasks.length === 0) {
    return (
      <div className="flex-1 overflow-auto">
        <Header title="Task List" />
        <div className="p-6">
          <EmptyStates.tasks />
        </div>
      </div>
    );
  }

  const filteredTasks = React.useMemo(() => {
    let filtered = [...tasks];

    // Filter by status
    if (selected !== "all") {
      filtered = filtered.filter(task => task.status === selected);
    }

    // Filter by search text
    if (searchText) {
      const lowercaseSearch = searchText.toLowerCase();
      filtered = filtered.filter(
        task =>
          task.title.toLowerCase().includes(lowercaseSearch) ||
          task.assignee.name.toLowerCase().includes(lowercaseSearch)
      );
    }

    return filtered;
  }, [tasks, selected, searchText]);

  return (
    <div className="flex-1 overflow-auto">
      <Header title="Task List" />

      <div className="p-6">
        <div className="flex justify-between items-center mb-6">
          <div className="flex-1 max-w-md">
            <Input
              placeholder="Search tasks..."
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
                  <Icon icon="lucide:filter" className="mr-2" />
                  Filter
                </Button>
              </DropdownTrigger>
              <DropdownMenu aria-label="Filter options">
                <DropdownItem key="all">All Tasks</DropdownItem>
                <DropdownItem key="priority">By Priority</DropdownItem>
                <DropdownItem key="assignee">By Assignee</DropdownItem>
                <DropdownItem key="project">By Project</DropdownItem>
              </DropdownMenu>
            </Dropdown>

            <Button color="primary">
              <Icon icon="lucide:plus" className="mr-2" />
              Add Task
            </Button>
          </div>
        </div>

        <Card className="bg-gray-900 border border-gray-800">
          <Card.Content>
            <Tabs
              aria-label="Task status"
              selectedKey={selected}
              onSelectionChange={setSelected as any}
              color="primary"
              variant="underlined"
              className="mb-4"
            >
              <Tab key="all" title="All Tasks" />
              <Tab key="pending" title="Pending" />
              <Tab key="in-progress" title="In Progress" />
              <Tab key="completed" title="Completed" />
              <Tab key="overdue" title="Overdue" />
            </Tabs>

            <TaskList tasks={filteredTasks} />
          </Card.Content>
        </Card>
      </div>
    </div>
  );
}
