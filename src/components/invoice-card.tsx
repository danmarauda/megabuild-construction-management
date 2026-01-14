import React from "react";
import { Card, Chip, Button } from "@heroui/react";
import { Icon } from "@iconify/react";
import { Invoice } from "../types/project";
import { format } from "date-fns";

interface InvoiceCardProps {
  invoice: Invoice;
}

const statusMap = {
  draft: { color: "default", icon: "lucide:edit" },
  sent: { color: "primary", icon: "lucide:send" },
  viewed: { color: "secondary", icon: "lucide:eye" },
  pending: { color: "warning", icon: "lucide:clock" },
  paid: { color: "success", icon: "lucide:check" },
  overdue: { color: "danger", icon: "lucide:alert-circle" },
};

export function InvoiceCard({ invoice }: InvoiceCardProps) {
  const status = statusMap[invoice.status];

  return (
    <Card className="bg-gray-900 border border-gray-800">
      <Card.Content>
        <div className="flex justify-between items-start">
          <div>
            <h3 className="text-lg font-medium text-white">{invoice.id}</h3>
            <Chip
              size="sm"
              color={status.color as any}
              variant="tertiary"
              slot="start"
              className="mt-2"
            >
              {invoice.status}
            </Chip>
          </div>
          <div className="text-right">
            <div className="text-gray-400 text-sm">Amount</div>
            <div className="text-white font-medium text-xl">
              ${invoice.amount.toLocaleString()}
            </div>
          </div>
        </div>

        <div className="mt-4 space-y-1">
          <div className="flex justify-between text-sm">
            <div className="text-gray-400">Created</div>
            <div className="text-gray-300">
              {format(new Date(invoice.createdAt), "MMM dd, yyyy")}
            </div>
          </div>
          <div className="flex justify-between text-sm">
            <div className="text-gray-400">Due Date</div>
            <div className="text-gray-300">
              {format(new Date(invoice.dueDate), "MMM dd, yyyy")}
            </div>
          </div>
          {invoice.paidAt && (
            <div className="flex justify-between text-sm">
              <div className="text-gray-400">Paid On</div>
              <div className="text-gray-300">
                {format(new Date(invoice.paidAt), "MMM dd, yyyy")}
              </div>
            </div>
          )}
        </div>

        <div className="mt-4">
          <div className="text-sm text-gray-400">Items:</div>
          <div className="mt-2">
            {invoice.items.map((item, index) => (
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
          {invoice.status === "draft" && (
            <Button color="primary" size="sm">
              <Icon icon="lucide:send" className="mr-1" />
              Send
            </Button>
          )}
          {(invoice.status === "sent" ||
            invoice.status === "viewed" ||
            invoice.status === "pending") && (
            <Button color="success" size="sm">
              <Icon icon="lucide:check" className="mr-1" />
              Mark as Paid
            </Button>
          )}
        </div>
      </Card.Content>
    </Card>
  );
}
