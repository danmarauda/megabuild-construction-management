import React from "react";
import { Card, Button } from "@heroui/react";
import { Icon } from "@iconify/react";
import { Project } from "../types/project";
import { format } from "date-fns";

interface TimelineViewProps {
  projects: Project[];
}

export function TimelineView({ projects }: TimelineViewProps) {
  const [view, setView] = React.useState("timeline");

  return (
    <div className="w-full">
      <div className="flex items-center gap-4 mb-4">
        <Button
          variant={view === "timeline" ? "primary" : "tertiary"}
          onPress={() => setView("timeline")}
        >
          Timeline view
        </Button>
        <Button
          variant={view === "month" ? "primary" : "tertiary"}
          onPress={() => setView("month")}
        >
          Month view
        </Button>
        <Button
          variant={view === "gantt" ? "primary" : "tertiary"}
          onPress={() => setView("gantt")}
        >
          Gantt view
        </Button>
      </div>

      <div className="space-y-6">
        {projects.map((project) => (
          <Card key={project.id} className="w-full bg-gray-900 border border-gray-800">
            <Card.Content className="p-0">
              <div className="flex items-center justify-between p-4 border-b border-gray-800">
                <div>
                  <h3 className="text-lg font-medium text-white">{project.title}</h3>
                  <div className="flex items-center gap-2 mt-1">
                    <Button variant="tertiary" size="sm" onPress={() => {}}>
                      General
                    </Button>
                    <Icon icon="lucide:chevron-down" className="text-gray-400" />
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Button isIconOnly variant="tertiary" size="sm" onPress={() => {}}>
                    <Icon icon="lucide:image" />
                  </Button>
                  <Button isIconOnly variant="tertiary" size="sm" onPress={() => {}}>
                    <Icon icon="lucide:file-text" />
                  </Button>
                  <Button isIconOnly variant="tertiary" size="sm" onPress={() => {}}>
                    <Icon icon="lucide:layout-grid" />
                  </Button>
                  <Button isIconOnly variant="tertiary" size="sm" onPress={() => {}}>
                    <Icon icon="lucide:more-horizontal" />
                  </Button>
                  <Button isIconOnly variant="tertiary" size="sm" onPress={() => {}}>
                    <Icon icon="lucide:maximize-2" />
                  </Button>
                </div>
              </div>

              <div className="p-4">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <div className="text-sm font-medium text-gray-300">
                      {project.completionPercentage}/30 Completed tasks
                    </div>
                  </div>
                  <div className="text-sm text-gray-400">
                    Complete by {format(new Date(project.endDate), "MMM dd, yyyy")}
                  </div>
                </div>

                <div className="grid grid-cols-4 gap-4">
                  {["APR 14", "APR 15", "APR 16", "APR 17"].map((date, index) => (
                    <div key={date} className="border-l border-gray-700 pl-4">
                      <div className="font-medium mb-2 text-gray-300">{date}</div>

                      {project.tasks
                        .filter(task => {
                          const taskDate = new Date(task.start);
                          return taskDate.getDate() === 14 + index;
                        })
                        .map(task => (
                          <div
                            key={task.id}
                            className="bg-primary-900/30 p-3 rounded-lg mb-2"
                          >
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
                                <div className="text-xs text-gray-400 mt-1">
                                  8:00 AM for {task.hours} hours
                                </div>
                                <div className="text-xs font-medium mt-1 text-gray-300">
                                  {task.taskNumber}
                                </div>
                                <div className="flex items-center mt-2">
                                  <img
                                    src={task.assignee.avatar}
                                    alt={task.assignee.name}
                                    className="w-6 h-6 rounded-full"
                                  />
                                </div>
                              </div>
                            </div>
                          </div>
                        ))
                      }

                      {index === 0 && (
                        <div className="flex items-center gap-1 text-xs text-gray-400 mt-2">
                          <Icon icon="lucide:plus" />
                          <span>5 hours</span>
                        </div>
                      )}

                      {(index === 0 || index === 3) && (
                        <Button
                          variant="tertiary"
                          size="sm"
                          className="mt-2"
                          onPress={() => {}}
                        >
                          <Icon icon="lucide:palette" slot="start" />
                          Paint
                        </Button>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </Card.Content>
          </Card>
        ))}
      </div>
    </div>
  );
}
