import React from "react";
import { Card, Chip, Button, Avatar } from "@heroui/react";
import { Icon } from "@iconify/react";
import { Customer } from "../types/project";

interface CustomerCardProps {
  customer: Customer;
}

export function CustomerCard({ customer }: CustomerCardProps) {
  return (
    <Card className="bg-gray-900 border border-gray-800">
      <Card.Content>
        <div className="flex justify-between items-start">
          <div className="flex items-center gap-4">
            <Avatar size="lg">
              <Avatar.Image src={customer.avatar} />
              <Avatar.Fallback>{customer.name.split(' ').map(n => n[0]).join('')}</Avatar.Fallback>
            </Avatar>
            <div>
              <h3 className="text-xl font-medium text-white">{customer.name}</h3>
              <div className="mt-1">
                <Chip 
                  size="sm" 
                  color={customer.status === 'active' ? "success" : "default"}
                  variant="tertiary"
                >
                  {customer.status}
                </Chip>
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <Button variant="tertiary" size="sm">
              <Icon icon="lucide:mail" className="mr-1" />
              Email
            </Button>
            <Button variant="tertiary" size="sm">
              <Icon icon="lucide:phone" className="mr-1" />
              Call
            </Button>
          </div>
        </div>
        
        <div className="mt-4 space-y-2">
          <div className="flex gap-2 text-sm">
            <Icon icon="lucide:mail" className="text-gray-400 mt-0.5" />
            <div className="text-gray-300">{customer.email}</div>
          </div>
          <div className="flex gap-2 text-sm">
            <Icon icon="lucide:phone" className="text-gray-400 mt-0.5" />
            <div className="text-gray-300">{customer.phone}</div>
          </div>
          <div className="flex gap-2 text-sm">
            <Icon icon="lucide:map-pin" className="text-gray-400 mt-0.5" />
            <div className="text-gray-300">{customer.address}</div>
          </div>
        </div>
        
        <div className="mt-4">
          <div className="text-sm text-gray-400">Projects: {customer.projects.length}</div>
          {customer.projects.length > 0 && (
            <div className="flex gap-2 mt-2">
              {customer.projects.map(projectId => (
                <Chip key={projectId} size="sm" variant="tertiary">Project #{projectId}</Chip>
              ))}
            </div>
          )}
        </div>
        
        <div className="mt-4 flex gap-2 justify-end">
          <Button variant="tertiary" size="sm">
            <Icon icon="lucide:file-text" className="mr-1" />
            View Invoices
          </Button>
          <Button color="primary" size="sm">
            <Icon icon="lucide:plus" className="mr-1" />
            New Project
          </Button>
        </div>
      </Card.Content>
    </Card>
  );
}