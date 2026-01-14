import React from "react";
import { Chip, Avatar, Button } from "@heroui/react";
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
    <table className="w-full border-collapse">
      <thead className="bg-gray-800">
        <tr>
          <th className="text-left p-3 text-gray-300 font-medium border-b border-gray-700">TASK</th>
          <th className="text-left p-3 text-gray-300 font-medium border-b border-gray-700">ASSIGNEE</th>
          <th className="text-left p-3 text-gray-300 font-medium border-b border-gray-700">STATUS</th>
          <th className="text-left p-3 text-gray-300 font-medium border-b border-gray-700">START DATE</th>
          <th className="text-left p-3 text-gray-300 font-medium border-b border-gray-700">END DATE</th>
          <th className="text-left p-3 text-gray-300 font-medium border-b border-gray-700">HOURS</th>
          <th className="text-left p-3 text-gray-300 font-medium border-b border-gray-700">ACTIONS</th>
        </tr>
      </thead>
      <tbody>
        {tasks.map((task) => (
          <tr key={task.id} className="border-b border-gray-800 hover:bg-gray-800/50">
            <td className="p-3 text-gray-300">
              <div className="font-medium text-white">{task.title}</div>
              <div className="text-xs text-gray-400">{task.taskNumber && `Task #${task.taskNumber}`}</div>
            </td>
            <td className="p-3 text-gray-300">
              <div className="flex items-center gap-2">
                <Avatar size="sm">
                  <Avatar.Image src={task.assignee.avatar} />
                  <Avatar.Fallback>{task.assignee.name.split(' ').map(n => n[0]).join('')}</Avatar.Fallback>
                </Avatar>
                <div>
                  <div className="text-sm font-medium text-gray-300">{task.assignee.name}</div>
                  <div className="text-xs text-gray-400">{task.assignee.role}</div>
                </div>
              </div>
            </td>
            <td className="p-3 text-gray-300">
              <Chip
                color={statusColorMap[task.status] as any}
                size="sm"
                variant="tertiary"
              >
                {task.status}
              </Chip>
            </td>
            <td className="p-3 text-gray-300">
              <div className="text-gray-300">{format(new Date(task.start), "MMM dd, yyyy")}</div>
            </td>
            <td className="p-3 text-gray-300">
              <div className="text-gray-300">{format(new Date(task.end), "MMM dd, yyyy")}</div>
            </td>
            <td className="p-3 text-gray-300">
              <div className="text-gray-300">{task.hours || task.duration}</div>
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
        ))}
      </tbody>
    </table>
  );
}