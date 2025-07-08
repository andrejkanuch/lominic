import React, { useEffect, useRef } from 'react'
import { cn } from '@/lib/utils'
import { useTranslations } from 'next-intl'

interface FeatureCardProps {
  icon: React.ReactNode
  title: string
  description: string
  index: number
}

const FeatureCard = ({ icon, title, description, index }: FeatureCardProps) => {
  const cardRef = useRef<HTMLDivElement>(null)

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

    if (cardRef.current) {
      observer.observe(cardRef.current)
    }

    return () => {
      const currentCardRef = cardRef.current
      if (currentCardRef) {
        observer.unobserve(currentCardRef)
      }
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div
      ref={cardRef}
      className={cn(
        'feature-card glass-card opacity-0 p-4 sm:p-6',
        'lg:hover:bg-gradient-to-br lg:hover:from-background lg:hover:to-muted',
        'transition-all duration-300'
      )}
      style={{ animationDelay: `${0.1 * index}s` }}
    >
      <div className="rounded-full bg-pulse-50 w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center text-pulse-500 mb-4 sm:mb-5">
        {icon}
      </div>
      <h3 className="text-lg sm:text-xl font-semibold mb-2 sm:mb-3">{title}</h3>
      <p className="text-muted-foreground text-sm sm:text-base">
        {description}
      </p>
    </div>
  )
}

const Features = () => {
  const sectionRef = useRef<HTMLDivElement>(null)
  const t = useTranslations('Features')

  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const elements = entry.target.querySelectorAll('.fade-in-element')
            elements.forEach((el, index) => {
              setTimeout(() => {
                el.classList.add('animate-fade-in')
              }, index * 100)
            })
            observer.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.1 }
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => {
      const currentSectionRef = sectionRef.current
      if (currentSectionRef) {
        observer.unobserve(currentSectionRef)
      }
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <section
      className="py-12 sm:py-16 md:py-20 pb-0 relative bg-muted/50"
      id="features"
      ref={sectionRef}
    >
      <div className="section-container">
        <div className="text-center mb-10 sm:mb-16">
          <div className="pulse-chip mx-auto mb-3 sm:mb-4 opacity-0 fade-in-element">
            <span>{t('smartFeatures')}</span>
          </div>
          <h2 className="section-title mb-3 sm:mb-4 opacity-0 fade-in-element">
            {t('aiPoweredTrainingIntelligence')}{' '}
            <br className="hidden sm:block" />
          </h2>
          <p className="section-subtitle mx-auto opacity-0 fade-in-element">
            {t('transformWorkoutData')}
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
          <FeatureCard
            icon={
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="w-5 h-5 sm:w-6 sm:h-6"
              >
                <path d="M9 12l2 2 4-4"></path>
                <path d="M21 12c.552 0 1-.448 1-1V8c0-.552-.448-1-1-1h-4c-.552 0-1 .448-1 1v3c0 .552.448 1 1 1h4z"></path>
                <path d="M3 12c-.552 0-1-.448-1-1V8c0-.552.448-1 1-1h4c.552 0 1 .448 1 1v3c0 .552-.448 1-1 1H3z"></path>
                <path d="M9 21v-4a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v4"></path>
              </svg>
            }
            title={t('smartSummariesTitle')}
            description={t('smartSummariesDescription')}
            index={0}
          />
          <FeatureCard
            icon={
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="w-5 h-5 sm:w-6 sm:h-6"
              >
                <path d="M8 9h8"></path>
                <path d="M8 13h6"></path>
                <path d="M18 4H6a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2z"></path>
                <path d="M16 2v4"></path>
                <path d="M8 2v4"></path>
              </svg>
            }
            title={t('askQuestionsTitle')}
            description={t('askQuestionsDescription')}
            index={1}
          />
          <FeatureCard
            icon={
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="w-5 h-5 sm:w-6 sm:h-6"
              >
                <path d="M3 3v18h18"></path>
                <path d="M18.7 8l-5.1 5.2-2.8-2.7L7 14.3"></path>
              </svg>
            }
            title={t('trackProgressTitle')}
            description={t('trackProgressDescription')}
            index={2}
          />
          <FeatureCard
            icon={
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="w-5 h-5 sm:w-6 sm:h-6"
              >
                <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path>
                <circle cx="9" cy="7" r="4"></circle>
                <path d="M22 21v-2a4 4 0 0 0-3-3.87"></path>
                <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
              </svg>
            }
            title={t('compareWithFriendsTitle')}
            description={t('compareWithFriendsDescription')}
            index={3}
          />
          <FeatureCard
            icon={
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="w-5 h-5 sm:w-6 sm:h-6"
              >
                <path d="M22 12h-4l-3 9L9 3l-3 9H2"></path>
              </svg>
            }
            title={t('recoveryInsightsTitle')}
            description={t('recoveryInsightsDescription')}
            index={4}
          />
          <FeatureCard
            icon={
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="w-5 h-5 sm:w-6 sm:h-6"
              >
                <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path>
                <circle cx="12" cy="12" r="4"></circle>
              </svg>
            }
            title={t('universalCompatibilityTitle')}
            description={t('universalCompatibilityDescription')}
            index={5}
          />
        </div>
      </div>
    </section>
  )
}

export default Features
