import React from "react";
import { Button } from "@heroui/react";
import { Icon } from "@iconify/react";

interface HeaderProps {
  title: string;
  subtitle?: string;
  showTutorial?: boolean;
}

export function Header({ title, subtitle, showTutorial = false }: HeaderProps) {
  return (
    <div className="flex items-center justify-between p-4 border-b border-gray-800 bg-gray-900">
      <div>
        <div className="flex items-center gap-2">
          <h1 className="text-xl font-semibold text-white">{title}</h1>
          {showTutorial && (
            <div className="flex items-center text-xs text-gray-400 gap-1">
              <Icon icon="lucide:play" className="text-sm" />
              <span>TUTORIAL VIDEO</span>
            </div>
          )}
        </div>
        {subtitle && <p className="text-sm text-gray-400">{subtitle}</p>}
      </div>
      <div className="flex items-center gap-2">
        <Button
          variant="flat"
          startContent={<Icon icon="lucide:search" />}
        >
          Search
        </Button>
        <Button
          color="primary"
          startContent={<Icon icon="lucide:plus" />}
        >
          Add
        </Button>
      </div>
    </div>
  );
}