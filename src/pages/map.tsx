import React from "react";
import { Header } from "../components/header";
import {
  Card,

  Button,
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Chip,
} from "@heroui/react";
import { Icon } from "@iconify/react";
import { EmptyStates } from "../components/empty-state";
import { useProjects } from "../hooks/useConvex";

export default function Map() {
  const { data: projects, isLoading } = useProjects();
  const [selectedProject, setSelectedProject] = React.useState<string | null>(
    null,
  );
  const [selectedProjectData, setSelectedProjectData] =
    React.useState<any>(null);

  React.useEffect(() => {
    if (selectedProject && projects && projects.length > 0) {
      const project = projects.find((p) => p.id === selectedProject);
      if (project) {
        setSelectedProjectData(project);
      }
    } else {
      setSelectedProjectData(null);
    }
  }, [selectedProject, projects]);

  if (isLoading) {
    return (
      <div className="flex-1 overflow-auto">
        <Header title="Project Map" />
        <div className="p-6 flex items-center justify-center h-64">
          <div className="text-center">
            <Icon
              icon="lucide:loader-2"
              className="text-4xl text-gray-400 mx-auto animate-spin"
            />
            <div className="mt-2 text-xl font-medium text-gray-300">
              Loading map...
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!projects || projects.length === 0) {
    return (
      <div className="flex-1 overflow-auto">
        <Header title="Project Map" />
        <div className="p-6">
          <EmptyStates.map />
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 overflow-auto">
      <Header title="Project Map" />

      <div className="p-6">
        <div className="flex justify-between items-center mb-6">
          <div className="text-xl font-semibold text-white">
            Project Locations
          </div>

          <div className="flex gap-2">
            <Dropdown>
              <DropdownTrigger>
                <Button variant="flat">
                  <Icon icon="lucide:filter" className="mr-2" />
                  {selectedProject
                    ? `Project: ${projects?.find((p) => p.id === selectedProject)?.title || "Selected"}`
                    : "All Projects"}
                </Button>
              </DropdownTrigger>
              <DropdownMenu aria-label="Project filter">
                <DropdownItem
                  key="all"
                  onPress={() => setSelectedProject(null)}
                >
                  All Projects
                </DropdownItem>
                <React.Fragment>
                  {projects?.map((project) => (
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
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          <div className="lg:col-span-3">
            <Card className="bg-gray-900 border border-gray-800">
              <Card.Content className="p-0">
                <div className="h-[600px] relative">
                  {/* Map Placeholder - In a real application this would be a proper map component */}
                  <div className="absolute inset-0 bg-gray-800 opacity-50">
                    <img
                      src="https://img.heroui.chat/image/places?w=1200&h=600&u=map1"
                      alt="Map"
                      className="w-full h-full object-cover"
                    />
                  </div>

                  {/* Project Markers */}
                  {projects?.map((project, index) => (
                    <div
                      key={project.id}
                      className={`absolute w-8 h-8 rounded-full bg-primary flex items-center justify-center cursor-pointer transform -translate-x-1/2 -translate-y-1/2 ${
                        selectedProject === project.id
                          ? "ring-2 ring-white"
                          : ""
                      }`}
                      style={{
                        left: `${30 + index * 15}%`,
                        top: `${40 + index * 10}%`,
                      }}
                      onClick={() => setSelectedProject(project.id)}
                    >
                      <Icon icon="lucide:map-pin" className="text-white" />
                    </div>
                  ))}

                  <div className="absolute bottom-4 left-4 right-4 flex justify-between">
                    <Button
                      variant="flat"
                      className="bg-gray-900/80 backdrop-blur-sm"
                    >
                      <Icon icon="lucide:layers" className="mr-2" />
                      Layers
                    </Button>
                    <div className="flex gap-2">
                      <Button
                        variant="flat"
                        isIconOnly
                        className="bg-gray-900/80 backdrop-blur-sm"
                      >
                        <Icon icon="lucide:minus" />
                      </Button>
                      <Button
                        variant="flat"
                        isIconOnly
                        className="bg-gray-900/80 backdrop-blur-sm"
                      >
                        <Icon icon="lucide:plus" />
                      </Button>
                    </div>
                  </div>
                </div>
              </Card.Content>
            </Card>
          </div>

          <div>
            <Card className="bg-gray-900 border border-gray-800">
              <Card.Content>
                {selectedProjectData ? (
                  <>
                    <h3 className="text-lg font-semibold text-white mb-2">
                      {selectedProjectData.title}
                    </h3>
                    <div className="mb-4">
                      <Chip
                        color={
                          selectedProjectData.status === "active"
                            ? "success"
                            : "warning"
                        }
                        size="sm"
                        variant="flat"
                      >
                        {selectedProjectData.status}
                      </Chip>
                    </div>

                    <div className="space-y-4">
                      <div>
                        <div className="text-xs text-gray-400">Customer</div>
                        <div className="text-gray-300">
                          {selectedProjectData.customer.name}
                        </div>
                      </div>

                      <div>
                        <div className="text-xs text-gray-400">Address</div>
                        <div className="text-gray-300">
                          {selectedProjectData.customer.address || "No address provided"}
                        </div>
                      </div>

                      <div>
                        <div className="text-xs text-gray-400">
                          Project Dates
                        </div>
                        <div className="text-gray-300">
                          {selectedProjectData.startDate} to{" "}
                          {selectedProjectData.endDate}
                        </div>
                      </div>

                      <div>
                        <div className="text-xs text-gray-400">Completion</div>
                        <div className="text-gray-300">
                          {selectedProjectData.completionPercentage}%
                        </div>
                        <div className="w-full bg-gray-700 h-2 rounded-full mt-1 overflow-hidden">
                          <div
                            className="bg-primary h-full rounded-full"
                            style={{
                              width: `${selectedProjectData.completionPercentage}%`,
                            }}
                          ></div>
                        </div>
                      </div>

                      <div className="flex justify-end">
                        <Button color="primary">
                          <Icon icon="lucide:clipboard" className="mr-2" />
                          View Project
                        </Button>
                      </div>
                    </div>
                  </>
                ) : (
                  <div className="text-center py-8">
                    <Icon
                      icon="lucide:map-pin"
                      className="text-4xl text-gray-400 mx-auto"
                    />
                    <div className="mt-2 font-medium text-gray-300">
                      Select a project on the map
                    </div>
                    <div className="mt-1 text-xs text-gray-400">
                      Click on a marker to view project details
                    </div>
                  </div>
                )}
              </Card.Content>
            </Card>

            <Card className="bg-gray-900 border border-gray-800 mt-4">
              <Card.Content>
                <h3 className="text-base font-medium text-white mb-4">
                  Project List
                </h3>

                <div className="space-y-2">
                  {projects?.map((project) => (
                    <div
                      key={project.id}
                      className={`p-2 rounded cursor-pointer ${
                        selectedProject === project.id
                          ? "bg-primary-900/30"
                          : "hover:bg-gray-800"
                      }`}
                      onClick={() => setSelectedProject(project.id)}
                    >
                      <div className="font-medium text-white">
                        {project.title}
                      </div>
                      <div className="text-xs text-gray-400">
                        {project.customer.name}
                      </div>
                    </div>
                  ))}
                </div>
              </Card.Content>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
