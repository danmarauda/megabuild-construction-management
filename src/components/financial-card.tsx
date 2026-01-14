import React from "react";
import { Card } from "@heroui/react";
import { Icon } from "@iconify/react";

interface FinancialCardProps {
  title: string;
  value: string;
  change: string;
  isPositive: boolean;
  period: string;
  icon?: string;
}

export function FinancialCard({ title, value, change, isPositive, period, icon }: FinancialCardProps) {
  return (
    <Card className="w-full bg-gray-900 border border-gray-800">
      <Card.Content>
        <div className="flex items-center justify-between mb-2">
          <div className="text-gray-400 text-sm flex items-center gap-1">
            {title}
            {icon && <Icon icon={icon} className="text-base" />}
          </div>
          <div className={`text-xs px-2 py-1 rounded-full flex items-center gap-1 ${
            isPositive ? "bg-success-900/30 text-success-400" : "bg-danger-900/30 text-danger-400"
          }`}>
            <Icon icon={isPositive ? "lucide:trending-up" : "lucide:trending-down"} className="text-xs" />
            {change}
          </div>
        </div>
        <div className="text-2xl font-semibold text-white">{value}</div>
        <div className="flex items-center justify-between mt-2">
          <div className="text-xs text-gray-400">{period}</div>
          <Icon icon="lucide:chevron-right" className="text-gray-400" />
        </div>
      </Card.Content>
    </Card>
  );
}