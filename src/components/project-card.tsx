import React from "react";
import { Card, CardBody, Button, Avatar, Progress } from "@heroui/react";
import { Icon } from "@iconify/react";
import { Project } from "../types/project";
import { format } from "date-fns";

interface ProjectCardProps {
  project: Project;
}

export function ProjectCard({ project }: ProjectCardProps) {
  const { title, customer, completionPercentage, tasks, team } = project;
  
  const completedTasks = tasks.filter(task => task.status === 'completed').length;
  const totalTasks = tasks.length;
  
  return (
    <Card className="mb-6 bg-gray-900 border border-gray-800">
      <CardBody className="p-0">
        <div className="flex items-center justify-between p-4 border-b border-gray-800">
          <div>
            <h3 className="text-lg font-medium text-white">{title}</h3>
            <div className="flex items-center gap-2 mt-1">
              <Button variant="flat" size="sm">
                General
              </Button>
              <Icon icon="lucide:chevron-down" className="text-gray-400" />
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button isIconOnly variant="flat" size="sm">
              <Icon icon="lucide:image" />
            </Button>
            <Button isIconOnly variant="flat" size="sm">
              <Icon icon="lucide:file-text" />
            </Button>
            <Button isIconOnly variant="flat" size="sm">
              <Icon icon="lucide:layout-grid" />
            </Button>
            <Button isIconOnly variant="flat" size="sm">
              <Icon icon="lucide:more-horizontal" />
            </Button>
            <Button isIconOnly variant="flat" size="sm">
              <Icon icon="lucide:maximize-2" />
            </Button>
          </div>
        </div>
        
        <div className="p-4">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <Icon icon="lucide:clock" className="text-warning" />
              <span className="text-sm font-medium text-gray-300">{completedTasks}/{totalTasks} Completed tasks</span>
            </div>
            <div className="text-sm text-gray-400">
              Complete by {format(new Date(project.endDate), "MMM dd, yyyy")}
            </div>
          </div>
          
          <Progress 
            value={completionPercentage} 
            color="warning"
            className="mb-4"
          />
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
            {tasks.slice(0, 3).map((task) => (
              <div key={task.id} className="border border-gray-800 rounded-lg p-4 bg-gray-800/50">
                <div className="flex items-start gap-2">
                  <div className="mt-1">
                    {task.status === 'pending' ? (
                      <Icon icon="lucide:alert-circle" className="text-warning" />
                    ) : (
                      <Icon icon="lucide:check-circle" className="text-success" />
                    )}
                  </div>
                  <div>
                    <h4 className="font-medium text-white">{task.title}</h4>
                    <div className="text-sm text-gray-400 mt-1">
                      8:00 AM for {task.hours} hours
                    </div>
                    <div className="text-sm font-medium mt-1 text-gray-300">
                      {task.taskNumber}
                    </div>
                    <div className="flex items-center mt-2">
                      <Avatar 
                        src={task.assignee.avatar} 
                        alt={task.assignee.name}
                        size="sm"
                      />
                      <span className="text-sm ml-2 text-gray-300">{task.assignee.name}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        <div className="border-t border-gray-800 p-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <h4 className="text-xs text-gray-400 uppercase mb-2">Customer Details</h4>
              <div className="flex items-center gap-2 text-gray-300">
                <Icon icon="lucide:user" className="text-gray-400" />
                <span>{customer.name}</span>
              </div>
              {customer.address && (
                <div className="flex items-center gap-2 mt-1 text-gray-300">
                  <Icon icon="lucide:home" className="text-gray-400" />
                  <span>{customer.address}</span>
                </div>
              )}
              <div className="mt-2">
                <Button variant="flat" size="sm" className="mr-2">
                  <Icon icon="lucide:phone" />
                </Button>
                <Button variant="flat" size="sm" className="mr-2">
                  <Icon icon="lucide:mail" />
                </Button>
                <Button variant="flat" size="sm">
                  <Icon icon="lucide:map-pin" />
                </Button>
              </div>
            </div>
            
            <div>
              <h4 className="text-xs text-gray-400 uppercase mb-2">Project Manager</h4>
              {project.projectManager && (
                <div className="flex items-center gap-2 text-gray-300">
                  <Avatar 
                    src={project.projectManager.avatar} 
                    alt={project.projectManager.name}
                    size="sm"
                  />
                  <span>{project.projectManager.name}</span>
                  <Button variant="flat" size="sm" isIconOnly>
                    <Icon icon="lucide:phone" />
                  </Button>
                </div>
              )}
            </div>
            
            <div>
              <h4 className="text-xs text-gray-400 uppercase mb-2">Workers</h4>
              <div className="flex flex-wrap gap-2">
                {team.map((worker) => (
                  <div key={worker.id} className="flex items-center gap-2 text-gray-300">
                    <Avatar 
                      src={worker.avatar} 
                      alt={worker.name}
                      size="sm"
                    />
                    <span>{worker.name}</span>
                    <Button variant="flat" size="sm" isIconOnly>
                      <Icon icon="lucide:phone" />
                    </Button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </CardBody>
    </Card>
  );
}