import React from "react";
import { Header } from "../components/header";
import { FileCard } from "../components/file-card";
import {
  Card,
  CardBody,
  Button,
  Input,
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Tabs,
  Tab,
} from "@heroui/react";
import { Icon } from "@iconify/react";
import { useProjects } from "../hooks/useConvex";

export default function Photos() {
  const { data: projects, isLoading } = useProjects();
  const [selected, setSelected] = React.useState("all");
  const [searchText, setSearchText] = React.useState("");
  const [view, setView] = React.useState("grid");
  const [selectedProject, setSelectedProject] = React.useState<string | null>(
    null,
  );

  const filteredFiles = React.useMemo(() => {
    // TODO: Replace with actual files from Convex when available
    let filtered: any[] = [];

    // Filter by type
    if (selected !== "all") {
      filtered = filtered.filter((file) => file.type === selected);
    }

    // Filter by search text
    if (searchText) {
      const lowercaseSearch = searchText.toLowerCase();
      filtered = filtered.filter((file) =>
        file.name.toLowerCase().includes(lowercaseSearch),
      );
    }

    // Filter by project
    if (selectedProject) {
      filtered = filtered.filter((file) => file.projectId === selectedProject);
    }

    return filtered;
  }, [selected, searchText, selectedProject]);

  return (
    <div className="flex-1 overflow-auto">
      <Header title="Photos & Files" />

      <div className="p-6">
        <div className="flex justify-between items-center mb-6">
          <div className="flex-1 max-w-md">
            <Input
              placeholder="Search files..."
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
              <Icon icon="lucide:upload" className="mr-2" />
              Upload Files
            </Button>
          </div>
        </div>

        <Card className="bg-gray-900 border border-gray-800 mb-6">
          <CardBody>
            <Tabs
              aria-label="File types"
              selectedKey={selected}
              onSelectionChange={setSelected as any}
              color="primary"
              variant="underlined"
            >
              <Tab key="all" title="All Files" />
              <Tab key="image" title="Images" />
              <Tab key="document" title="Documents" />
              <Tab key="other" title="Other Files" />
            </Tabs>
          </CardBody>
        </Card>

        {isLoading ? (
          <div className="py-12 text-center">
            <Icon
              icon="lucide:loader-2"
              className="text-4xl text-gray-400 mx-auto animate-spin"
            />
            <div className="mt-2 text-xl font-medium text-gray-300">
              Loading files...
            </div>
          </div>
        ) : (
          <div
            className={
              view === "grid"
                ? "grid grid-cols-1 md:grid-cols-2 gap-4"
                : "space-y-4"
            }
          >
            {filteredFiles.map((file) => (
              <FileCard key={file.id} file={file} />
            ))}

            {filteredFiles.length === 0 && (
              <div className="py-12 text-center col-span-2">
                <Icon
                  icon="lucide:file"
                  className="text-4xl text-gray-400 mx-auto"
                />
                <div className="mt-2 text-xl font-medium text-gray-300">
                  No files found
                </div>
                <div className="mt-1 text-gray-400">
                  Try adjusting your filters or upload new files
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
