'use client'

import { ReactNode } from 'react'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import {
  Sidebar,
  SidebarHeader,
  SidebarItem,
  SidebarItemGroup,
  SidebarFooter,
} from '@/components/ui/sidebar2'
import { Home, Dumbbell, LineChart, Settings, LogOut } from 'lucide-react'
import { usePathname } from 'next/navigation'

interface ClientLayoutProps {
  children: ReactNode
}

export default function ClientLayout({ children }: ClientLayoutProps) {
  const pathname = usePathname()

  // Determine active item based on current path
  const getActiveItem = () => {
    if (!pathname) return 'overview'
    if (pathname.includes('/training')) return 'training'
    if (pathname.includes('/stats')) return 'stats'
    if (pathname.includes('/settings')) return 'settings'
    return 'overview'
  }

  const active = getActiveItem()

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div className="flex flex-1 pt-16">
        <Sidebar className="bg-white border-r border-gray-200">
          <SidebarHeader icon={props => <Home {...props} />} />
          <SidebarItemGroup>
            <SidebarItem
              icon={props => <Home {...props} />}
              text="Overview"
              isActive={active === 'overview'}
            />
            <SidebarItem
              icon={props => <Dumbbell {...props} />}
              text="Training"
              isActive={active === 'training'}
            />
            <SidebarItem
              icon={props => <LineChart {...props} />}
              text="Stats"
              isActive={active === 'stats'}
            />
            <SidebarItem
              icon={props => <Settings {...props} />}
              text="Settings"
              isActive={active === 'settings'}
            />
          </SidebarItemGroup>
          <SidebarFooter>
            <SidebarItem
              icon={props => <LogOut {...props} />}
              text="Sign Out"
              onClick={() => console.log('Sign out')}
            />
          </SidebarFooter>
        </Sidebar>
        <div className="flex-1 bg-gray-50 transition-all">
          <div className="max-w-4xl mx-auto">{children}</div>
        </div>
      </div>
      <Footer />
    </div>
  )
}
