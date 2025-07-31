import React, { useEffect, useRef } from 'react'
import { useTranslations } from 'next-intl'
import { CheckCircle, Smartphone, Watch, Zap } from 'lucide-react'

const GarminIntegration = () => {
  const sectionRef = useRef<HTMLDivElement>(null)
  const t = useTranslations('GarminIntegration')

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
  }, [])

  const benefits = [
    {
      icon: <Watch className="w-6 h-6" />,
      title: t('allDevices'),
      description: t('allDevicesDesc'),
    },
    {
      icon: <Zap className="w-6 h-6" />,
      title: t('directImport'),
      description: t('directImportDesc'),
    },
    {
      icon: <CheckCircle className="w-6 h-6" />,
      title: t('advancedMetrics'),
      description: t('advancedMetricsDesc'),
    },
    {
      icon: <Smartphone className="w-6 h-6" />,
      title: t('betterThanConnect'),
      description: t('betterThanConnectDesc'),
    },
  ]

  return (
    <section
      className="py-12 sm:py-16 md:py-20 relative bg-gradient-to-br from-blue-50 to-indigo-50"
      id="garmin-integration"
      ref={sectionRef}
    >
      <div className="section-container">
        <div className="text-center mb-10 sm:mb-16">
          <div className="pulse-chip mx-auto mb-3 sm:mb-4 opacity-0 fade-in-element">
            <span>{t('title')}</span>
          </div>
          <h2 className="section-title mb-3 sm:mb-4 opacity-0 fade-in-element">
            {t('subtitle')}
          </h2>
          <p className="section-subtitle mx-auto opacity-0 fade-in-element">
            {t('description')}
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {benefits.map((benefit, index) => (
            <div
              key={index}
              className="feature-card glass-card opacity-0 fade-in-element p-6 text-center"
              style={{ animationDelay: `${0.1 * index}s` }}
            >
              <div className="rounded-full bg-blue-100 w-12 h-12 flex items-center justify-center text-blue-600 mb-4 mx-auto">
                {benefit.icon}
              </div>
              <h3 className="text-lg font-semibold mb-2">{benefit.title}</h3>
              <p className="text-muted-foreground text-sm">
                {benefit.description}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center opacity-0 fade-in-element">
          <div className="bg-white rounded-2xl p-6 md:p-8 shadow-lg max-w-4xl mx-auto">
            <h3 className="text-xl font-semibold mb-4">
              {t('beforeAfterTitle')}
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="text-left">
                <h4 className="font-semibold text-red-600 mb-2">
                  {t('beforeTitle')}
                </h4>
                <ul className="space-y-2 text-sm text-gray-600">
                  {t.raw('beforeItems').map((item: string, index: number) => (
                    <li key={index}>• {item}</li>
                  ))}
                </ul>
              </div>
              <div className="text-left">
                <h4 className="font-semibold text-green-600 mb-2">
                  {t('afterTitle')}
                </h4>
                <ul className="space-y-2 text-sm text-gray-600">
                  {t.raw('afterItems').map((item: string, index: number) => (
                    <li key={index}>• {item}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default GarminIntegration
