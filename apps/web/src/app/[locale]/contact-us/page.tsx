'use client'

import React, { useState, useEffect } from 'react'
import { toast } from 'sonner'
import emailjs from '@emailjs/browser'
import { useTranslations } from 'next-intl'
import { ArrowRight, Mail, MessageCircle } from 'lucide-react'

const ContactUs = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    company: '',
    message: '',
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const t = useTranslations('ContactUs')

  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-fade-in')
            observer.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.1 }
    )

    const elements = document.querySelectorAll('.animate-on-scroll')
    elements.forEach(el => observer.observe(el))

    return () => {
      elements.forEach(el => observer.unobserve(el))
    }
  }, [])

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    // Simple validation
    if (!formData.fullName || !formData.email || !formData.message) {
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
        subject: 'lomatic',
        full_name: formData.fullName,
        email: formData.email,
        sport_activity: formData.company || 'Not specified',
        message: `New Contact Form Submission

Full Name: ${formData.fullName}
Email: ${formData.email}
Company/Organization: ${formData.company || 'Not specified'}

Message:
${formData.message}

---
This message was submitted from the Lominic contact page.`,
      }

      await emailjs.send(serviceId, templateId, templateParams, publicKey)

      toast.success(t('successMessage'))

      // Reset form
      setFormData({
        fullName: '',
        email: '',
        company: '',
        message: '',
      })
    } catch (error) {
      console.error('Email sending failed:', error)
      toast.error(t('errorMessage'))
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen bg-background">
      <main className="space-y-4 sm:space-y-8">
        {/* Hero Section */}
        <section
          className="overflow-hidden relative bg-cover"
          style={{
            backgroundImage: 'url("/background-section1.png")',
            backgroundPosition: 'center 30%',
            padding: '120px 20px 60px',
          }}
        >
          <div className="absolute -top-[10%] -right-[5%] w-1/2 h-[70%] bg-pulse-gradient opacity-20 blur-3xl rounded-full"></div>

          <div className="container px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-4xl mx-auto">
              <div
                className="pulse-chip mb-6 opacity-0 animate-fade-in"
                style={{ animationDelay: '0.1s' }}
              >
                <MessageCircle className="w-4 h-4 mr-2" />
                <span>{t('getInTouch')}</span>
              </div>

              <h1
                className="section-title text-4xl sm:text-5xl lg:text-6xl leading-tight opacity-0 animate-fade-in text-white"
                style={{ animationDelay: '0.3s' }}
              >
                {t('letsTalkTraining')}
              </h1>

              <p
                className="section-subtitle mt-6 mb-8 opacity-0 animate-fade-in text-white"
                style={{ animationDelay: '0.5s' }}
              >
                {t('heroDescription')}
              </p>
            </div>
          </div>
        </section>

        {/* Contact Info Section */}
        <section className="section-container">
          <div className="text-center mb-12">
            <h2 className="section-title text-3xl lg:text-4xl mb-6 text-foreground">
              {t('howToReachUs')}
            </h2>
            <p className="text-muted-foreground mb-8 leading-relaxed">
              {t('reachUsDescription')}
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="feature-card bg-card rounded-2xl p-6 shadow-lg animate-on-scroll border border-border">
              <div className="w-12 h-12 bg-pulse-100 rounded-full flex items-center justify-center mb-4">
                <Mail className="w-6 h-6 text-pulse-600" />
              </div>
              <h3 className="text-xl font-semibold mb-3 text-foreground">
                {t('emailUs')}
              </h3>
              <p className="text-muted-foreground mb-4">
                {t('emailUsDescription')}
              </p>
              <a
                href="mailto:kanuchandrej@gmail.com"
                className="text-pulse-600 hover:text-pulse-700 font-medium"
              >
                kanuchandrej@gmail.com
              </a>
            </div>

            <div className="feature-card bg-card rounded-2xl p-6 shadow-lg animate-on-scroll border border-border">
              <div className="w-12 h-12 bg-pulse-100 rounded-full flex items-center justify-center mb-4">
                <MessageCircle className="w-6 h-6 text-pulse-600" />
              </div>
              <h3 className="text-xl font-semibold mb-3 text-foreground">
                {t('feedback')}
              </h3>
              <p className="text-muted-foreground mb-4">
                {t('feedbackDescription')}
              </p>
              <span className="text-pulse-600 font-medium">
                {t('weReadEveryMessage')}
              </span>
            </div>

            {/* <div className="feature-card bg-white rounded-2xl p-6 shadow-lg animate-on-scroll">
              <div className="w-12 h-12 bg-pulse-100 rounded-full flex items-center justify-center mb-4">
                <MapPin className="w-6 h-6 text-pulse-600" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Based in Slovakia</h3>
              <p className="text-gray-600 mb-4">
                Our team is located in Slovakia, inspired by the Tatra mountains
                and European training culture.
              </p>
              <span className="text-pulse-600 font-medium">
                Slovak-born, globally minded
              </span>
            </div> */}
          </div>
        </section>

        {/* Form Section */}
        <section id="contact-form" className="section-container">
          <div className="max-w-2xl mx-auto">
            <div className="rounded-2xl sm:rounded-3xl overflow-hidden shadow-elegant">
              {/* Card Header */}
              <div
                className="relative h-48 sm:h-64 p-6 sm:p-8 flex flex-col items-start"
                style={{
                  backgroundImage: "url('/background-section2.png')",
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                }}
              >
                <div className="inline-block px-4 sm:px-6 py-2 border border-white text-white rounded-full text-xs mb-4">
                  {t('sendUsMessage')}
                </div>
                <h2 className="text-2xl sm:text-3xl font-display text-white font-bold mt-auto">
                  {t('getInTouch')}
                </h2>
              </div>

              {/* Card Content - Form */}
              <div className="bg-card p-4 sm:p-8 border border-border">
                <form
                  onSubmit={handleSubmit}
                  className="space-y-4 sm:space-y-6"
                >
                  <div>
                    <input
                      type="text"
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleChange}
                      placeholder={t('fullName')}
                      className="w-full px-4 py-3 rounded-xl border border-input bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-pulse-500 focus:border-transparent"
                      required
                    />
                  </div>

                  <div>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder={t('emailAddress')}
                      className="w-full px-4 py-3 rounded-xl border border-input bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-pulse-500 focus:border-transparent"
                      required
                    />
                  </div>

                  <div>
                    <input
                      type="text"
                      name="company"
                      value={formData.company}
                      onChange={handleChange}
                      placeholder={t('companyOrganization')}
                      className="w-full px-4 py-3 rounded-xl border border-input bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-pulse-500 focus:border-transparent"
                    />
                  </div>

                  <div>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      placeholder={t('yourMessage')}
                      rows={6}
                      className="w-full px-4 py-3 rounded-xl border border-input bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-pulse-500 focus:border-transparent resize-none"
                      required
                    />
                  </div>

                  <div>
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full px-6 py-3 bg-pulse-500 hover:bg-pulse-600 disabled:bg-pulse-400 disabled:cursor-not-allowed text-white font-medium rounded-full transition-colors duration-300 flex items-center justify-center"
                    >
                      {isSubmitting ? (
                        <>
                          <svg
                            className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                          >
                            <circle
                              className="opacity-25"
                              cx="12"
                              cy="12"
                              r="10"
                              stroke="currentColor"
                              strokeWidth="4"
                            ></circle>
                            <path
                              className="opacity-75"
                              fill="currentColor"
                              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                            ></path>
                          </svg>
                          {t('sending')}
                        </>
                      ) : (
                        <>
                          {t('sendMessage')}
                          <ArrowRight className="ml-2 w-4 h-4" />
                        </>
                      )}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section
          className="section-container"
          style={{
            backgroundImage: 'url("/background-section3.png")',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        >
          <div className="text-center max-w-4xl mx-auto">
            <div className="animate-on-scroll">
              <h2 className="section-title text-3xl lg:text-4xl mb-6 text-white">
                {t('frequentlyAskedQuestions')}
              </h2>

              <div className="grid md:grid-cols-2 gap-8">
                <div className="glass-card p-6 text-left">
                  <h3 className="font-semibold mb-3 text-foreground">
                    🤔 {t('whatIsLominic')}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {t('whatIsLominicAnswer')}
                  </p>
                </div>
                <div className="glass-card p-6 text-left">
                  <h3 className="font-semibold mb-3 text-foreground">
                    📱 {t('whichDevicesWork')}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {t('whichDevicesWorkAnswer')}
                  </p>
                </div>
                <div className="glass-card p-6 text-left">
                  <h3 className="font-semibold mb-3 text-foreground">
                    💰 {t('howMuchDoesItCost')}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {t('howMuchDoesItCostAnswer')}
                  </p>
                </div>
                <div className="glass-card p-6 text-left">
                  <h3 className="font-semibold mb-3 text-foreground">
                    🔒 {t('isMyDataSafe')}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {t('isMyDataSafeAnswer')}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Response Time */}
        <section className="section-container">
          <div className="text-center max-w-4xl mx-auto">
            <div className="animate-on-scroll">
              <h2 className="section-title text-3xl lg:text-4xl mb-6 text-foreground">
                {t('wellGetBackToYouQuickly')}
              </h2>
              <p className="text-muted-foreground mb-8 leading-relaxed">
                {t('responseTimeDescription')}
              </p>

              <div className="grid md:grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="w-16 h-16 bg-pulse-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl font-bold text-pulse-600">
                      24h
                    </span>
                  </div>
                  <h3 className="font-semibold mb-2 text-foreground">
                    {t('responseTime')}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {t('responseTimeDetail')}
                  </p>
                </div>
                <div className="text-center">
                  <div className="w-16 h-16 bg-pulse-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl font-bold text-pulse-600">
                      100%
                    </span>
                  </div>
                  <h3 className="font-semibold mb-2 text-foreground">
                    {t('responseRate')}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {t('responseRateDetail')}
                  </p>
                </div>
                <div className="text-center">
                  <div className="w-16 h-16 bg-pulse-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl font-bold text-pulse-600">
                      24/7
                    </span>
                  </div>
                  <h3 className="font-semibold mb-2 text-foreground">
                    {t('support')}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {t('supportDetail')}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}

export default ContactUs
