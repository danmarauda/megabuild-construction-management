import React from "react";
import { Icon } from "@iconify/react";
import { Button } from "@heroui/react";

export interface EmptyStateProps {
  /** Icon to display (from iconify) */
  icon: string;
  /** Title of the empty state */
  title: string;
  /** Description message */
  description?: string;
  /** Action button text */
  actionLabel?: string;
  /** Action button handler */
  onAction?: () => void;
  /** Additional className */
  className?: string;
}

/**
 * Reusable empty state component for displaying when no data is available
 */
export function EmptyState({
  icon,
  title,
  description,
  actionLabel,
  onAction,
  className = "",
}: EmptyStateProps) {
  return (
    <div className={`flex flex-col items-center justify-center py-16 px-6 text-center ${className}`}>
      <div className="w-20 h-20 rounded-full bg-gray-800/50 flex items-center justify-center mb-6">
        <Icon icon={icon} className="text-4xl text-gray-500" />
      </div>
      <h3 className="text-xl font-semibold text-gray-200 mb-2">{title}</h3>
      {description && (
        <p className="text-gray-400 max-w-md mb-6">{description}</p>
      )}
      {actionLabel && onAction && (
        <Button color="primary" onPress={onAction} startContent={<Icon icon="lucide:plus" />}>
          {actionLabel}
        </Button>
      )}
    </div>
  );
}

/**
 * Pre-configured empty states for common use cases
 */
export const EmptyStates = {
  projects: (onAction?: () => void) => (
    <EmptyState
      icon="lucide:hard-hat"
      title="No Projects Yet"
      description="Create your first construction project to get started managing your work."
      actionLabel="Create Project"
      onAction={onAction}
    />
  ),

  customers: (onAction?: () => void) => (
    <EmptyState
      icon="lucide:users"
      title="No Customers Yet"
      description="Add your first customer to begin managing client relationships."
      actionLabel="Add Customer"
      onAction={onAction}
    />
  ),

  leads: (onAction?: () => void) => (
    <EmptyState
      icon="lucide:rocket"
      title="No Leads Yet"
      description="Start building your sales pipeline by adding your first lead."
      actionLabel="Add Lead"
      onAction={onAction}
    />
  ),

  invoices: (onAction?: () => void) => (
    <EmptyState
      icon="lucide:file-text"
      title="No Invoices Yet"
      description="Create your first invoice to start billing your customers."
      actionLabel="Create Invoice"
      onAction={onAction}
    />
  ),

  estimates: (onAction?: () => void) => (
    <EmptyState
      icon="lucide:calculator"
      title="No Estimates Yet"
      description="Create your first estimate to share pricing with leads."
      actionLabel="Create Estimate"
      onAction={onAction}
    />
  ),

  tasks: (onAction?: () => void) => (
    <EmptyState
      icon="lucide:check-square"
      title="No Tasks Yet"
      description="Tasks will appear here once assigned to your projects."
      actionLabel="Add Task"
      onAction={onAction}
    />
  ),

  timeEntries: (onAction?: () => void) => (
    <EmptyState
      icon="lucide:clock"
      title="No Time Entries Yet"
      description="Start tracking time on your projects to monitor labor costs."
      actionLabel="Create Time Entry"
      onAction={onAction}
    />
  ),

  workers: (onAction?: () => void) => (
    <EmptyState
      icon="lucide:user-circle"
      title="No Workers Yet"
      description="Add your first team member to start assigning work."
      actionLabel="Add Worker"
      onAction={onAction}
    />
  ),

  files: (onAction?: () => void) => (
    <EmptyState
      icon="lucide:folder-open"
      title="No Files Yet"
      description="Upload project documents, photos, and other files."
      actionLabel="Upload File"
      onAction={onAction}
    />
  ),

  financials: () => (
    <EmptyState
      icon="lucide:pie-chart"
      title="No Financial Data Yet"
      description="Financial overview will populate once you have active projects with costs and revenue."
    />
  ),

  timeline: () => (
    <EmptyState
      icon="lucide:calendar"
      title="No Timeline Data"
      description="Project timeline will appear once you have projects with scheduled tasks."
    />
  ),

  schedule: () => (
    <EmptyState
      icon="lucide:calendar-days"
      title="No Scheduled Items"
      description="Scheduled tasks and events will appear here."
    />
  ),

  map: () => (
    <EmptyState
      icon="lucide:map"
      title="No Project Locations"
      description="Project locations will appear on the map once projects have addresses."
    />
  ),

  reports: () => (
    <EmptyState
      icon="lucide:bar-chart-3"
      title="No Reports Available"
      description="Reports will be generated once you have sufficient project data."
    />
  ),

  search: (query: string) => (
    <EmptyState
      icon="lucide:search"
      title={`No results for "${query}"`}
      description="Try adjusting your search terms or filters."
    />
  ),

  filtered: () => (
    <EmptyState
      icon="lucide:filter"
      title="No matching items found"
      description="Try adjusting your filters to see more results."
    />
  ),
};
