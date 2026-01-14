import React from "react";
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, Chip, Avatar, Button } from "@heroui/react";
import { Icon } from "@iconify/react";
import { Task } from "../types/project";
import { format } from "date-fns";

interface TaskListProps {
  tasks: Task[];
}

export function TaskList({ tasks }: TaskListProps) {
  const statusColorMap = {
    'pending': 'warning',
    'in-progress': 'primary',
    'completed': 'success',
    'overdue': 'danger'
  };

  return (
    <Table aria-label="Task list">
      <TableHeader>
        <TableColumn>TASK</TableColumn>
        <TableColumn>ASSIGNEE</TableColumn>
        <TableColumn>STATUS</TableColumn>
        <TableColumn>START DATE</TableColumn>
        <TableColumn>END DATE</TableColumn>
        <TableColumn>HOURS</TableColumn>
        <TableColumn>ACTIONS</TableColumn>
      </TableHeader>
      <TableBody>
        {tasks.map((task) => (
          <TableRow key={task.id} className="border-b border-gray-800">
            <TableCell>
              <div className="font-medium text-white">{task.title}</div>
              <div className="text-xs text-gray-400">{task.taskNumber && `Task #${task.taskNumber}`}</div>
            </TableCell>
            <TableCell>
              <div className="flex items-center gap-2">
                <Avatar 
                  src={task.assignee.avatar} 
                  name={task.assignee.name}
                  size="sm"
                />
                <div>
                  <div className="text-sm font-medium text-gray-300">{task.assignee.name}</div>
                  <div className="text-xs text-gray-400">{task.assignee.role}</div>
                </div>
              </div>
            </TableCell>
            <TableCell>
              <Chip
                color={statusColorMap[task.status] as any}
                size="sm"
                variant="flat"
              >
                {task.status}
              </Chip>
            </TableCell>
            <TableCell>
              <div className="text-gray-300">{format(new Date(task.start), "MMM dd, yyyy")}</div>
            </TableCell>
            <TableCell>
              <div className="text-gray-300">{format(new Date(task.end), "MMM dd, yyyy")}</div>
            </TableCell>
            <TableCell>
              <div className="text-gray-300">{task.hours || task.duration}</div>
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
        ))}
      </TableBody>
    </Table>
  );
}