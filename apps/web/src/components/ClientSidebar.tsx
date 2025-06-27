'use client'
import React from 'react'

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

interface ClientSidebarProps {
  onMenuItemClick: (url: string) => void
  activeItem: string
}

const healthItems = [
  {
    title: 'Dashboard',
    url: '/client/dashboard',
    icon: Monitor,
    disabled: false,
    comingSoon: false,
  },
  {
    title: 'Health Metrics',
    url: '/client/health',
    icon: HeartPulse,
    disabled: true,
    comingSoon: true,
  },
  {
    title: 'Vital Signs',
    url: '/client/vitals',
    icon: Thermometer,
    disabled: true,
    comingSoon: true,
  },
  {
    title: 'Heart Rate',
    url: '/client/heart-rate',
    icon: Heart,
    disabled: true,
    comingSoon: true,
  },
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

export function ClientSidebar({
  onMenuItemClick,
  activeItem,
}: ClientSidebarProps) {
  const { state } = useSidebar()
  const isCollapsed = state === 'collapsed'

  const isActive = (path: string) => {
    return activeItem === path
  }

  const getNavClass = (path: string, isDisabled?: boolean) =>
    isActive(path)
      ? 'bg-primary/10 text-primary border-r-2 border-primary'
      : isDisabled
      ? 'text-muted-foreground'
      : 'text-foreground hover:bg-muted hover:text-foreground hover:scale-[1.02] active:scale-[0.98]'

  return (
    <Sidebar
      className={`border-r border-border bg-background ${
        isCollapsed ? 'w-16' : 'w-64'
      }`}
    >
      <SidebarHeader className="border-b border-border p-4">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
            <Activity className="w-5 h-5 text-primary-foreground" />
          </div>
          {!isCollapsed && (
            <div>
              <h2 className="font-semibold text-foreground">Health Hub</h2>
              <p className="text-xs text-muted-foreground">
                Your wellness companion
              </p>
            </div>
          )}
        </div>
      </SidebarHeader>

      <SidebarContent className="p-2">
        <SidebarGroup>
          <SidebarGroupLabel className="text-primary font-medium text-xs uppercase tracking-wide">
            {!isCollapsed && 'Health Monitoring'}
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {healthItems.map(item => (
                <SidebarMenuItem key={item.title} disabled={item.disabled}>
                  <SidebarMenuButton
                    onClick={() => !item.disabled && onMenuItemClick(item.url)}
                    className={`flex items-center px-3 py-2 rounded-lg transition-all duration-200 ${
                      item.disabled
                        ? 'text-muted-foreground cursor-not-allowed'
                        : getNavClass(item.url, item.disabled)
                    }`}
                    aria-disabled={item.disabled}
                    tabIndex={item.disabled ? -1 : undefined}
                  >
                    <item.icon
                      className={`${isCollapsed ? 'w-5 h-5' : 'w-4 h-4 mr-3'}`}
                    />
                    {!isCollapsed && (
                      <span className="text-sm font-medium">{item.title}</span>
                    )}
                    {item.comingSoon && !isCollapsed && (
                      <span className="ml-auto px-2 py-0.5 text-xs font-semibold rounded-full bg-info/10 text-info">
                        Soon
                      </span>
                    )}
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupLabel className="text-primary font-medium text-xs uppercase tracking-wide mt-6">
            {!isCollapsed && 'Activity Tracking'}
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {trackingItems.map(item => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton
                    onClick={() => onMenuItemClick(item.url)}
                    className={`flex items-center px-3 py-2 rounded-lg transition-all duration-200 ${getNavClass(
                      item.url
                    )}`}
                  >
                    <item.icon
                      className={`${isCollapsed ? 'w-5 h-5' : 'w-4 h-4 mr-3'}`}
                    />
                    {!isCollapsed && (
                      <span className="text-sm font-medium">{item.title}</span>
                    )}
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupLabel className="text-primary font-medium text-xs uppercase tracking-wide mt-6">
            {!isCollapsed && 'Account'}
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {basicItems.map(item => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton
                    onClick={() => onMenuItemClick(item.url)}
                    className={`flex items-center px-3 py-2 rounded-lg transition-all duration-200 ${getNavClass(
                      item.url
                    )}`}
                  >
                    <item.icon
                      className={`${isCollapsed ? 'w-5 h-5' : 'w-4 h-4 mr-3'}`}
                    />
                    {!isCollapsed && (
                      <span className="text-sm font-medium">{item.title}</span>
                    )}
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="border-t border-border p-4">
        {!isCollapsed && (
          <div className="text-center">
            <div className="bg-muted rounded-lg p-3">
              <p className="text-xs text-primary font-medium">
                Track your progress
              </p>
              <p className="text-xs text-muted-foreground mt-1">
                Stay consistent with your health goals
              </p>
            </div>
          </div>
        )}
      </SidebarFooter>
    </Sidebar>
  )
}
