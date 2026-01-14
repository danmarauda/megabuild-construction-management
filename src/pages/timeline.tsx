import React from "react";
import { Header } from "../components/header";
import { TimelineView } from "../components/timeline-view";
import { EmptyStates } from "../components/empty-state";
import { useProjects } from "../hooks/useConvex";
import { Icon } from "@iconify/react";

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
        <div className="p-6">
          <EmptyStates.timeline />
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
