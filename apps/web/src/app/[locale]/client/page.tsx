"use client";

import { useState } from "react";
import { useGetStravaActivitiesQuery } from "@/generated/graphql";
import { useRBAC } from "@/hooks/use-rbac";
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
  const { user } = useRBAC();
  const { data, loading, error, refetch } = useGetStravaActivitiesQuery({
    variables: { limit: 5 },
    skip: !user,
  });
  const apiBase = (process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001/graphql").replace(/\/?graphql$/, "");
  const connectUrl = `${apiBase}/strava/connect?state=${user?.id || ""}`;

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
          <div className="p-6 space-y-4">
            <h2 className="text-2xl font-bold">Overview</h2>
            {loading && <p>Loading activities...</p>}
            {error && (
              <div>
                <p className="text-gray-600 mb-2">Connect your account to Strava to see recent activities.</p>
                <a
                  href={connectUrl}
                  className="inline-block px-4 py-2 bg-orange-500 text-white rounded"
                >
                  Connect with Strava
                </a>
              </div>
            )}
            {data?.getStravaActivities && (
              <ul className="space-y-2">
                {data.getStravaActivities.map((act) => (
                  <li key={act.id} className="border p-2 rounded">
                    <div className="font-medium">{act.name}</div>
                    <div className="text-sm text-gray-600">
                      {Math.round(act.distance / 1000)} km – {Math.round(act.movingTime / 60)} min
                    </div>
                  </li>
                ))}
              </ul>
            )}
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
