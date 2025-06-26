'use client'

import { ReactNode } from 'react'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import {
  Sidebar,
  SidebarHeader,
  SidebarItem,
  SidebarItemGroup,
  SidebarCollapsibleItemGroup,
  SidebarCollapsibleItemGroupTrigger,
  SidebarCollapsibleItemGroupContent,
  SidebarFooter,
} from '@/components/ui/sidebar2'
import {
  User,
  Settings,
  CreditCard,
  Shield,
  Bell,
  HelpCircle,
  LogOut,
  Home,
} from 'lucide-react'
import { usePathname } from 'next/navigation'

interface ProfileLayoutProps {
  children: ReactNode
}

export default function ProfileLayout({ children }: ProfileLayoutProps) {
  const pathname = usePathname()

  // Determine active item based on current path
  const getActiveItem = () => {
    if (!pathname) return 'profile'
    if (pathname.includes('/settings')) return 'settings'
    if (pathname.includes('/billing')) return 'billing'
    if (pathname.includes('/security')) return 'security'
    if (pathname.includes('/notifications')) return 'notifications'
    return 'profile'
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
              icon={props => <User {...props} />}
              text="Profile"
              isActive={active === 'profile'}
            />
            <SidebarItem
              icon={props => <Settings {...props} />}
              text="Settings"
              isActive={active === 'settings'}
            />
            <SidebarItem
              icon={props => <CreditCard {...props} />}
              text="Billing"
              isActive={active === 'billing'}
            />
          </SidebarItemGroup>

          <SidebarCollapsibleItemGroup value="preferences" type="single">
            <SidebarCollapsibleItemGroupTrigger
              icon={props => <Bell {...props} />}
            >
              <span>Preferences</span>
            </SidebarCollapsibleItemGroupTrigger>
            <SidebarCollapsibleItemGroupContent>
              <SidebarItem
                icon={props => <Bell {...props} />}
                text="Notifications"
                isActive={active === 'notifications'}
              />
              <SidebarItem
                icon={props => <Shield {...props} />}
                text="Security"
                isActive={active === 'security'}
              />
            </SidebarCollapsibleItemGroupContent>
          </SidebarCollapsibleItemGroup>

          <SidebarItemGroup>
            <SidebarItem
              icon={props => <HelpCircle {...props} />}
              text="Help & Support"
              onClick={() => window.open('/help', '_blank')}
            />
          </SidebarItemGroup>

          <SidebarFooter>
            <SidebarItem
              icon={props => <LogOut {...props} />}
              text="Sign Out"
              onClick={() => {
                // Handle sign out logic here
                console.log('Sign out clicked')
              }}
            />
          </SidebarFooter>
        </Sidebar>

        <div className="flex-1 bg-gray-50">
          <div className="max-w-4xl mx-auto">{children}</div>
        </div>
      </div>
      <Footer />
    </div>
  )
}
