import React from "react";
import { Card } from "@heroui/react";
import { Icon } from "@iconify/react";

interface CurrencyBalance {
  currency: string;
  amount: number;
}

interface CurrencyBalanceCardProps {
  title: string;
  balances: CurrencyBalance[];
}

export function CurrencyBalanceCard({ title, balances }: CurrencyBalanceCardProps) {
  return (
    <Card className="w-full bg-gray-900 border border-gray-800">
      <Card.Content className="p-0">
        <div className="flex items-center justify-between px-6 pt-6 pb-0">
          <div className="flex items-center gap-2">
            <p className="text-gray-300">{title}</p>
            <Icon icon="lucide:arrow-up-right" className="text-gray-400" />
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div className="text-sm text-gray-400">Currency</div>
          <div className="text-sm text-gray-400 text-right">Amount</div>
          
          {balances.map((balance, index) => (
            <React.Fragment key={balance.currency}>
              <div className="font-medium text-gray-300">{balance.currency}</div>
              <div className="text-right font-medium text-white">
                {balance.currency === 'USD' && '$'}
                {balance.currency === 'EUR' && '€'}
                {balance.currency === 'GBP' && '£'}
                {balance.currency === 'RUB' && '₽'}
                {balance.currency === 'UAH' && '₴'}
                {balance.amount.toLocaleString()}
              </div>
            </React.Fragment>
          ))}
        </div>
      </Card.Content>
    </Card>
  );
}