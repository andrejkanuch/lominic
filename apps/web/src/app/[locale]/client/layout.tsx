'use client'
import React, { useEffect, useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
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
  const router = useRouter()
  const searchParams = useSearchParams()
  const [activeItem, setActiveItem] = useState('/client/activities')

  // Read active tab from URL on mount and when URL changes
  useEffect(() => {
    if (searchParams) {
      const tab = searchParams.get('tab')
      if (tab) {
        setActiveItem(`/client/${tab}`)
      } else {
        // Set default to activities if no tab in URL
        setActiveItem('/client/activities')
      }
    } else {
      // Set default to activities if no searchParams
      setActiveItem('/client/activities')
    }
  }, [searchParams])

  const handleMenuItemClick = (url: string) => {
    const tab = url.replace('/client/', '')
    setActiveItem(url)

    // Update URL with the selected tab
    const params = new URLSearchParams(searchParams || '')
    params.set('tab', tab)
    router.push(`?${params.toString()}`, { scroll: false })
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
        return <ActivitiesContent />
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
