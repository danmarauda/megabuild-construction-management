import React from "react";
import { Link, useLocation } from "react-router-dom";
import { Icon } from "@iconify/react";

interface SidebarItemProps {
  to: string;
  icon: string;
  label: string;
  active: boolean;
}

function SidebarItem({ to, icon, label, active }: SidebarItemProps) {
  return (
    <Link
      to={to}
      className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
        active
          ? "bg-primary-900/40 text-primary-400"
          : "text-gray-300 hover:bg-gray-800"
      }`}
    >
      <Icon icon={icon} className="text-xl" />
      <span>{label}</span>
    </Link>
  );
}

export function Sidebar() {
  const location = useLocation();
  const path = location.pathname;

  return (
    <div className="w-64 h-screen bg-gray-900 border-r border-gray-800 flex flex-col">
      <div className="p-4 border-b border-gray-800">
        <div className="flex items-center gap-2">
          <Icon icon="lucide:hard-hat" className="text-2xl text-primary-400" />
          <span className="font-bold text-xl text-white">MegaBuild</span>
        </div>
      </div>
      
      <div className="p-2">
        <div className="text-xs text-gray-400 font-medium px-4 py-2">MAIN MENU</div>
        <SidebarItem to="/" icon="lucide:layout-dashboard" label="Dashboard" active={path === "/"} />
        <SidebarItem to="/projects" icon="lucide:briefcase" label="Projects" active={path.startsWith("/projects")} />
        <SidebarItem to="/timeline" icon="lucide:calendar" label="Timeline" active={path.startsWith("/timeline")} />
        <SidebarItem to="/tasks" icon="lucide:check-square" label="Task List" active={path.startsWith("/tasks")} />
        <SidebarItem to="/time-tracking" icon="lucide:clock" label="Time Tracking" active={path.startsWith("/time-tracking")} />
        <SidebarItem to="/leads" icon="lucide:users" label="Lead Pipeline" active={path.startsWith("/leads")} />
        <SidebarItem to="/estimates" icon="lucide:calculator" label="Estimates" active={path.startsWith("/estimates")} />
        <SidebarItem to="/invoices" icon="lucide:file-text" label="Invoices" active={path.startsWith("/invoices")} />
        <SidebarItem to="/schedule" icon="lucide:calendar-days" label="Schedule" active={path.startsWith("/schedule")} />
        <SidebarItem to="/photos" icon="lucide:image" label="Photos & Files" active={path.startsWith("/photos")} />
        <SidebarItem to="/customers" icon="lucide:user" label="Customers" active={path.startsWith("/customers")} />
        <SidebarItem to="/map" icon="lucide:map-pin" label="Map" active={path.startsWith("/map")} />
        <SidebarItem to="/reports" icon="lucide:bar-chart-2" label="Reports" active={path.startsWith("/reports")} />
        <SidebarItem to="/finances" icon="lucide:dollar-sign" label="Finances" active={path.startsWith("/finances")} />
      </div>
      
      <div className="mt-auto p-4 border-t border-gray-800">
        <div className="flex items-center gap-3">
          <img 
            src="https://i.pravatar.cc/150?u=jacob" 
            alt="User avatar" 
            className="w-8 h-8 rounded-full"
          />
          <div>
            <div className="text-sm font-medium text-white">Jacob Jones</div>
            <div className="text-xs text-gray-400">Project Manager</div>
          </div>
        </div>
      </div>
    </div>
  );
}