import React from "react";
import { Card, CardHeader } from "@heroui/react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

interface ChartData {
  day: string;
  value: number;
}

interface ChartCardProps {
  title: string;
  value: string;
  period: string;
  data: ChartData[];
  color?: string;
}

export function ChartCard({ title, value, period, data, color = "#006FEE" }: ChartCardProps) {
  return (
    <Card className="w-full bg-gray-900 border border-gray-800">
      <CardHeader className="flex flex-col items-start px-6 pt-6 pb-0">
        <p className="text-gray-400 text-sm">{title}</p>
        <div className="flex items-center justify-between w-full">
          <h3 className="text-2xl font-semibold text-white">{value}</h3>
          <p className="text-xs text-gray-400">{period}</p>
        </div>
      </CardHeader>
      <Card.Content className="h-64 overflow-hidden">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#333" />
            <XAxis 
              dataKey="day" 
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 12, fill: "#888" }}
            />
            <YAxis 
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 12, fill: "#888" }}
              tickFormatter={(value) => `€${value/1000}k`}
            />
            <Tooltip 
              contentStyle={{ backgroundColor: "#222", borderColor: "#444", color: "#fff" }}
              labelStyle={{ color: "#fff" }}
            />
            <Line 
              type="monotone" 
              dataKey="value" 
              stroke={color} 
              strokeWidth={2}
              dot={false}
              activeDot={{ r: 6 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </Card.Content>
    </Card>
  );
}