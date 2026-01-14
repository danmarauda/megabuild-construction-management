import React from "react";
import { Card, Chip, Button } from "@heroui/react";
import { Icon } from "@iconify/react";
import { Estimate } from "../types/project";
import { format } from "date-fns";

interface EstimateCardProps {
  estimate: Estimate;
}

const statusMap = {
  draft: { color: "default", icon: "lucide:edit" },
  sent: { color: "primary", icon: "lucide:send" },
  viewed: { color: "secondary", icon: "lucide:eye" },
  approved: { color: "success", icon: "lucide:check" },
  rejected: { color: "danger", icon: "lucide:x" },
};

export function EstimateCard({ estimate }: EstimateCardProps) {
  const status = statusMap[estimate.status];

  return (
    <Card className="bg-gray-900 border border-gray-800">
      <Card.Content>
        <div className="flex justify-between items-start">
          <div>
            <h3 className="text-lg font-medium text-white">{estimate.id}</h3>
            <Chip
              size="sm"
              color={status.color as any}
              variant="tertiary"
                slot="start"
              className="mt-2"
            >
              {estimate.status}
            </Chip>
          </div>
          <div className="text-right">
            <div className="text-gray-400 text-sm">Amount</div>
            <div className="text-white font-medium text-xl">
              ${estimate.amount.toLocaleString()}
            </div>
          </div>
        </div>

        <div className="mt-4 space-y-1">
          <div className="flex justify-between text-sm">
            <div className="text-gray-400">Created</div>
            <div className="text-gray-300">
              {format(new Date(estimate.createdAt), "MMM dd, yyyy")}
            </div>
          </div>
          <div className="flex justify-between text-sm">
            <div className="text-gray-400">Valid Until</div>
            <div className="text-gray-300">
              {format(new Date(estimate.validUntil), "MMM dd, yyyy")}
            </div>
          </div>
          {estimate.sentAt && (
            <div className="flex justify-between text-sm">
              <div className="text-gray-400">Sent On</div>
              <div className="text-gray-300">
                {format(new Date(estimate.sentAt), "MMM dd, yyyy")}
              </div>
            </div>
          )}
          {estimate.approvedAt && (
            <div className="flex justify-between text-sm">
              <div className="text-gray-400">Approved On</div>
              <div className="text-gray-300">
                {format(new Date(estimate.approvedAt), "MMM dd, yyyy")}
              </div>
            </div>
          )}
        </div>

        <div className="mt-4">
          <div className="text-sm text-gray-400">Items:</div>
          <div className="mt-2">
            {estimate.items.map((item, index) => (
              <div
                key={index}
                className="flex justify-between py-1 border-b border-gray-800 text-sm"
              >
                <div className="text-gray-300">{item.description}</div>
                <div className="text-white">
                  ${item.amount.toLocaleString()}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-4 flex gap-2 justify-end">
          <Button variant="tertiary" size="sm">
            <Icon icon="lucide:eye" className="mr-1" />
            View
          </Button>
          <Button variant="tertiary" size="sm">
            <Icon icon="lucide:printer" className="mr-1" />
            Print
          </Button>
          {estimate.status === "draft" && (
            <Button color="primary" size="sm">
              <Icon icon="lucide:send" className="mr-1" />
              Send
            </Button>
          )}
          {estimate.status === "approved" && (
            <Button color="success" size="sm">
              <Icon icon="lucide:file-plus" className="mr-1" />
              Convert to Project
            </Button>
          )}
        </div>
      </Card.Content>
    </Card>
  );
}
