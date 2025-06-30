import React from 'react'
import { useTranslations } from 'next-intl'

const Footer = () => {
  const t = useTranslations('Footer')
  return (
    <footer className="w-full bg-background py-0 border-t border-border">
      <div className="section-container">
        <p className="text-center text-muted-foreground text-sm">
          {t('copyright')}
        </p>
      </div>
    </footer>
  )
}
export default Footer
