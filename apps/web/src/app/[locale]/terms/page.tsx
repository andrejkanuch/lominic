import type { Metadata } from 'next'
import { getTranslations } from 'next-intl/server'

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: 'Terms of Service | Lominic',
    description:
      'Terms of Service for Lominic - AI-powered training insights platform. Learn about our terms, conditions, and third-party integrations.',
    robots: 'noindex, nofollow',
  }
}

export default async function TermsPage() {
  const t = await getTranslations('Terms')

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-16 max-w-4xl">
        <div className="prose prose-lg max-w-none">
          <h1 className="text-4xl font-bold mb-8">{t('title')}</h1>

          <div className="space-y-8">
            <section>
              <h2 className="text-2xl font-semibold mb-4">
                {t('lastUpdated')}
              </h2>
              <p className="text-muted-foreground">{t('lastUpdatedDate')}</p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">
                {t('introduction.title')}
              </h2>
              <p className="mb-4">{t('introduction.description')}</p>
              <p>{t('introduction.agreement')}</p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">
                {t('definitions.title')}
              </h2>
              <ul className="list-disc pl-6 space-y-2">
                <li>
                  <strong>{t('definitions.service')}</strong> -{' '}
                  {t('definitions.serviceDesc')}
                </li>
                <li>
                  <strong>{t('definitions.user')}</strong> -{' '}
                  {t('definitions.userDesc')}
                </li>
                <li>
                  <strong>{t('definitions.data')}</strong> -{' '}
                  {t('definitions.dataDesc')}
                </li>
                <li>
                  <strong>{t('definitions.content')}</strong> -{' '}
                  {t('definitions.contentDesc')}
                </li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">
                {t('acceptance.title')}
              </h2>
              <p className="mb-4">{t('acceptance.description')}</p>
              <p>{t('acceptance.continued')}</p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">
                {t('serviceDescription.title')}
              </h2>
              <p className="mb-4">{t('serviceDescription.description')}</p>

              <h3 className="text-xl font-semibold mb-3">
                {t('serviceDescription.features.title')}
              </h3>
              <ul className="list-disc pl-6 mb-4">
                <li>{t('serviceDescription.features.ai')}</li>
                <li>{t('serviceDescription.features.analysis')}</li>
                <li>{t('serviceDescription.features.insights')}</li>
                <li>{t('serviceDescription.features.tracking')}</li>
                <li>{t('serviceDescription.features.integration')}</li>
              </ul>

              <h3 className="text-xl font-semibold mb-3">
                {t('serviceDescription.availability.title')}
              </h3>
              <p>{t('serviceDescription.availability.description')}</p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">
                {t('userAccounts.title')}
              </h2>
              <p className="mb-4">{t('userAccounts.description')}</p>

              <h3 className="text-xl font-semibold mb-3">
                {t('userAccounts.registration.title')}
              </h3>
              <ul className="list-disc pl-6 mb-4">
                <li>{t('userAccounts.registration.accurate')}</li>
                <li>{t('userAccounts.registration.secure')}</li>
                <li>{t('userAccounts.registration.notify')}</li>
                <li>{t('userAccounts.registration.responsible')}</li>
              </ul>

              <h3 className="text-xl font-semibold mb-3">
                {t('userAccounts.prohibited.title')}
              </h3>
              <ul className="list-disc pl-6">
                <li>{t('userAccounts.prohibited.sharing')}</li>
                <li>{t('userAccounts.prohibited.unauthorized')}</li>
                <li>{t('userAccounts.prohibited.commercial')}</li>
                <li>{t('userAccounts.prohibited.harmful')}</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">
                {t('thirdPartyIntegrations.title')}
              </h2>
              <p className="mb-4">{t('thirdPartyIntegrations.description')}</p>

              <h3 className="text-xl font-semibold mb-3">
                {t('thirdPartyIntegrations.strava.title')}
              </h3>
              <p className="mb-3">
                {t('thirdPartyIntegrations.strava.description')}
              </p>
              <ul className="list-disc pl-6 mb-4">
                <li>{t('thirdPartyIntegrations.strava.data')}</li>
                <li>{t('thirdPartyIntegrations.strava.privacy')}</li>
                <li>{t('thirdPartyIntegrations.strava.attribution')}</li>
                <li>{t('thirdPartyIntegrations.strava.compliance')}</li>
              </ul>
              <p className="text-sm text-muted-foreground">
                {t('thirdPartyIntegrations.strava.agreement')}{' '}
                <a
                  href="https://www.strava.com/legal/api"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary hover:underline"
                >
                  {t('thirdPartyIntegrations.strava.link')}
                </a>
              </p>

              <h3 className="text-xl font-semibold mb-3">
                {t('thirdPartyIntegrations.garmin.title')}
              </h3>
              <p className="mb-3">
                {t('thirdPartyIntegrations.garmin.description')}
              </p>

              <h3 className="text-xl font-semibold mb-3">
                {t('thirdPartyIntegrations.apple.title')}
              </h3>
              <p className="mb-3">
                {t('thirdPartyIntegrations.apple.description')}
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">
                {t('dataPrivacy.title')}
              </h2>
              <p className="mb-4">{t('dataPrivacy.description')}</p>

              <h3 className="text-xl font-semibold mb-3">
                {t('dataPrivacy.collection.title')}
              </h3>
              <ul className="list-disc pl-6 mb-4">
                <li>{t('dataPrivacy.collection.account')}</li>
                <li>{t('dataPrivacy.collection.fitness')}</li>
                <li>{t('dataPrivacy.collection.usage')}</li>
                <li>{t('dataPrivacy.collection.technical')}</li>
              </ul>

              <h3 className="text-xl font-semibold mb-3">
                {t('dataPrivacy.usage.title')}
              </h3>
              <ul className="list-disc pl-6 mb-4">
                <li>{t('dataPrivacy.usage.service')}</li>
                <li>{t('dataPrivacy.usage.improvement')}</li>
                <li>{t('dataPrivacy.usage.communication')}</li>
                <li>{t('dataPrivacy.usage.legal')}</li>
              </ul>

              <h3 className="text-xl font-semibold mb-3">
                {t('dataPrivacy.sharing.title')}
              </h3>
              <p>{t('dataPrivacy.sharing.description')}</p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">
                {t('intellectualProperty.title')}
              </h2>
              <p className="mb-4">{t('intellectualProperty.description')}</p>

              <h3 className="text-xl font-semibold mb-3">
                {t('intellectualProperty.ownership.title')}
              </h3>
              <ul className="list-disc pl-6 mb-4">
                <li>{t('intellectualProperty.ownership.service')}</li>
                <li>{t('intellectualProperty.ownership.content')}</li>
                <li>{t('intellectualProperty.ownership.user')}</li>
              </ul>

              <h3 className="text-xl font-semibold mb-3">
                {t('intellectualProperty.license.title')}
              </h3>
              <p>{t('intellectualProperty.license.description')}</p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">
                {t('prohibitedUses.title')}
              </h2>
              <p className="mb-4">{t('prohibitedUses.description')}</p>

              <ul className="list-disc pl-6 mb-4">
                <li>{t('prohibitedUses.illegal')}</li>
                <li>{t('prohibitedUses.harmful')}</li>
                <li>{t('prohibitedUses.unauthorized')}</li>
                <li>{t('prohibitedUses.spam')}</li>
                <li>{t('prohibitedUses.reverse')}</li>
                <li>{t('prohibitedUses.competition')}</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">
                {t('disclaimers.title')}
              </h2>
              <p className="mb-4">{t('disclaimers.description')}</p>

              <h3 className="text-xl font-semibold mb-3">
                {t('disclaimers.warranties.title')}
              </h3>
              <p className="mb-3">{t('disclaimers.warranties.description')}</p>

              <h3 className="text-xl font-semibold mb-3">
                {t('disclaimers.accuracy.title')}
              </h3>
              <p className="mb-3">{t('disclaimers.accuracy.description')}</p>

              <h3 className="text-xl font-semibold mb-3">
                {t('disclaimers.thirdParty.title')}
              </h3>
              <p>{t('disclaimers.thirdParty.description')}</p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">
                {t('limitationOfLiability.title')}
              </h2>
              <p className="mb-4">{t('limitationOfLiability.description')}</p>
              <p>{t('limitationOfLiability.maximum')}</p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">
                {t('termination.title')}
              </h2>
              <p className="mb-4">{t('termination.description')}</p>

              <h3 className="text-xl font-semibold mb-3">
                {t('termination.grounds.title')}
              </h3>
              <ul className="list-disc pl-6 mb-4">
                <li>{t('termination.grounds.violation')}</li>
                <li>{t('termination.grounds.inactivity')}</li>
                <li>{t('termination.grounds.request')}</li>
                <li>{t('termination.grounds.discontinuation')}</li>
              </ul>

              <h3 className="text-xl font-semibold mb-3">
                {t('termination.effects.title')}
              </h3>
              <p>{t('termination.effects.description')}</p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">
                {t('governingLaw.title')}
              </h2>
              <p className="mb-4">{t('governingLaw.description')}</p>
              <p>{t('governingLaw.jurisdiction')}</p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">
                {t('changes.title')}
              </h2>
              <p className="mb-4">{t('changes.description')}</p>
              <p>{t('changes.notification')}</p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">
                {t('contact.title')}
              </h2>
              <p className="mb-4">{t('contact.description')}</p>
              <p>
                {t('contact.email')}:{' '}
                <a
                  href="mailto:legal@lominic.com"
                  className="text-primary hover:underline"
                >
                  legal@lominic.com
                </a>
              </p>
            </section>
          </div>
        </div>
      </div>
    </div>
  )
}
