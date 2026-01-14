import React from "react";
import { Card, CardBody, CardHeader, Progress } from "@heroui/react";

interface PaymentStatusCardProps {
  title: string;
  value: string;
  subtitle: string;
  successfulAmount: string;
  failedAmount: string;
  successPercentage: number;
}

export function PaymentStatusCard({ 
  title, 
  value, 
  subtitle, 
  successfulAmount, 
  failedAmount, 
  successPercentage 
}: PaymentStatusCardProps) {
  return (
    <Card className="w-full bg-gray-900 border border-gray-800">
      <CardHeader className="flex flex-col items-start px-6 pt-6 pb-0">
        <div className="flex items-center justify-between w-full">
          <div>
            <p className="text-gray-400 text-sm">{title}</p>
            <h3 className="text-2xl font-semibold text-white">{value}</h3>
            <p className="text-xs text-gray-400">{subtitle}</p>
          </div>
        </div>
      </CardHeader>
      <CardBody>
        <h4 className="text-sm mb-2 text-gray-300">Payment count</h4>
        <Progress 
          value={successPercentage} 
          color="secondary"
          className="mb-4"
        />
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-sm bg-secondary"></div>
            <span className="text-sm text-gray-300">Succeeded</span>
            <span className="text-sm font-medium text-white">{successfulAmount}</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-sm bg-warning"></div>
            <span className="text-sm text-gray-300">Failed</span>
            <span className="text-sm font-medium text-white">{failedAmount}</span>
          </div>
        </div>
      </CardBody>
    </Card>
  );
}