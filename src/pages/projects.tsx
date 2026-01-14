import React from "react";
import { Header } from "../components/header";
import { ProjectCard } from "../components/project-card";
import { EmptyStates } from "../components/empty-state";
import { useProjects } from "../hooks/useConvex";

export default function Projects() {
  const { data: projects, isLoading } = useProjects();

  return (
    <div className="flex-1 overflow-auto">
      <Header title="Projects" />

      <div className="p-6">
        {isLoading ? (
          <div className="flex items-center justify-center h-64">
            <div className="text-center">
              <div className="animate-pulse text-gray-400 mb-2">Loading projects...</div>
            </div>
          </div>
        ) : projects.length === 0 ? (
          <EmptyStates.projects />
        ) : (
          <div className="space-y-6">
            {projects.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
