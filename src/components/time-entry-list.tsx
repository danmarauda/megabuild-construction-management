import React from "react";
import { Avatar, Button } from "@heroui/react";
import { Icon } from "@iconify/react";
import { TimeEntry } from "../types/project";
import { useWorkers, useProjects } from "../hooks/useConvex";
import { format } from "date-fns";

interface TimeEntryListProps {
  timeEntries: TimeEntry[];
}

export function TimeEntryList({ timeEntries }: TimeEntryListProps) {
  const workers = useWorkers();
  const projects = useProjects();

  const getWorker = (workerId: string) => {
    return workers?.find(w => w.id === workerId) || workers?.[0];
  };

  const getProject = (projectId: string) => {
    return projects?.find(p => p.id === projectId)?.title || "Unknown Project";
  };

  if (!workers || !projects) {
    return (
      <div className="text-center py-8">
        <Icon icon="lucide:loader-2" className="text-2xl text-gray-400 mx-auto animate-spin" />
        <div className="text-gray-400 mt-2">Loading workers and projects...</div>
      </div>
    );
  }

  return (
    <table className="w-full border-collapse">
      <thead className="bg-gray-800">
        <tr>
          <th className="text-left p-3 text-gray-300 font-medium border-b border-gray-700">WORKER</th>
          <th className="text-left p-3 text-gray-300 font-medium border-b border-gray-700">PROJECT</th>
          <th className="text-left p-3 text-gray-300 font-medium border-b border-gray-700">DATE</th>
          <th className="text-left p-3 text-gray-300 font-medium border-b border-gray-700">HOURS</th>
          <th className="text-left p-3 text-gray-300 font-medium border-b border-gray-700">NOTES</th>
          <th className="text-left p-3 text-gray-300 font-medium border-b border-gray-700">ACTIONS</th>
        </tr>
      </thead>
      <tbody>
        {timeEntries.map((entry) => {
          const worker = getWorker(entry.workerId);
          if (!worker) return null;

          return (
            <tr key={entry.id} className="border-b border-gray-800 hover:bg-gray-800/50">
              <td className="p-3 text-gray-300">
                <div className="flex items-center gap-2">
                  <Avatar size="sm">
                    <Avatar.Image src={worker.avatar} />
                    <Avatar.Fallback>{worker.name.split(' ').map(n => n[0]).join('')}</Avatar.Fallback>
                  </Avatar>
                  <div>
                    <div className="text-sm font-medium text-gray-300">{worker.name}</div>
                    <div className="text-xs text-gray-400">{worker.role}</div>
                  </div>
                </div>
              </td>
              <td className="p-3 text-gray-300">
                <div className="text-gray-300">{getProject(entry.projectId)}</div>
              </td>
              <td className="p-3 text-gray-300">
                <div className="text-gray-300">{format(new Date(entry.date), "MMM dd, yyyy")}</div>
              </td>
              <td className="p-3 text-gray-300">
                <div className="text-gray-300">{entry.hours}</div>
              </td>
              <td className="p-3 text-gray-300">
                <div className="text-gray-300">{entry.notes}</div>
              </td>
              <td className="p-3 text-gray-300">
                <div className="flex items-center gap-2">
                  <Button isIconOnly variant="light" size="sm">
                    <Icon icon="lucide:edit" className="text-gray-400" />
                  </Button>
                  <Button isIconOnly variant="light" size="sm">
                    <Icon icon="lucide:trash-2" className="text-gray-400" />
                  </Button>
                </div>
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}
