import React, { useEffect, useRef, useState } from 'react'
import { useTranslations } from 'next-intl'
import { ChevronDown, ChevronUp } from 'lucide-react'

interface FAQItemProps {
  question: string
  answer: string
  isOpen: boolean
  onToggle: () => void
}

const FAQItem = ({ question, answer, isOpen, onToggle }: FAQItemProps) => {
  return (
    <div className="border-b border-gray-200 last:border-b-0">
      <button
        className="flex justify-between items-center w-full py-4 text-left focus:outline-none"
        onClick={onToggle}
      >
        <span className="font-medium text-gray-900">{question}</span>
        {isOpen ? (
          <ChevronUp className="w-5 h-5 text-gray-500" />
        ) : (
          <ChevronDown className="w-5 h-5 text-gray-500" />
        )}
      </button>
      {isOpen && (
        <div className="pb-4">
          <p className="text-gray-600">{answer}</p>
        </div>
      )}
    </div>
  )
}

const GarminFAQ = () => {
  const sectionRef = useRef<HTMLDivElement>(null)
  const [openItems, setOpenItems] = useState<number[]>([])
  const t = useTranslations('GarminFAQ')

  const toggleItem = (index: number) => {
    setOpenItems(prev =>
      prev.includes(index) ? prev.filter(i => i !== index) : [...prev, index]
    )
  }

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

  const faqItems = [
    {
      question: t('q1'),
      answer: t('a1'),
    },
    {
      question: t('q2'),
      answer: t('a2'),
    },
    {
      question: t('q3'),
      answer: t('a3'),
    },
    {
      question: t('q4'),
      answer: t('a4'),
    },
    {
      question: t('q5'),
      answer: t('a5'),
    },
  ]

  return (
    <section
      className="py-12 sm:py-16 md:py-20 relative bg-gray-50"
      id="garmin-faq"
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

        <div className="max-w-3xl mx-auto">
          <div className="bg-white rounded-2xl shadow-lg p-6 md:p-8">
            {faqItems.map((item, index) => (
              <FAQItem
                key={index}
                question={item.question}
                answer={item.answer}
                isOpen={openItems.includes(index)}
                onToggle={() => toggleItem(index)}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default GarminFAQ
