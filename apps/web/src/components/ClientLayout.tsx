import React from 'react'
import { SidebarProvider } from '@/components/ui/sidebar'
import { ClientSidebar } from './ClientSidebar'
import { ClientHeader } from './ClientHeader'
import { ClientFooter } from './ClientFooter'

interface ClientLayoutProps {
  children: React.ReactNode
}

const ClientLayout = ({ children }: ClientLayoutProps) => {
  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-background">
        <ClientSidebar />
        <div className="flex-1 flex flex-col">
          <ClientHeader />
          <main className="flex-1 p-6">{children}</main>
          <ClientFooter />
        </div>
      </div>
    </SidebarProvider>
  )
}

export default ClientLayout
