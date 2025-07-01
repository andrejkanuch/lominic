'use client'
import React, { useState } from 'react'
import { SidebarProvider } from '@/components/ui/sidebar'
import { ClientSidebar } from '@/components/ClientSidebar'
import { ClientHeader } from '@/components/ClientHeader'
import { ClientFooter } from '@/components/ClientFooter'
import DashboardContent from '@/components/client-content/DashboardContent'
import HealthMetricsContent from '@/components/client-content/HealthMetricsContent'
import VitalSignsContent from '@/components/client-content/VitalSignsContent'
import HeartRateContent from '@/components/client-content/HeartRateContent'
import ActivitiesContent from '@/components/client-content/ActivitiesContent'
import WorkoutsContent from '@/components/client-content/WorkoutsContent'
import GoalsContent from '@/components/client-content/GoalsContent'
import LocationContent from '@/components/client-content/LocationContent'
import CalendarContent from '@/components/client-content/CalendarContent'
import ProfileContent from '@/components/client-content/ProfileContent'
import SettingsContent from '@/components/client-content/SettingsContent'

export default function ClientLayout() {
  const [activeItem, setActiveItem] = useState('/client/dashboard')

  const handleMenuItemClick = (url: string) => {
    setActiveItem(url)
  }

  const renderContent = () => {
    switch (activeItem) {
      case '/client/dashboard':
        return <DashboardContent />
      case '/client/health':
        return <HealthMetricsContent />
      case '/client/vitals':
        return <VitalSignsContent />
      case '/client/heart-rate':
        return <HeartRateContent />
      case '/client/activities':
        return <ActivitiesContent />
      case '/client/workouts':
        return <WorkoutsContent />
      case '/client/goals':
        return <GoalsContent />
      case '/client/location':
        return <LocationContent />
      case '/client/calendar':
        return <CalendarContent />
      case '/client/profile':
        return <ProfileContent />
      case '/client/settings':
        return <SettingsContent />
      default:
        return <DashboardContent />
    }
  }

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-background">
        <ClientSidebar
          onMenuItemClick={handleMenuItemClick}
          activeItem={activeItem}
        />
        <div className="flex-1 flex flex-col">
          <ClientHeader />
          <main className="flex-1 p-6">{renderContent()}</main>
          <ClientFooter />
        </div>
      </div>
    </SidebarProvider>
  )
}
