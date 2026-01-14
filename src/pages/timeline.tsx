import React from "react";
import { Header } from "../components/header";
import { TimelineView } from "../components/timeline-view";
import { useProjects } from "../hooks/useConvex";
import { Icon } from "@iconify/react";
import { Button } from "@heroui/react";

export default function Timeline() {
  const { data: projects, isLoading } = useProjects();

  if (isLoading) {
    return (
      <div className="flex-1 overflow-auto">
        <Header title="Timeline View" showTutorial={true} />
        <div className="p-6 flex items-center justify-center h-64">
          <div className="text-center">
            <Icon icon="lucide:loader-2" className="text-4xl text-blue-500 animate-spin mx-auto mb-4" />
            <div className="text-gray-400">Loading projects...</div>
          </div>
        </div>
      </div>
    );
  }

  if (!projects || projects.length === 0) {
    return (
      <div className="flex-1 overflow-auto">
        <Header title="Timeline View" showTutorial={true} />
        <div className="p-6 flex items-center justify-center h-64">
          <div className="text-center">
            <Icon icon="lucide:timeline" className="text-5xl text-gray-600 mx-auto mb-4" />
            <div className="text-xl text-gray-400 mb-2">No Projects Yet</div>
            <div className="text-gray-500 text-sm mb-4">Create projects to see them on the timeline</div>
            <Button color="primary">
              <Icon icon="lucide:plus" className="mr-2" />
              Create First Project
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 overflow-auto">
      <Header title="Timeline View" showTutorial={true} />

      <div className="p-6">
        <TimelineView projects={projects} />
      </div>
    </div>
  );
}