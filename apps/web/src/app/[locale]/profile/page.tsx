"use client";

import { useState } from "react";
import {
  User,
  Settings,
  CreditCard,
  Shield,
  Bell,
  HelpCircle,
  LogOut,
  Home,
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { UserProfile } from "@/components/UserProfile";
import { ProtectedRoute } from "@/components/ProtectedRoute";
import {
  Sidebar,
  SidebarHeader,
  SidebarItem,
  SidebarItemGroup,
  SidebarCollapsibleItemGroup,
  SidebarCollapsibleItemGroupTrigger,
  SidebarCollapsibleItemGroupContent,
  SidebarFooter,
} from "@/components/ui/sidebar2";

export default function ProfilePage() {
  const [active, setActive] = useState("profile");

  const renderContent = () => {
    switch (active) {
      case "profile":
        return <UserProfile />;
      case "settings":
        return (
          <div className="p-6">
            <h2 className="text-2xl font-bold mb-4">Settings</h2>
            <p className="text-gray-600">Settings page coming soon...</p>
          </div>
        );
      case "billing":
        return (
          <div className="p-6">
            <h2 className="text-2xl font-bold mb-4">Billing</h2>
            <p className="text-gray-600">Billing page coming soon...</p>
          </div>
        );
      case "security":
        return (
          <div className="p-6">
            <h2 className="text-2xl font-bold mb-4">Security</h2>
            <p className="text-gray-600">Security settings coming soon...</p>
          </div>
        );
      case "notifications":
        return (
          <div className="p-6">
            <h2 className="text-2xl font-bold mb-4">Notifications</h2>
            <p className="text-gray-600">
              Notification preferences coming soon...
            </p>
          </div>
        );
      default:
        return <UserProfile />;
    }
  };

  return (
    <ProtectedRoute>
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <div className="flex flex-1 pt-16">
          <Sidebar className="bg-white border-r border-gray-200">
            <SidebarHeader icon={(props) => <Home {...props} />} />

            <SidebarItemGroup>
              <SidebarItem
                icon={(props) => <User {...props} />}
                text="Profile"
                isActive={active === "profile"}
                onClick={() => setActive("profile")}
              />
              <SidebarItem
                icon={(props) => <Settings {...props} />}
                text="Settings"
                isActive={active === "settings"}
                onClick={() => setActive("settings")}
              />
              <SidebarItem
                icon={(props) => <CreditCard {...props} />}
                text="Billing"
                isActive={active === "billing"}
                onClick={() => setActive("billing")}
              />
            </SidebarItemGroup>

            <SidebarCollapsibleItemGroup value="preferences" type="single">
              <SidebarCollapsibleItemGroupTrigger
                icon={(props) => <Bell {...props} />}
              >
                <span>Preferences</span>
              </SidebarCollapsibleItemGroupTrigger>
              <SidebarCollapsibleItemGroupContent>
                <SidebarItem
                  icon={(props) => <Bell {...props} />}
                  text="Notifications"
                  isActive={active === "notifications"}
                  onClick={() => setActive("notifications")}
                />
                <SidebarItem
                  icon={(props) => <Shield {...props} />}
                  text="Security"
                  isActive={active === "security"}
                  onClick={() => setActive("security")}
                />
              </SidebarCollapsibleItemGroupContent>
            </SidebarCollapsibleItemGroup>

            <SidebarItemGroup>
              <SidebarItem
                icon={(props) => <HelpCircle {...props} />}
                text="Help & Support"
                onClick={() => window.open("/help", "_blank")}
              />
            </SidebarItemGroup>

            <SidebarFooter>
              <SidebarItem
                icon={(props) => <LogOut {...props} />}
                text="Sign Out"
                onClick={() => {
                  // Handle sign out logic here
                  console.log("Sign out clicked");
                }}
              />
            </SidebarFooter>
          </Sidebar>

          <div className="flex-1 bg-gray-50">
            <div className="max-w-4xl mx-auto">{renderContent()}</div>
          </div>
        </div>
        <Footer />
      </div>
    </ProtectedRoute>
  );
}
