import React from "react";
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, Avatar, Button } from "@heroui/react";
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
    <Table aria-label="Time entry list">
      <TableHeader>
        <TableColumn>WORKER</TableColumn>
        <TableColumn>PROJECT</TableColumn>
        <TableColumn>DATE</TableColumn>
        <TableColumn>HOURS</TableColumn>
        <TableColumn>NOTES</TableColumn>
        <TableColumn>ACTIONS</TableColumn>
      </TableHeader>
      <TableBody>
        {timeEntries.map((entry) => {
          const worker = getWorker(entry.workerId);
          if (!worker) return null;

          return (
            <TableRow key={entry.id} className="border-b border-gray-800">
              <TableCell>
                <div className="flex items-center gap-2">
                  <Avatar
                    src={worker.avatar}
                    name={worker.name}
                    size="sm"
                  />
                  <div>
                    <div className="text-sm font-medium text-gray-300">{worker.name}</div>
                    <div className="text-xs text-gray-400">{worker.role}</div>
                  </div>
                </div>
              </TableCell>
              <TableCell>
                <div className="text-gray-300">{getProject(entry.projectId)}</div>
              </TableCell>
              <TableCell>
                <div className="text-gray-300">{format(new Date(entry.date), "MMM dd, yyyy")}</div>
              </TableCell>
              <TableCell>
                <div className="text-gray-300">{entry.hours}</div>
              </TableCell>
              <TableCell>
                <div className="text-gray-300">{entry.notes}</div>
              </TableCell>
              <TableCell>
                <div className="flex items-center gap-2">
                  <Button isIconOnly variant="light" size="sm">
                    <Icon icon="lucide:edit" className="text-gray-400" />
                  </Button>
                  <Button isIconOnly variant="light" size="sm">
                    <Icon icon="lucide:trash-2" className="text-gray-400" />
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          );
        })}
      </TableBody>
    </Table>
  );
}
