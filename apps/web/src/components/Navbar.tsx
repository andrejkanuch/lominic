import React, { useState, useEffect } from 'react'
import { cn } from '@/lib/utils'
import { Menu, X } from 'lucide-react'
import { useTranslations } from 'next-intl'
import Image from 'next/image'
import { ThemeToggle } from './ui/theme-toggle'

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const t = useTranslations('Navbar')

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
    // Prevent background scrolling when menu is open
    document.body.style.overflow = !isMenuOpen ? 'hidden' : ''
  }

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    })

    // Close mobile menu if open
    if (isMenuOpen) {
      setIsMenuOpen(false)
      document.body.style.overflow = ''
    }
  }

  return (
    <header
      className={cn(
        'fixed top-0 left-0 right-0 z-50 py-2 sm:py-3 md:py-4 transition-all duration-300',
        isScrolled
          ? 'bg-background/80 backdrop-blur-md shadow-sm'
          : 'bg-background md:bg-transparent'
      )}
    >
      <div className="container flex items-center justify-between px-4 sm:px-6 lg:px-8">
        <a
          href="#"
          className="flex items-center space-x-2"
          onClick={e => {
            e.preventDefault()
            scrollToTop()
          }}
          aria-label="Lominic"
        >
          <Image
            src="/lominic-peak.svg"
            alt="Lominic Logo"
            className="h-7 sm:h-8"
            width={100}
            height={100}
          />
        </a>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex space-x-8">
          <a
            href="#"
            className="nav-link"
            onClick={e => {
              e.preventDefault()
              scrollToTop()
            }}
          >
            {t('home')}
          </a>
          <a href="#features" className="nav-link">
            {t('features')}
          </a>
          <a href="#details" className="nav-link">
            {t('pricing')}
          </a>

          <ThemeToggle />
        </nav>

        {/* Mobile menu button - increased touch target */}
        <button
          className="md:hidden text-foreground p-3 focus:outline-none"
          onClick={toggleMenu}
          aria-label={isMenuOpen ? t('closeMenu') : t('openMenu')}
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Navigation - improved for better touch experience */}
      <div
        className={cn(
          'fixed inset-0 z-40 bg-background flex flex-col pt-16 px-6 md:hidden transition-all duration-300 ease-in-out',
          isMenuOpen
            ? 'opacity-100 translate-x-0'
            : 'opacity-0 translate-x-full pointer-events-none'
        )}
      >
        <nav className="flex flex-col space-y-8 items-center mt-8">
          <a
            href="#"
            className="text-xl font-medium py-3 px-6 w-full text-center rounded-lg hover:bg-muted transition-colors"
            onClick={e => {
              e.preventDefault()
              scrollToTop()
              setIsMenuOpen(false)
              document.body.style.overflow = ''
            }}
          >
            {t('home')}
          </a>
          <a
            href="#features"
            className="text-xl font-medium py-3 px-6 w-full text-center rounded-lg hover:bg-muted transition-colors"
            onClick={() => {
              setIsMenuOpen(false)
              document.body.style.overflow = ''
            }}
          >
            {t('features')}
          </a>
          <a
            href="#details"
            className="text-xl font-medium py-3 px-6 w-full text-center rounded-lg hover:bg-muted transition-colors"
            onClick={() => {
              setIsMenuOpen(false)
              document.body.style.overflow = ''
            }}
          >
            {t('pricing')}
          </a>
        </nav>
      </div>
    </header>
  )
}

export default Navbar
