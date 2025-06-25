"use client";

import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import {
  Sidebar,
  SidebarHeader,
  SidebarItem,
  SidebarItemGroup,
  SidebarFooter,
} from "@/components/ui/sidebar2";
import { Home, Dumbbell, LineChart, Settings, LogOut } from "lucide-react";

export default function ClientDashboard() {
  const [active, setActive] = useState("overview");

  const renderContent = () => {
    switch (active) {
      case "training":
        return (
          <div className="p-6">
            <h2 className="text-2xl font-bold mb-4">Training Plan</h2>
            <p className="text-gray-600">Your training schedule will appear here.</p>
          </div>
        );
      case "stats":
        return (
          <div className="p-6">
            <h2 className="text-2xl font-bold mb-4">Statistics</h2>
            <p className="text-gray-600">Stats and progress graphs coming soon.</p>
          </div>
        );
      case "settings":
        return (
          <div className="p-6">
            <h2 className="text-2xl font-bold mb-4">Settings</h2>
            <p className="text-gray-600">Update your preferences here.</p>
          </div>
        );
      default:
        return (
          <div className="p-6">
            <h2 className="text-2xl font-bold mb-4">Overview</h2>
            <p className="text-gray-600">Welcome to your dashboard!</p>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div className="flex flex-1 pt-16">
        <Sidebar className="bg-white border-r border-gray-200">
          <SidebarHeader icon={(props) => <Home {...props} />} />
          <SidebarItemGroup>
            <SidebarItem
              icon={(props) => <Home {...props} />}
              text="Overview"
              isActive={active === "overview"}
              onClick={() => setActive("overview")}
            />
            <SidebarItem
              icon={(props) => <Dumbbell {...props} />}
              text="Training"
              isActive={active === "training"}
              onClick={() => setActive("training")}
            />
            <SidebarItem
              icon={(props) => <LineChart {...props} />}
              text="Stats"
              isActive={active === "stats"}
              onClick={() => setActive("stats")}
            />
            <SidebarItem
              icon={(props) => <Settings {...props} />}
              text="Settings"
              isActive={active === "settings"}
              onClick={() => setActive("settings")}
            />
          </SidebarItemGroup>
          <SidebarFooter>
            <SidebarItem
              icon={(props) => <LogOut {...props} />}
              text="Sign Out"
              onClick={() => console.log("Sign out")}
            />
          </SidebarFooter>
        </Sidebar>
        <div className="flex-1 bg-gray-50 transition-all">
          <div className="max-w-4xl mx-auto">{renderContent()}</div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
