import React from "react";
import { Header } from "../components/header";
import { Button, Card, Tabs, Tab } from "@heroui/react";
import { Icon } from "@iconify/react";
import { EmptyStates } from "../components/empty-state";
import { useTasks } from "../hooks/useConvex";
import { format, addDays, startOfWeek, endOfWeek, eachDayOfInterval } from "date-fns";

export default function Schedule() {
  const { data: tasks, isLoading } = useTasks();
  const [view, setView] = React.useState("week");
  const [currentDate, setCurrentDate] = React.useState(new Date());
  const [selectedProject, setSelectedProject] = React.useState<string | null>(null);

  const changeDate = (increment: number) => {
    if (view === "day") {
      setCurrentDate(prevDate => addDays(prevDate, increment));
    } else if (view === "week") {
      setCurrentDate(prevDate => addDays(prevDate, 7 * increment));
    } else if (view === "month") {
      const newDate = new Date(currentDate);
      newDate.setMonth(newDate.getMonth() + increment);
      setCurrentDate(newDate);
    }
  };

  const startDate = view === "week" ? startOfWeek(currentDate, { weekStartsOn: 1 }) : currentDate;
  const endDate = view === "week" ? endOfWeek(currentDate, { weekStartsOn: 1 }) : currentDate;

  const weekDays = eachDayOfInterval({ start: startDate, end: endDate });

  // Filter tasks for the current week view
  const visibleTasks = React.useMemo(() => {
    return (tasks || []).filter(task => {
      const taskStart = new Date(task.start);
      const taskEnd = new Date(task.end);

      if (view === "week") {
        return taskStart >= startDate && taskStart <= endDate;
      } else if (view === "day") {
        return format(taskStart, "yyyy-MM-dd") === format(currentDate, "yyyy-MM-dd");
      }

      return true;
    });
  }, [tasks, view, currentDate, startDate, endDate]);

  if (isLoading) {
    return (
      <div className="flex-1 overflow-auto">
        <Header title="Schedule" />
        <div className="p-6 flex items-center justify-center h-64">
          <div className="text-center">
            <Icon icon="lucide:loader-2" className="text-4xl text-blue-500 animate-spin mx-auto mb-4" />
            <div className="text-gray-400">Loading schedule...</div>
          </div>
        </div>
      </div>
    );
  }

  if (!tasks || tasks.length === 0) {
    return (
      <div className="flex-1 overflow-auto">
        <Header title="Schedule" />
        <div className="p-6">
          <EmptyStates.schedule />
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 overflow-auto">
      <Header title="Schedule" />

      <div className="p-6">
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center gap-4">
            <Button variant="flat" isIconOnly onPress={() => changeDate(-1)}>
              <Icon icon="lucide:chevron-left" />
            </Button>
            <div className="text-xl font-semibold text-white">
              {view === "day" ? (
                format(currentDate, "MMMM d, yyyy")
              ) : view === "week" ? (
                `${format(startDate, "MMM d")} - ${format(endDate, "MMM d, yyyy")}`
              ) : (
                format(currentDate, "MMMM yyyy")
              )}
            </div>
            <Button variant="flat" isIconOnly onPress={() => changeDate(1)}>
              <Icon icon="lucide:chevron-right" />
            </Button>
            <Button variant="light" onPress={() => setCurrentDate(new Date())}>Today</Button>
          </div>

          <div className="flex gap-2">
            <Tabs
              aria-label="View options"
              selectedKey={view}
              onSelectionChange={setView as any}
              size="sm"
            >
              <Tab key="day" title="Day" />
              <Tab key="week" title="Week" />
              <Tab key="month" title="Month" />
            </Tabs>

            <Button color="primary">
              <Icon icon="lucide:plus" slot="start" />
              New Event
            </Button>
          </div>
        </div>

        {view === "week" && (
          <Card className="bg-gray-900 border border-gray-800">
            <Card.Content className="p-0">
              <div className="grid grid-cols-7">
                {weekDays.map((day, i) => (
                  <div
                    key={i}
                    className={`p-2 text-center border-b border-r border-gray-800 ${
                      format(day, "yyyy-MM-dd") === format(new Date(), "yyyy-MM-dd") ? "bg-gray-800" : ""
                    }`}
                  >
                    <div className="text-gray-400 text-xs">{format(day, "EEE")}</div>
                    <div className="text-white font-medium">{format(day, "d")}</div>
                  </div>
                ))}
              </div>

              <div className="grid grid-cols-7" style={{ minHeight: "600px" }}>
                {weekDays.map((day, dayIndex) => (
                  <div key={dayIndex} className="border-r border-gray-800 p-1 relative">
                    {visibleTasks
                      .filter(task => format(new Date(task.start), "yyyy-MM-dd") === format(day, "yyyy-MM-dd"))
                      .map((task, taskIndex) => (
                        <div
                          key={task.id}
                          className={`p-2 mb-1 rounded text-xs ${
                            task.status === 'pending' ? 'bg-yellow-900/50 border-l-4 border-yellow-500' :
                            task.status === 'in-progress' ? 'bg-blue-900/50 border-l-4 border-blue-500' :
                            task.status === 'completed' ? 'bg-green-900/50 border-l-4 border-green-500' :
                            'bg-red-900/50 border-l-4 border-red-500'
                          }`}
                        >
                          <div className="flex items-center justify-between">
                            <div className="font-medium text-white">{task.title}</div>
                            <div className="text-gray-300">{task.hours}h</div>
                          </div>
                          <div className="mt-1 flex items-center gap-1">
                            <Icon
                              icon="lucide:user"
                              className="w-3 h-3 text-gray-300"
                            />
                            <span className="text-gray-300 text-xxs">{task.assignee.name}</span>
                          </div>
                        </div>
                      ))
                    }
                  </div>
                ))}
              </div>
            </Card.Content>
          </Card>
        )}

        {view === "day" && (
          <Card className="bg-gray-900 border border-gray-800">
            <Card.Content>
              <div className="flex">
                <div className="w-16 border-r border-gray-800">
                  {Array.from({ length: 24 }).map((_, i) => (
                    <div key={i} className="h-16 text-xs text-gray-400 text-center">
                      {i === 0 ? "12 AM" : i < 12 ? `${i} AM` : i === 12 ? "12 PM" : `${i - 12} PM`}
                    </div>
                  ))}
                </div>
                <div className="flex-1">
                  {Array.from({ length: 24 }).map((_, i) => (
                    <div key={i} className="h-16 border-b border-gray-800 relative">
                      {visibleTasks
                        .filter(task => {
                          const taskHour = new Date(task.start).getHours();
                          return taskHour === i;
                        })
                        .map((task) => (
                          <div
                            key={task.id}
                            className={`absolute left-0 right-0 mx-2 p-2 rounded ${
                              task.status === 'pending' ? 'bg-yellow-900/50 border-l-4 border-yellow-500' :
                              task.status === 'in-progress' ? 'bg-blue-900/50 border-l-4 border-blue-500' :
                              task.status === 'completed' ? 'bg-green-900/50 border-l-4 border-green-500' :
                              'bg-red-900/50 border-l-4 border-red-500'
                            }`}
                            style={{ top: "4px", height: "calc(100% - 8px)" }}
                          >
                            <div className="font-medium text-white">{task.title}</div>
                            <div className="text-xs text-gray-300">
                              {task.hours} hours • {task.assignee.name}
                            </div>
                          </div>
                        ))
                      }
                    </div>
                  ))}
                </div>
              </div>
            </Card.Content>
          </Card>
        )}

        {view === "month" && (
          <Card className="bg-gray-900 border border-gray-800">
            <Card.Content>
              <div className="text-center text-xl text-gray-300 py-20">
                <Icon icon="lucide:calendar" className="text-5xl mx-auto mb-4" />
                <div>Month view is under development</div>
                <Button variant="flat" className="mt-4" onPress={() => setView("week")}>
                  Switch to Week View
                </Button>
              </div>
            </Card.Content>
          </Card>
        )}
      </div>
    </div>
  );
}
