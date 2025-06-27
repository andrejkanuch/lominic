'use client'
import React from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import {
  Activity,
  Calendar,
  Heart,
  Settings,
  User,
  List,
  Monitor,
  Timer,
  HeartPulse,
  Thermometer,
  MapPin,
} from 'lucide-react'
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarHeader,
  SidebarFooter,
  useSidebar,
} from '@/components/ui/sidebar'

const healthItems = [
  { title: 'Dashboard', url: '/client/dashboard', icon: Monitor },
  { title: 'Health Metrics', url: '/client/health', icon: HeartPulse },
  { title: 'Vital Signs', url: '/client/vitals', icon: Thermometer },
  { title: 'Heart Rate', url: '/client/heart-rate', icon: Heart },
]

const trackingItems = [
  { title: 'Activities', url: '/client/activities', icon: Activity },
  { title: 'Workouts', url: '/client/workouts', icon: Timer },
  { title: 'Goals', url: '/client/goals', icon: List },
  { title: 'Location', url: '/client/location', icon: MapPin },
  { title: 'Calendar', url: '/client/calendar', icon: Calendar },
]

const basicItems = [
  { title: 'Profile', url: '/client/profile', icon: User },
  { title: 'Settings', url: '/client/settings', icon: Settings },
]

export function ClientSidebar() {
  const { state } = useSidebar()
  const currentPath = usePathname()
  const isCollapsed = state === 'collapsed'

  const isActive = (path: string) => currentPath === path

  const getNavClass = (path: string) =>
    isActive(path)
      ? 'bg-pulse-100 text-pulse-700 border-r-2 border-pulse-500'
      : 'text-gray-700 hover:bg-pulse-50 hover:text-pulse-600'

  return (
    <Sidebar
      className={`border-r border-gray-200 bg-white ${
        isCollapsed ? 'w-16' : 'w-64'
      }`}
    >
      <SidebarHeader className="border-b border-gray-200 p-4">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-pulse-500 rounded-lg flex items-center justify-center">
            <Activity className="w-5 h-5 text-white" />
          </div>
          {!isCollapsed && (
            <div>
              <h2 className="font-semibold text-gray-900">Health Hub</h2>
              <p className="text-xs text-gray-500">Your wellness companion</p>
            </div>
          )}
        </div>
      </SidebarHeader>

      <SidebarContent className="p-2">
        <SidebarGroup>
          <SidebarGroupLabel className="text-pulse-600 font-medium text-xs uppercase tracking-wide">
            {!isCollapsed && 'Health Monitoring'}
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {healthItems.map(item => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <Link
                      href={item.url}
                      className={`flex items-center px-3 py-2 rounded-lg transition-all duration-200 ${getNavClass(
                        item.url
                      )}`}
                    >
                      <item.icon
                        className={`${
                          isCollapsed ? 'w-5 h-5' : 'w-4 h-4 mr-3'
                        }`}
                      />
                      {!isCollapsed && (
                        <span className="text-sm font-medium">
                          {item.title}
                        </span>
                      )}
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupLabel className="text-pulse-600 font-medium text-xs uppercase tracking-wide mt-6">
            {!isCollapsed && 'Activity Tracking'}
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {trackingItems.map(item => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <Link
                      href={item.url}
                      className={`flex items-center px-3 py-2 rounded-lg transition-all duration-200 ${getNavClass(
                        item.url
                      )}`}
                    >
                      <item.icon
                        className={`${
                          isCollapsed ? 'w-5 h-5' : 'w-4 h-4 mr-3'
                        }`}
                      />
                      {!isCollapsed && (
                        <span className="text-sm font-medium">
                          {item.title}
                        </span>
                      )}
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupLabel className="text-pulse-600 font-medium text-xs uppercase tracking-wide mt-6">
            {!isCollapsed && 'Account'}
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {basicItems.map(item => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <Link
                      href={item.url}
                      className={`flex items-center px-3 py-2 rounded-lg transition-all duration-200 ${getNavClass(
                        item.url
                      )}`}
                    >
                      <item.icon
                        className={`${
                          isCollapsed ? 'w-5 h-5' : 'w-4 h-4 mr-3'
                        }`}
                      />
                      {!isCollapsed && (
                        <span className="text-sm font-medium">
                          {item.title}
                        </span>
                      )}
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="border-t border-gray-200 p-4">
        {!isCollapsed && (
          <div className="text-center">
            <div className="bg-pulse-50 rounded-lg p-3">
              <p className="text-xs text-pulse-600 font-medium">
                Track your progress
              </p>
              <p className="text-xs text-gray-500 mt-1">
                Stay consistent with your health goals
              </p>
            </div>
          </div>
        )}
      </SidebarFooter>
    </Sidebar>
  )
}
