import React, { useState } from 'react'
import { toast } from 'sonner'
import emailjs from '@emailjs/browser'
import { Input } from './ui/input/input'
import { useTranslations } from 'next-intl'

const DetailsSection = () => {
  const t = useTranslations('DetailsSection')
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    company: '',
    message: '',
  })
  const [isSubmitting, setIsSubmitting] = useState(false)

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
    if (!formData.fullName || !formData.email) {
      toast.error('Please fill in all required fields')
      return
    }

    setIsSubmitting(true)

    try {
      // EmailJS configuration
      // You'll need to replace these with your actual EmailJS credentials
      const serviceId = 'service_1gwbvdo' // Replace with your EmailJS service ID
      const templateId = 'template_r214m0u' // Replace with your EmailJS template ID
      const publicKey = 'cHbnoKhUoDc1u4QcA' // Replace with your EmailJS public key

      const templateParams = {
        to_email: 'kanuchandrej@gmail.com',
        subject: 'lomatic',
        full_name: formData.fullName,
        email: formData.email,
        sport_activity: formData.company || 'Not specified',
        message: `New Lominic Access Request

Full Name: ${formData.fullName}
Email: ${formData.email}
Sport/Activity: ${formData.company || 'Not specified'}

---
This request was submitted from the Lominic website.`,
      }

      await emailjs.send(serviceId, templateId, templateParams, publicKey)

      toast.success(
        "Request submitted successfully! We'll get back to you soon."
      )

      // Reset form
      setFormData({
        fullName: '',
        email: '',
        company: '',
        message: '',
      })
    } catch (error) {
      console.error('Email sending failed:', error)
      toast.error('Failed to send request. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <section id="details" className="w-full bg-background py-0">
      <div className="container px-4 sm:px-6 lg:px-8 mx-auto">
        <div className="grid grid-cols-1 gap-6 md:gap-8 lg:grid-cols-2">
          {/* Left Card - The Details */}
          <div className="rounded-2xl sm:rounded-3xl overflow-hidden shadow-elegant">
            {/* Card Header with background image instead of gradient */}
            <div
              className="relative h-48 sm:h-64 p-6 sm:p-8 flex items-end"
              style={{
                backgroundImage: "url('/background-section3.png')",
                backgroundSize: 'cover',
                backgroundPosition: 'center',
              }}
            >
              <h2 className="text-2xl sm:text-3xl font-display text-white font-bold">
                Pricing & Plans
              </h2>
            </div>

            {/* Card Content */}
            <div className="bg-card p-4 sm:p-8">
              <h3 className="text-lg sm:text-xl font-display mb-6 sm:mb-8">
                AI-powered insights for every athlete
              </h3>

              <div className="space-y-4 sm:space-y-6">
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-primary flex items-center justify-center mt-1 flex-shrink-0">
                    <svg
                      width="14"
                      height="10"
                      viewBox="0 0 14 10"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M1 5L5 9L13 1"
                        stroke="white"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>
                  <div className="flex-1">
                    <div className="p-3 rounded-lg bg-muted/80 backdrop-blur-sm border border-border">
                      <span className="font-semibold text-base">
                        Free Plan:
                      </span>{' '}
                      Basic summaries & 5 uploads/month
                    </div>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-primary flex items-center justify-center mt-1 flex-shrink-0">
                    <svg
                      width="14"
                      height="10"
                      viewBox="0 0 14 10"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M1 5L5 9L13 1"
                        stroke="white"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>
                  <div className="flex-1">
                    <div className="p-3 rounded-lg bg-muted/80 backdrop-blur-sm border border-border">
                      <span className="font-semibold text-base">Pro Plan:</span>{' '}
                      $9.99/month - Unlimited uploads & AI Q&A
                    </div>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-primary flex items-center justify-center mt-1 flex-shrink-0">
                    <svg
                      width="14"
                      height="10"
                      viewBox="0 0 14 10"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M1 5L5 9L13 1"
                        stroke="white"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>
                  <div className="flex-1">
                    <div className="p-3 rounded-lg bg-muted/80 backdrop-blur-sm border border-border">
                      <span className="font-semibold text-base">
                        Coach Plan:
                      </span>{' '}
                      $19.99/month - Weekly reports & coaching
                    </div>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-primary flex items-center justify-center mt-1 flex-shrink-0">
                    <svg
                      width="14"
                      height="10"
                      viewBox="0 0 14 10"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M1 5L5 9L13 1"
                        stroke="white"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>
                  <div className="flex-1">
                    <div className="p-3 rounded-lg bg-muted/80 backdrop-blur-sm border border-border">
                      <span className="font-semibold text-base">
                        File Support:
                      </span>{' '}
                      FIT, GPX, Apple Health, Strava
                    </div>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-primary flex items-center justify-center mt-1 flex-shrink-0">
                    <svg
                      width="14"
                      height="10"
                      viewBox="0 0 14 10"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M1 5L5 9L13 1"
                        stroke="white"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>
                  <div className="flex-1">
                    <div className="p-3 rounded-lg bg-muted/80 backdrop-blur-sm border border-border">
                      <span className="font-semibold text-base">
                        AI Analysis:
                      </span>{' '}
                      Real-time insights & recommendations
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Card - Contact Form */}
          <div className="rounded-2xl sm:rounded-3xl overflow-hidden shadow-elegant">
            {/* Card Header with background image instead of gradient */}
            <div
              className="relative h-48 sm:h-64 p-6 sm:p-8 flex flex-col items-start"
              style={{
                backgroundImage: "url('/background-section1.png')",
                backgroundSize: 'cover',
                backgroundPosition: 'center',
              }}
            >
              <div className="inline-block px-4 sm:px-6 py-2 border border-white text-white rounded-full text-xs mb-4">
                Get early access
              </div>
              <h2 className="text-2xl sm:text-3xl font-display text-white font-bold mt-auto">
                Start training smarter
              </h2>
            </div>

            {/* Card Content - Form */}
            <div className="bg-card p-4 sm:p-8">
              <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
                <div>
                  <Input
                    type="text"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleChange}
                    placeholder="Full name"
                    required
                  />
                </div>

                <div>
                  <Input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Email address"
                    required
                  />
                </div>

                <div>
                  <Input
                    type="text"
                    name="company"
                    value={formData.company}
                    onChange={handleChange}
                    placeholder="Sport/Activity (optional)"
                  />
                </div>

                <div>
                  <Input
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Tell us about your sport/activities,what kind of reports you are looking for, etc."
                    className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-pulse-500 focus:border-transparent"
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
                        Sending...
                      </>
                    ) : (
                      t('getEarlyAccess')
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
export default DetailsSection
