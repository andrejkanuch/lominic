import React, { useState } from 'react'
import { toast } from 'sonner'
import emailjs from '@emailjs/browser'
import { Input } from './ui/input/input'
import { Button } from './ui/button'
import { useTranslations } from 'next-intl'

const Newsletter = () => {
  const [email, setEmail] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const t = useTranslations('Newsletter')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email) {
      toast.error(t('validationError'))
      return
    }
    setIsSubmitting(true)

    try {
      // EmailJS configuration
      const serviceId = 'service_1gwbvdo'
      const templateId = 'template_r214m0u'
      const publicKey = 'cHbnoKhUoDc1u4QcA'

      const templateParams = {
        to_email: 'kanuchandrej@gmail.com',
        subject: 'lomatic - Newsletter Subscription',
        full_name: 'Newsletter Subscriber',
        email: email,
        sport_activity: 'Newsletter',
        message: `New Newsletter Subscription Request\n\nEmail: ${email}\nType: Newsletter Subscription\n\n---\nThis newsletter subscription was submitted from the Lominic website.`,
      }

      await emailjs.send(serviceId, templateId, templateParams, publicKey)

      toast.success(t('successMessage'))
      setEmail('')
    } catch (error) {
      console.error('Email sending failed:', error)
      toast.error(t('errorMessage'))
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <section id="newsletter" className="bg-background py-0">
      <div className="section-container opacity-0 animate-on-scroll">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center gap-4 mb-6">
            <div className="pulse-chip">
              <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-pulse-500 text-white mr-2">
                05
              </span>
              <span>{t('newsletter')}</span>
            </div>
          </div>

          <h2 className="text-5xl font-display font-bold mb-4 text-left">
            {t('subscribeToNewsletter')}
          </h2>
          <p className="text-xl text-muted-foreground mb-10 text-left">
            {t('newsletterDescription')}
          </p>

          <form
            onSubmit={handleSubmit}
            className="flex flex-col md:flex-row gap-4 items-start md:items-center"
          >
            <div className="relative flex-grow">
              <Input
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder={t('emailAddress')}
                required
              />
            </div>
            <Button
              type="submit"
              disabled={isSubmitting}
              className="bg-pulse-500 hover:bg-pulse-600 text-white font-medium py-4 px-10 rounded-full transition-all duration-300 md:ml-4"
            >
              {isSubmitting ? t('submitting') : t('submit')}
            </Button>
          </form>
        </div>
      </div>
    </section>
  )
}

export default Newsletter
