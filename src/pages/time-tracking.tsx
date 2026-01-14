import React from "react";
import { Header } from "../components/header";
import { TimeEntryList } from "../components/time-entry-list";
import {
  Card,

  CardHeader,
  Button,
  Input,
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
} from "@heroui/react";
import { Icon } from "@iconify/react";
import { EmptyStates } from "../components/empty-state";
import { useTimeEntries, useWorkers, useProjects } from "../hooks/useConvex";
import { Worker } from "../types/project";

export default function TimeTracking() {
  const { data: timeEntries, isLoading: entriesLoading } = useTimeEntries();
  const { data: workers, isLoading: workersLoading } = useWorkers();
  const { data: projects, isLoading: projectsLoading } = useProjects();

  const [selectedWorker, setSelectedWorker] = React.useState<Worker | null>(
    null,
  );
  const [selectedProject, setSelectedProject] = React.useState<string | null>(
    null,
  );
  const [dateRange, setDateRange] = React.useState<string>("This Week");

  const filteredTimeEntries = React.useMemo(() => {
    let filtered = [...(timeEntries || [])];

    // Filter by worker
    if (selectedWorker) {
      filtered = filtered.filter(
        (entry) => entry.workerId === selectedWorker.id,
      );
    }

    // Filter by project
    if (selectedProject) {
      filtered = filtered.filter(
        (entry) => entry.projectId === selectedProject,
      );
    }

    return filtered;
  }, [timeEntries, selectedWorker, selectedProject]);

  // Calculate total hours
  const totalHours = filteredTimeEntries.reduce(
    (sum, entry) => sum + (entry.hours || 0),
    0,
  );

  if (entriesLoading || workersLoading || projectsLoading) {
    return (
      <div className="flex-1 overflow-auto">
        <Header title="Time Tracking" />
        <div className="p-6 flex items-center justify-center h-64">
          <div className="text-center">
            <Icon icon="lucide:loader-2" className="text-4xl text-blue-500 animate-spin mx-auto mb-4" />
            <div className="text-gray-400">Loading time entries...</div>
          </div>
        </div>
      </div>
    );
  }

  if (!timeEntries || timeEntries.length === 0) {
    return (
      <div className="flex-1 overflow-auto">
        <Header title="Time Tracking" />
        <div className="p-6">
          <EmptyStates.timeEntries />
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 overflow-auto">
      <Header title="Time Tracking" />

      <div className="p-6">
        <div className="flex justify-between items-center mb-6">
          <div className="text-2xl font-semibold text-white">Time Entries</div>
          <Button color="primary">
            <Icon icon="lucide:plus" className="mr-2" />
            New Time Entry
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          <Card className="bg-gray-900 border border-gray-800">
            <Card.Content>
              <div className="text-gray-400 text-sm">Total Hours</div>
              <div className="text-3xl font-semibold text-white mt-1">
                {totalHours.toFixed(1)}
              </div>
            </Card.Content>
          </Card>

          <Card className="bg-gray-900 border border-gray-800">
            <Card.Content>
              <div className="text-gray-400 text-sm">Workers Tracked</div>
              <div className="text-3xl font-semibold text-white mt-1">
                {new Set((timeEntries || []).map((e) => e.workerId)).size}
              </div>
            </Card.Content>
          </Card>

          <Card className="bg-gray-900 border border-gray-800">
            <Card.Content>
              <div className="text-gray-400 text-sm">Active Projects</div>
              <div className="text-3xl font-semibold text-white mt-1">
                {projects?.length || 0}
              </div>
            </Card.Content>
          </Card>
        </div>

        <Card className="bg-gray-900 border border-gray-800 mb-6">
          <CardHeader className="flex justify-between">
            <div className="text-lg font-semibold text-white">
              Filter Time Entries
            </div>
          </CardHeader>
          <Card.Content>
            <div className="flex flex-wrap gap-4">
              <div className="flex-1 min-w-[200px]">
                <Dropdown>
                  <DropdownTrigger>
                    <Button variant="flat" className="w-full justify-between">
                      {selectedWorker ? selectedWorker.name : "All Workers"}
                      <Icon icon="lucide:chevron-down" />
                    </Button>
                  </DropdownTrigger>
                  <DropdownMenu aria-label="Worker selection">
                    <DropdownItem
                      key="all"
                      onPress={() => setSelectedWorker(null)}
                    >
                      All Workers
                    </DropdownItem>
                    <React.Fragment>
                      {(workers || []).map((worker) => (
                        <DropdownItem
                          key={worker.id}
                          onPress={() => setSelectedWorker(worker)}
                        >
                          {worker.name}
                        </DropdownItem>
                      ))}
                    </React.Fragment>
                  </DropdownMenu>
                </Dropdown>
              </div>

              <div className="flex-1 min-w-[200px]">
                <Dropdown>
                  <DropdownTrigger>
                    <Button variant="flat" className="w-full justify-between">
                      {selectedProject
                        ? (projects || []).find((p) => p.id === selectedProject)
                            ?.title || "Unknown Project"
                        : "All Projects"}
                      <Icon icon="lucide:chevron-down" />
                    </Button>
                  </DropdownTrigger>
                  <DropdownMenu aria-label="Project selection">
                    <DropdownItem
                      key="all"
                      onPress={() => setSelectedProject(null)}
                    >
                      All Projects
                    </DropdownItem>
                    <React.Fragment>
                      {(projects || []).map((project) => (
                        <DropdownItem
                          key={project.id}
                          onPress={() => setSelectedProject(project.id)}
                        >
                          {project.title}
                        </DropdownItem>
                      ))}
                    </React.Fragment>
                  </DropdownMenu>
                </Dropdown>
              </div>

              <div className="flex-1 min-w-[200px]">
                <Dropdown>
                  <DropdownTrigger>
                    <Button variant="flat" className="w-full justify-between">
                      {dateRange}
                      <Icon icon="lucide:chevron-down" />
                    </Button>
                  </DropdownTrigger>
                  <DropdownMenu aria-label="Date range selection">
                    <DropdownItem
                      key="today"
                      onPress={() => setDateRange("Today")}
                    >
                      Today
                    </DropdownItem>
                    <DropdownItem
                      key="yesterday"
                      onPress={() => setDateRange("Yesterday")}
                    >
                      Yesterday
                    </DropdownItem>
                    <DropdownItem
                      key="this-week"
                      onPress={() => setDateRange("This Week")}
                    >
                      This Week
                    </DropdownItem>
                    <DropdownItem
                      key="last-week"
                      onPress={() => setDateRange("Last Week")}
                    >
                      Last Week
                    </DropdownItem>
                    <DropdownItem
                      key="this-month"
                      onPress={() => setDateRange("This Month")}
                    >
                      This Month
                    </DropdownItem>
                  </DropdownMenu>
                </Dropdown>
              </div>
            </div>
          </Card.Content>
        </Card>

        <Card className="bg-gray-900 border border-gray-800">
          <Card.Content>
            <TimeEntryList timeEntries={filteredTimeEntries} />
          </Card.Content>
        </Card>
      </div>
    </div>
  );
}
