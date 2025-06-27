'use client'
import React, { useState } from 'react'
import { SidebarProvider } from '@/components/ui/sidebar'
import { ClientSidebar } from './ClientSidebar'
import { ClientHeader } from './ClientHeader'
import { ClientFooter } from './ClientFooter'
import ClientContent from './client-content/ClientContent'

const ClientLayout = () => {
  const [activeItem, setActiveItem] = useState('/client/dashboard')

  const handleMenuItemClick = (url: string) => {
    setActiveItem(url)
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
          <main className="flex-1 p-6">
            <ClientContent activeItem={activeItem} />
          </main>
          <ClientFooter />
        </div>
      </div>
    </SidebarProvider>
  )
}

export default ClientLayout
