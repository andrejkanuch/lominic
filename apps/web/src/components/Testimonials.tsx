import React, { useRef } from 'react'
import { useTranslations } from 'next-intl'

interface TestimonialProps {
  content: string
  author: string
  role: string
  gradient: string
  backgroundImage?: string
}

const TestimonialCard = ({
  content,
  author,
  role,
  backgroundImage = '/background-section1.png',
}: TestimonialProps) => {
  return (
    <div
      className="bg-cover bg-center rounded-lg p-8 h-full flex flex-col justify-between text-white transform transition-transform duration-300 hover:-translate-y-2 relative overflow-hidden"
      style={{
        backgroundImage: `url('${backgroundImage}')`,
      }}
    >
      <div className="relative z-0">
        <p className="text-xl mb-8 font-medium leading-relaxed">{`"${content}"`}</p>
        <div>
          <h4 className="font-semibold text-xl">{author}</h4>
          <p className="text-white/80">{role}</p>
        </div>
      </div>
    </div>
  )
}

const Testimonials = () => {
  const sectionRef = useRef<HTMLDivElement>(null)
  const t = useTranslations('Testimonials')

  const testimonials: TestimonialProps[] = [
    {
      content: t('testimonial1Content'),
      author: t('testimonial1Author'),
      role: t('testimonial1Role'),
      gradient: 'from-blue-700 via-indigo-800 to-purple-900',
      backgroundImage: '/background-section1.png',
    },
    {
      content: t('testimonial2Content'),
      author: t('testimonial2Author'),
      role: t('testimonial2Role'),
      gradient: 'from-indigo-900 via-purple-800 to-orange-500',
      backgroundImage: '/background-section2.png',
    },
    {
      content: t('testimonial3Content'),
      author: t('testimonial3Author'),
      role: t('testimonial3Role'),
      gradient: 'from-purple-800 via-pink-700 to-red-500',
      backgroundImage: '/background-section3.png',
    },
    {
      content: t('testimonial4Content'),
      author: t('testimonial4Author'),
      role: t('testimonial4Role'),
      gradient: 'from-orange-600 via-red-500 to-purple-600',
      backgroundImage: '/background-section1.png',
    },
  ]

  return (
    <section
      className="py-12 bg-background relative"
      id="testimonials"
      ref={sectionRef}
    >
      {' '}
      {/* Reduced from py-20 */}
      <div className="section-container opacity-0 animate-on-scroll">
        <div className="flex items-center gap-4 mb-6">
          <div className="pulse-chip">
            <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-pulse-500 text-white mr-2">
              04
            </span>
            <span>{t('testimonials')}</span>
          </div>
        </div>

        <h2 className="text-5xl font-display font-bold mb-12 text-left">
          {t('whatOthersSay')}
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {testimonials.map((testimonial, index) => (
            <TestimonialCard
              key={index}
              content={testimonial.content}
              author={testimonial.author}
              role={testimonial.role}
              gradient={testimonial.gradient}
              backgroundImage={testimonial.backgroundImage}
            />
          ))}
        </div>
      </div>
    </section>
  )
}

export default Testimonials
