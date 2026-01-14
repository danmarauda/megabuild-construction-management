import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Sidebar } from "./components/sidebar";
import Dashboard from "./pages/dashboard";
import Projects from "./pages/projects";
import Timeline from "./pages/timeline";
import Tasks from "./pages/tasks";
import TimeTracking from "./pages/time-tracking";
import Leads from "./pages/leads";
import Estimates from "./pages/estimates";
import Invoices from "./pages/invoices";
import Schedule from "./pages/schedule";
import Photos from "./pages/photos";
import Customers from "./pages/customers";
import Map from "./pages/map";
import Reports from "./pages/reports";
import Finances from "./pages/finances";
import Settings from "./pages/settings";
import Support from "./pages/support";
import Faq from "./pages/faq";

export default function App() {
  // Set dark theme by adding the 'dark' class to the html element
  React.useEffect(() => {
    document.documentElement.classList.add('dark');
  }, []);

  return (
    <Router>
      <div className="flex h-screen bg-background dark:bg-gray-950">
        <Sidebar />
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/timeline" element={<Timeline />} />
          <Route path="/tasks" element={<Tasks />} />
          <Route path="/time-tracking" element={<TimeTracking />} />
          <Route path="/leads" element={<Leads />} />
          <Route path="/estimates" element={<Estimates />} />
          <Route path="/invoices" element={<Invoices />} />
          <Route path="/schedule" element={<Schedule />} />
          <Route path="/photos" element={<Photos />} />
          <Route path="/customers" element={<Customers />} />
          <Route path="/map" element={<Map />} />
          <Route path="/reports" element={<Reports />} />
          <Route path="/finances" element={<Finances />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/support" element={<Support />} />
          <Route path="/faq" element={<Faq />} />
          <Route path="*" element={<Dashboard />} />
        </Routes>
      </div>
    </Router>
  );
}