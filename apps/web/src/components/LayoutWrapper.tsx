'use client'

import { usePathname } from 'next/navigation'
import NavbarWrapper from './NavbarWrapper'
import Footer from './Footer'

interface LayoutWrapperProps {
  children: React.ReactNode
}

export default function LayoutWrapper({ children }: LayoutWrapperProps) {
  const pathname = usePathname()
  const isClientPage =
    pathname?.startsWith('/client') || pathname?.includes('/client')

  return (
    <>
      {!isClientPage && <NavbarWrapper />}
      {children}
      {!isClientPage && <Footer />}
    </>
  )
}
