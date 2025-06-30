import React from 'react'
import { useTranslations } from 'next-intl'

const ImageShowcaseSection = () => {
  const t = useTranslations('ImageShowcaseSection')
  return (
    <section className="w-full pt-0 pb-8 sm:pb-12 bg-background" id="showcase">
      <div className="container px-4 sm:px-6 lg:px-8 mx-auto">
        <div className="max-w-3xl mx-auto text-center mb-8 sm:mb-12 animate-on-scroll">
          <h2 className="text-3xl sm:text-4xl font-display font-bold tracking-tight text-foreground mb-3 sm:mb-4">
            {t('experienceAITrainingAnalysis')}
          </h2>
          <p className="text-base sm:text-lg text-muted-foreground">
            {t('description')}
          </p>
        </div>

        <div className="rounded-2xl sm:rounded-3xl overflow-hidden shadow-elegant mx-auto max-w-4xl animate-on-scroll">
          <div className="w-full">
            <img
              src="/PersonImage2.png"
              alt={t('lominicAppInterfaceAlt')}
              className="w-full h-auto object-cover"
            />
          </div>
          <div className="bg-card p-4 sm:p-8">
            <h3 className="text-xl sm:text-2xl font-display font-semibold mb-3 sm:mb-4">
              {t('smartTrainingIntelligence')}
            </h3>
            <p className="text-muted-foreground text-sm sm:text-base">
              {t('smartTrainingIntelligenceDescription')}
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}

export default ImageShowcaseSection
