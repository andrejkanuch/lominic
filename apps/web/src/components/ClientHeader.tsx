import React from 'react'
import { User, LogOut } from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { SidebarTrigger } from '@/components/ui/sidebar'
import { ThemeToggle } from '@/components/ui/theme-toggle'
import { logout } from '@/lib/apollo-client'
import { useRBAC } from '@/hooks/use-rbac'
import { StravaApiLogo } from '@/components/ui/strava-api-logo'

export function ClientHeader() {
  const { user } = useRBAC()

  const handleLogout = () => {
    logout()
  }

  return (
    <header className="bg-background border-b border-border px-6 py-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <SidebarTrigger className="text-muted-foreground hover:text-pulse-600" />
          <div>
            <h1 className="text-xl font-semibold text-foreground">
              Welcome back{user?.firstName ? `, ${user.firstName}` : ''}!
            </h1>
            <p className="text-sm text-muted-foreground">
              Track your health and wellness journey
            </p>
          </div>
        </div>

        <div className="flex items-center space-x-4">
          {/* Strava API Logo */}
          <StravaApiLogo
            type="powered"
            variant="horizontal"
            color="black"
            size="1x"
            height={20}
          />

          {/* Search */}
          {/* <div className="relative hidden md:block">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
            <input
              type="text"
              placeholder="Search activities, metrics..."
              className="pl-10 pr-4 py-2 border border-border rounded-lg focus:ring-2 focus:ring-pulse-500 focus:border-transparent bg-muted text-sm w-64 text-foreground placeholder:text-muted-foreground"
            />
          </div> */}

          {/* Theme Toggle */}
          <ThemeToggle />

          {/* Notifications */}
          {/* <Button variant="ghost" size="icon-base" className="relative">
            <Bell className="w-5 h-5 text-muted-foreground" />
            <span className="absolute -top-1 -right-1 w-3 h-3 bg-pulse-500 rounded-full text-xs"></span>
          </Button> */}

          {/* Profile Dropdown */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon-base" className="relative">
                <div className="w-8 h-8 bg-pulse-100 rounded-full flex items-center justify-center">
                  <User className="w-4 h-4 text-pulse-600" />
                </div>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <div className="flex items-center justify-start gap-2 p-2">
                <div className="flex flex-col space-y-1 leading-none">
                  {user && (
                    <>
                      <p className="font-medium">
                        {user.firstName} {user.lastName}
                      </p>
                      <p className="w-[200px] truncate text-sm text-muted-foreground">
                        {user.email}
                      </p>
                    </>
                  )}
                </div>
              </div>
              <DropdownMenuSeparator />
              {/* <DropdownMenuItem>
                <Settings className="mr-2 h-4 w-4" />
                <span>Settings</span>
              </DropdownMenuItem> */}
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={handleLogout}>
                <LogOut className="mr-2 h-4 w-4" />
                <span>Log out</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  )
}
