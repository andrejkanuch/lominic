import React from 'react'
import { useTranslations } from 'next-intl'
import Link from 'next/link'

const Footer = () => {
  const t = useTranslations('Footer')
  return (
    <footer className="w-full bg-background py-0 border-t border-border">
      <div className="section-container">
        <div className="flex flex-col sm:flex-row justify-center items-center gap-4 py-4">
          <p className="text-center text-muted-foreground text-sm">
            {t('copyright')}
          </p>
          <Link
            href="/privacy"
            className="text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            {t('privacy')}
          </Link>
        </div>
      </div>
    </footer>
  )
}
export default Footer
