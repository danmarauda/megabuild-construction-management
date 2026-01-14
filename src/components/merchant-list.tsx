import React from "react";
import { Card, CardHeader, Avatar } from "@heroui/react";
import { Icon } from "@iconify/react";

interface Merchant {
  id: string;
  name: string;
  email: string;
  amount: number;
}

interface MerchantListProps {
  title: string;
  merchants: Merchant[];
}

export function MerchantList({ title, merchants }: MerchantListProps) {
  return (
    <Card className="w-full bg-gray-900 border border-gray-800">
      <CardHeader className="flex items-center justify-between px-6 pt-6 pb-0">
        <div className="flex items-center gap-2">
          <p className="text-gray-300">{title}</p>
          <Icon icon="lucide:arrow-up-right" className="text-gray-400" />
        </div>
      </CardHeader>
      <Card.Content>
        <div className="space-y-4">
          {merchants.map((merchant) => (
            <div key={merchant.id} className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Avatar>
                  <Avatar.Image src={`https://i.pravatar.cc/150?u=${merchant.id}`} />
                  <Avatar.Fallback>ML</Avatar.Fallback>
                </Avatar>
                <div>
                  <p className="font-medium text-white">{merchant.name}</p>
                  <p className="text-xs text-gray-400">{merchant.email}</p>
                </div>
              </div>
              <div className="text-right">
                <p className="font-medium text-white">€{(merchant.amount).toLocaleString()}</p>
              </div>
            </div>
          ))}
        </div>
      </Card.Content>
    </Card>
  );
}