import React from "react";
import { Header } from "../components/header";
import { ProjectCard } from "../components/project-card";
import { useProjects } from "../hooks/useConvex";

export default function Projects() {
  const projects = useProjects();

  if (!projects) {
    return <div className="p-6"><p className="text-muted-foreground">Loading projects...</p></div>;
  }

  if (projects.length === 0) {
    return <div className="p-6"><p className="text-muted-foreground">No projects found. Create your first project to get started.</p></div>;
  }

  return (
    <div className="flex-1 overflow-auto">
      <Header title="Projects" />

      <div className="p-6">
        <div className="space-y-6">
          {projects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      </div>
    </div>
  );
}