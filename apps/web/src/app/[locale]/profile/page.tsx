"use client";

import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { UserProfile } from "@/components/UserProfile";
import { ProtectedRoute } from "@/components/ProtectedRoute";
import {
  SidebarProvider,
  Sidebar,
  SidebarContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarInset,
} from "@/components/ui/sidebar";

export default function ProfilePage() {
  const [active, setActive] = useState("profile");

  return (
    <ProtectedRoute>
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <SidebarProvider>
          <div className="flex flex-1 pt-16">
            <Sidebar className="bg-sidebar">
              <SidebarContent>
                <SidebarMenu>
                  <SidebarMenuItem>
                    <SidebarMenuButton isActive={active === "profile"} onClick={() => setActive("profile")}>Profile</SidebarMenuButton>
                  </SidebarMenuItem>
                  <SidebarMenuItem>
                    <SidebarMenuButton isActive={active === "settings"} onClick={() => setActive("settings")}>Settings</SidebarMenuButton>
                  </SidebarMenuItem>
                  <SidebarMenuItem>
                    <SidebarMenuButton isActive={active === "billing"} onClick={() => setActive("billing")}>Billing</SidebarMenuButton>
                  </SidebarMenuItem>
                </SidebarMenu>
              </SidebarContent>
            </Sidebar>
            <SidebarInset className="p-4 w-full">
              {active === "profile" && <UserProfile />}
              {active === "settings" && (
                <div className="p-4">Settings page coming soon...</div>
              )}
              {active === "billing" && (
                <div className="p-4">Billing page coming soon...</div>
              )}
            </SidebarInset>
          </div>
        </SidebarProvider>
        <Footer />
      </div>
    </ProtectedRoute>
  );
}
