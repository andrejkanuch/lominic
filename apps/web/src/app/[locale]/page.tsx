'use client'

import React, { useEffect } from 'react'
import Hero from '../../components/Hero'
import OptimizedFeatures from '../../components/OptimizedFeatures'
import HumanoidSection from '../../components/HumanoidSection'
import SpecsSection from '../../components/SpecsSection'
import DetailsSection from '../../components/DetailsSection'
import ImageShowcaseSection from '../../components/ImageShowcaseSection'
import Features from '../../components/Features'
import GarminIntegration from '../../components/GarminIntegration'
import GarminFAQ from '../../components/GarminFAQ'

export default function HomePage() {
  // Initialize intersection observer to detect when elements enter viewport
  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-fade-in')
            observer.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.1 }
    )

    const elements = document.querySelectorAll('.animate-on-scroll')
    elements.forEach(el => observer.observe(el))

    return () => {
      elements.forEach(el => observer.unobserve(el))
    }
  }, [])

  useEffect(() => {
    // This helps ensure smooth scrolling for the anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', (e: Event) => {
        e.preventDefault()

        const targetId = (e.currentTarget as HTMLAnchorElement)
          .getAttribute('href')
          ?.substring(1)
        if (!targetId) return

        const targetElement = document.getElementById(targetId)
        if (!targetElement) return

        // Increased offset to account for mobile nav
        const offset = window.innerWidth < 768 ? 100 : 80

        window.scrollTo({
          top: targetElement.offsetTop - offset,
          behavior: 'smooth',
        })
      })
    })
  }, [])

  return (
    <div className="min-h-screen bg-background text-foreground transition-colors duration-200">
      <main className="space-y-4 sm:space-y-8">
        <Hero />
        <OptimizedFeatures />
        <HumanoidSection />
        <SpecsSection />
        <DetailsSection />
        <ImageShowcaseSection />
        <Features />
        <GarminIntegration />
        <GarminFAQ />
        {/* <Testimonials /> */}
        {/* <Newsletter /> */}
        {/* <MadeByHumans /> */}
      </main>
    </div>
  )
}
