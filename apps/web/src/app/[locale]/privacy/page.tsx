import type { Metadata } from 'next'
import { getTranslations } from 'next-intl/server'

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: 'Privacy Policy | Lominic',
    description:
      'Learn how Lominic collects, uses, and protects your personal data and fitness information.',
    robots: 'noindex, nofollow',
  }
}

export default async function PrivacyPage() {
  const t = await getTranslations('Privacy')

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
              <p>{t('introduction.commitment')}</p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">
                {t('dataCollection.title')}
              </h2>
              <p className="mb-4">{t('dataCollection.description')}</p>

              <h3 className="text-xl font-semibold mb-3">
                {t('dataCollection.personalData.title')}
              </h3>
              <ul className="list-disc pl-6 mb-4">
                <li>{t('dataCollection.personalData.email')}</li>
                <li>{t('dataCollection.personalData.name')}</li>
                <li>{t('dataCollection.personalData.profile')}</li>
              </ul>

              <h3 className="text-xl font-semibold mb-3">
                {t('dataCollection.fitnessData.title')}
              </h3>
              <p className="mb-3">
                {t('dataCollection.fitnessData.description')}
              </p>
              <ul className="list-disc pl-6 mb-4">
                <li>{t('dataCollection.fitnessData.workouts')}</li>
                <li>{t('dataCollection.fitnessData.heartRate')}</li>
                <li>{t('dataCollection.fitnessData.gps')}</li>
                <li>{t('dataCollection.fitnessData.device')}</li>
                <li>{t('dataCollection.fitnessData.performance')}</li>
              </ul>

              <h3 className="text-xl font-semibold mb-3">
                {t('dataCollection.thirdParty.title')}
              </h3>
              <p className="mb-3">
                {t('dataCollection.thirdParty.description')}
              </p>
              <ul className="list-disc pl-6">
                <li>
                  <strong>Garmin:</strong>{' '}
                  {t('dataCollection.thirdParty.garmin')}
                </li>
                <li>
                  <strong>Strava:</strong>{' '}
                  {t('dataCollection.thirdParty.strava')}
                </li>
                <li>
                  <strong>Apple Health:</strong>{' '}
                  {t('dataCollection.thirdParty.apple')}
                </li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">
                {t('dataUsage.title')}
              </h2>
              <p className="mb-4">{t('dataUsage.description')}</p>

              <h3 className="text-xl font-semibold mb-3">
                {t('dataUsage.purposes.title')}
              </h3>
              <ul className="list-disc pl-6 mb-4">
                <li>{t('dataUsage.purposes.insights')}</li>
                <li>{t('dataUsage.purposes.recommendations')}</li>
                <li>{t('dataUsage.purposes.trends')}</li>
                <li>{t('dataUsage.purposes.service')}</li>
                <li>{t('dataUsage.purposes.communication')}</li>
                <li>{t('dataUsage.purposes.improvement')}</li>
              </ul>

              <h3 className="text-xl font-semibold mb-3">
                {t('dataUsage.ai.title')}
              </h3>
              <p>{t('dataUsage.ai.description')}</p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">
                {t('dataSharing.title')}
              </h2>
              <p className="mb-4">{t('dataSharing.description')}</p>

              <h3 className="text-xl font-semibold mb-3">
                {t('dataSharing.when.title')}
              </h3>
              <ul className="list-disc pl-6 mb-4">
                <li>{t('dataSharing.when.consent')}</li>
                <li>{t('dataSharing.when.legal')}</li>
                <li>{t('dataSharing.when.service')}</li>
                <li>{t('dataSharing.when.protection')}</li>
              </ul>

              <h3 className="text-xl font-semibold mb-3">
                {t('dataSharing.never.title')}
              </h3>
              <p>{t('dataSharing.never.description')}</p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">
                {t('dataSecurity.title')}
              </h2>
              <p className="mb-4">{t('dataSecurity.description')}</p>

              <ul className="list-disc pl-6 mb-4">
                <li>{t('dataSecurity.encryption')}</li>
                <li>{t('dataSecurity.access')}</li>
                <li>{t('dataSecurity.monitoring')}</li>
                <li>{t('dataSecurity.compliance')}</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">
                {t('yourRights.title')}
              </h2>
              <p className="mb-4">{t('yourRights.description')}</p>

              <ul className="list-disc pl-6 mb-4">
                <li>
                  <strong>{t('yourRights.access')}</strong> -{' '}
                  {t('yourRights.accessDesc')}
                </li>
                <li>
                  <strong>{t('yourRights.correction')}</strong> -{' '}
                  {t('yourRights.correctionDesc')}
                </li>
                <li>
                  <strong>{t('yourRights.deletion')}</strong> -{' '}
                  {t('yourRights.deletionDesc')}
                </li>
                <li>
                  <strong>{t('yourRights.portability')}</strong> -{' '}
                  {t('yourRights.portabilityDesc')}
                </li>
                <li>
                  <strong>{t('yourRights.restriction')}</strong> -{' '}
                  {t('yourRights.restrictionDesc')}
                </li>
                <li>
                  <strong>{t('yourRights.objection')}</strong> -{' '}
                  {t('yourRights.objectionDesc')}
                </li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">
                {t('cookies.title')}
              </h2>
              <p className="mb-4">{t('cookies.description')}</p>

              <h3 className="text-xl font-semibold mb-3">
                {t('cookies.types.title')}
              </h3>
              <ul className="list-disc pl-6">
                <li>
                  <strong>{t('cookies.types.essential')}</strong> -{' '}
                  {t('cookies.types.essentialDesc')}
                </li>
                <li>
                  <strong>{t('cookies.types.analytics')}</strong> -{' '}
                  {t('cookies.types.analyticsDesc')}
                </li>
                <li>
                  <strong>{t('cookies.types.functional')}</strong> -{' '}
                  {t('cookies.types.functionalDesc')}
                </li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">
                {t('children.title')}
              </h2>
              <p>{t('children.description')}</p>
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

              <div className="bg-muted p-4 rounded-lg">
                <p>
                  <strong>{t('contact.email')}:</strong> privacy@lominic.com
                </p>
                <p>
                  <strong>{t('contact.address')}:</strong>
                </p>
                <p className="ml-4">
                  Lominic
                  <br />
                  [Your Business Address]
                  <br />
                  [City, State, ZIP]
                  <br />
                  United States
                </p>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  )
}
