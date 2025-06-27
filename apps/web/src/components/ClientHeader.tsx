import React from 'react'
import { Bell, Search, User } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { SidebarTrigger } from '@/components/ui/sidebar'

export function ClientHeader() {
  return (
    <header className="bg-white border-b border-gray-200 px-6 py-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <SidebarTrigger className="text-gray-600 hover:text-pulse-600" />
          <div>
            <h1 className="text-xl font-semibold text-gray-900">
              Welcome back!
            </h1>
            <p className="text-sm text-gray-500">
              Track your health and wellness journey
            </p>
          </div>
        </div>

        <div className="flex items-center space-x-4">
          {/* Search */}
          <div className="relative hidden md:block">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Search activities, metrics..."
              className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pulse-500 focus:border-transparent bg-gray-50 text-sm w-64"
            />
          </div>

          {/* Notifications */}
          <Button variant="ghost" size="icon-base" className="relative">
            <Bell className="w-5 h-5 text-gray-600" />
            <span className="absolute -top-1 -right-1 w-3 h-3 bg-pulse-500 rounded-full text-xs"></span>
          </Button>

          {/* Profile */}
          <Button variant="ghost" size="icon-base" className="relative">
            <div className="w-8 h-8 bg-pulse-100 rounded-full flex items-center justify-center">
              <User className="w-4 h-4 text-pulse-600" />
            </div>
          </Button>
        </div>
      </div>
    </header>
  )
}
