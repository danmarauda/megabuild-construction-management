import { HeroUIProvider, ToastProvider } from "@heroui/react";
import { ConvexProvider, ConvexReactClient } from "convex/react";
import React from "react";
import ReactDOM from "react-dom/client";

import App from "./App.jsx";

import "./index.css";

const convex = new ConvexReactClient(import.meta.env.VITE_CONVEX_URL);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ConvexProvider client={convex}>
      <HeroUIProvider>
        <ToastProvider />
        <main className="text-foreground bg-background">
          <App />
        </main>
      </HeroUIProvider>
    </ConvexProvider>
  </React.StrictMode>,
);
