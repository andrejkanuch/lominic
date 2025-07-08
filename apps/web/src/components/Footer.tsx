import React from 'react'
import { useTranslations } from 'next-intl'
import Link from 'next/link'
import { StravaApiLogo } from '@/components/ui/strava-api-logo'

const Footer = () => {
  const t = useTranslations('Footer')
  return (
    <footer className="w-full bg-background py-0 border-t border-border">
      <div className="section-container">
        <div className="flex flex-col sm:flex-row justify-center items-center gap-4 py-4">
          <p className="text-center text-muted-foreground text-sm">
            {t('copyright')}
          </p>
          <div className="flex gap-4">
            <Link
              href="/privacy"
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              {t('privacy')}
            </Link>
            <Link
              href="/terms"
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              {t('terms')}
            </Link>
          </div>
        </div>
        <div className="flex justify-center py-2 border-t border-border">
          <StravaApiLogo
            type="powered"
            variant="horizontal"
            color="black"
            size="1x"
          />
        </div>
      </div>
    </footer>
  )
}
export default Footer
