import { useTranslations } from 'next-intl'
import { Smartphone, Brain, Shield, TrendingUp, ArrowRight } from 'lucide-react'
import Image from 'next/image'

const OptimizedFeatures = () => {
  const t = useTranslations('OptimizedFeatures')

  const features = [
    {
      title: t('worksWithDevicesTitle'),
      description: t('worksWithDevicesDescription'),
      icon: Smartphone,
      link: '#details',
      linkText: 'View Supported Devices',
      visual: '/worksWithDevices.png',
    },
    {
      title: t('poweredByAITitle'),
      description: t('poweredByAIDescription'),
      icon: Brain,
      link: '/about-us',
      linkText: 'Learn About Our AI',
      visual: '/poweredByAI.png',
    },
    {
      title: t('yourPrivacyTitle'),
      description: t('yourPrivacyDescription'),
      icon: Shield,
      link: '#details',
      linkText: 'Privacy Policy',
      visual: '/background-section3.png',
    },
    {
      title: t('seeYourTrendsTitle'),
      description: t('seeYourTrendsDescription'),
      icon: TrendingUp,
      link: '/waitlist',
      linkText: 'Try the Demo',
      visual: '/PersonImage2.png',
    },
  ]

  return (
    <section className="py-16 bg-gray-50">
      <div className="container px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          {features.map((feature, index) => (
            <div
              key={index}
              className={`flex flex-col lg:flex-row items-center gap-8 mb-16 last:mb-0 ${
                index % 2 === 1 ? 'lg:flex-row-reverse' : ''
              }`}
            >
              {/* Visual */}
              <div className="w-full lg:w-1/2">
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-br from-orange-100 to-orange-200 rounded-2xl transform rotate-3"></div>
                  <Image
                    src={feature.visual}
                    alt={feature.title}
                    layout="responsive"
                    width={700}
                    height={400}
                    className="relative rounded-2xl shadow-lg w-full h-64 object-cover"
                  />
                </div>
              </div>

              {/* Content */}
              <div className="w-full lg:w-1/2 space-y-4">
                <div className="flex items-center gap-3">
                  <div className="p-3 bg-orange-100 rounded-xl">
                    <feature.icon className="w-6 h-6 text-orange-600" />
                  </div>
                  <h2 className="text-2xl lg:text-3xl font-bold text-gray-900">
                    {feature.title}
                  </h2>
                </div>

                <p className="text-lg text-gray-600 leading-relaxed">
                  {feature.description}
                </p>

                <a
                  href={feature.link}
                  className="inline-flex items-center gap-2 text-orange-600 font-semibold hover:text-orange-700 transition-colors"
                >
                  {feature.linkText}
                  <ArrowRight className="w-4 h-4" />
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default OptimizedFeatures
