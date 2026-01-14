import React from "react";
import { Card, Chip, Button } from "@heroui/react";
import { Icon } from "@iconify/react";
import { Lead } from "../types/project";
import { format } from "date-fns";

interface LeadCardProps {
  lead: Lead;
}

const statusMap = {
  new: { color: "primary", icon: "lucide:star" },
  contacted: { color: "secondary", icon: "lucide:phone" },
  qualified: { color: "success", icon: "lucide:check" },
  proposal: { color: "warning", icon: "lucide:file-text" },
  converted: { color: "success", icon: "lucide:check-circle" },
  lost: { color: "danger", icon: "lucide:x-circle" },
};

export function LeadCard({ lead }: LeadCardProps) {
  const status = statusMap[lead.status];

  return (
    <Card className="bg-gray-900 border border-gray-800">
      <Card.Content>
        <div className="flex justify-between items-start">
          <div>
            <h3 className="text-lg font-medium text-white">{lead.name}</h3>
            <Chip
              size="sm"
              color={status.color as any}
              variant="tertiary"
              slot="start"
              className="mt-2"
            >
              {lead.status}
            </Chip>
          </div>
          <div>
            <div className="text-gray-400 text-sm">Est. Value</div>
            <div className="text-white font-medium">
              ${lead.estimatedValue.toLocaleString()}
            </div>
          </div>
        </div>

        <div className="mt-4 space-y-2">
          <div className="flex gap-2 text-sm">
            <Icon icon="lucide:mail" className="text-gray-400 mt-0.5" />
            <div className="text-gray-300">{lead.email}</div>
          </div>
          <div className="flex gap-2 text-sm">
            <Icon icon="lucide:phone" className="text-gray-400 mt-0.5" />
            <div className="text-gray-300">{lead.phone}</div>
          </div>
          <div className="flex gap-2 text-sm">
            <Icon icon="lucide:map-pin" className="text-gray-400 mt-0.5" />
            <div className="text-gray-300">{lead.address}</div>
          </div>
        </div>

        <div className="mt-4">
          <div className="text-sm text-gray-400">Notes:</div>
          <div className="text-gray-300 mt-1">{lead.notes}</div>
        </div>

        <div className="mt-4">
          <div className="flex justify-between items-center text-sm">
            <div className="text-gray-400">
              Created: {format(new Date(lead.createdAt), "MMM dd, yyyy")}
            </div>
            <div className="flex items-center gap-2">
              <div className="text-gray-400">Assigned to:</div>
              <div className="flex items-center gap-1">
                <img
                  src={lead.assignee.avatar}
                  alt={lead.assignee.name}
                  className="w-5 h-5 rounded-full"
                />
                <span className="text-gray-300">{lead.assignee.name}</span>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-4 flex gap-2 justify-end">
          <Button variant="tertiary" size="sm">
            <Icon icon="lucide:mail" className="mr-1" />
            Email
          </Button>
          <Button variant="tertiary" size="sm">
            <Icon icon="lucide:phone" className="mr-1" />
            Call
          </Button>
          <Button color="primary" size="sm">
            <Icon icon="lucide:chevron-right" className="mr-1" />
            Next Step
          </Button>
        </div>
      </Card.Content>
    </Card>
  );
}
