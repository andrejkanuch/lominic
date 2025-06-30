'use client'
import React, { useState, useEffect } from 'react'
import { toast } from 'sonner'
import emailjs from '@emailjs/browser'
import Navbar from '../../../components/Navbar'
import Footer from '../../../components/Footer'
import { ArrowRight, Users, Zap, Brain } from 'lucide-react'

export default function WaitlistPage() {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    company: '',
    message: '',
  })
  const [isSubmitting, setIsSubmitting] = useState(false)

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
    if (!formData.fullName || !formData.email) {
      toast.error('Please fill in all required fields')
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
        message: `New Lominic Waitlist Request

Full Name: ${formData.fullName}
Email: ${formData.email}
Sport/Activity: ${formData.company || 'Not specified'}

---
This request was submitted from the Lominic waitlist page.`,
      }

      await emailjs.send(serviceId, templateId, templateParams, publicKey)

      toast.success(
        "You've been added to the waitlist! We'll notify you when Lominic is ready."
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
      toast.error('Failed to join waitlist. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
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
                <Users className="w-4 h-4 mr-2" />
                <span>Join the Waitlist</span>
              </div>

              <h1
                className="section-title text-4xl sm:text-5xl lg:text-6xl leading-tight opacity-0 animate-fade-in text-white"
                style={{ animationDelay: '0.3s' }}
              >
                Be First to Train Smarter
              </h1>

              <p
                className="section-subtitle mt-6 mb-8 opacity-0 animate-fade-in text-white"
                style={{ animationDelay: '0.5s' }}
              >
                Join our exclusive waitlist and get early access to AI-powered
                training insights that actually make sense.
              </p>
            </div>
          </div>
        </section>

        {/* Benefits Section */}
        <section className="section-container">
          <div className="text-center mb-12">
            <h2 className="section-title text-3xl lg:text-4xl mb-6 text-foreground">
              Why Join the Waitlist?
            </h2>
            <p className="text-muted-foreground mb-8 leading-relaxed">
              Get exclusive early access and be among the first to experience
              the future of training intelligence.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="feature-card bg-card rounded-2xl p-6 shadow-lg animate-on-scroll border border-border">
              <div className="w-12 h-12 bg-pulse-100 rounded-full flex items-center justify-center mb-4">
                <Zap className="w-6 h-6 text-pulse-600" />
              </div>
              <h3 className="text-xl font-semibold mb-3 text-foreground">
                Early Access
              </h3>
              <p className="text-muted-foreground">
                Be among the first to try Lominic before it's publicly
                available. Get a head start on smarter training.
              </p>
            </div>

            <div className="feature-card bg-card rounded-2xl p-6 shadow-lg animate-on-scroll border border-border">
              <div className="w-12 h-12 bg-pulse-100 rounded-full flex items-center justify-center mb-4">
                <Brain className="w-6 h-6 text-pulse-600" />
              </div>
              <h3 className="text-xl font-semibold mb-3 text-foreground">
                Exclusive Features
              </h3>
              <p className="text-muted-foreground">
                Access beta features and help shape the future of AI-powered
                training insights.
              </p>
            </div>

            <div className="feature-card bg-card rounded-2xl p-6 shadow-lg animate-on-scroll border border-border">
              <div className="w-12 h-12 bg-pulse-100 rounded-full flex items-center justify-center mb-4">
                <Users className="w-6 h-6 text-pulse-600" />
              </div>
              <h3 className="text-xl font-semibold mb-3 text-foreground">
                Community Access
              </h3>
              <p className="text-muted-foreground">
                Join our exclusive community of early adopters and training
                enthusiasts.
              </p>
            </div>
          </div>
        </section>

        {/* Form Section */}
        <section id="form" className="section-container">
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
                  Join the waitlist
                </div>
                <h2 className="text-2xl sm:text-3xl font-display text-white font-bold mt-auto">
                  Get Early Access to Lominic
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
                      placeholder="Full name"
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
                      placeholder="Email address"
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
                      placeholder="Sport/Activity (optional)"
                      className="w-full px-4 py-3 rounded-xl border border-input bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-pulse-500 focus:border-transparent"
                    />
                  </div>

                  <div>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="Tell us about your training goals, what kind of insights you're looking for, etc."
                      rows={4}
                      className="w-full px-4 py-3 rounded-xl border border-input bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-pulse-500 focus:border-transparent resize-none"
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
                          Joining...
                        </>
                      ) : (
                        <>
                          Join Waitlist
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

        {/* What to Expect */}
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
                What to Expect
              </h2>

              <div className="grid md:grid-cols-2 gap-8">
                <div className="glass-card p-6 text-left">
                  <h3 className="font-semibold mb-3 text-foreground">
                    📧 Email Updates
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    Get notified about our progress, beta releases, and
                    exclusive early access opportunities.
                  </p>
                </div>
                <div className="glass-card p-6 text-left">
                  <h3 className="font-semibold mb-3 text-foreground">
                    🎯 Priority Access
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    Early waitlist members get priority access when we launch
                    new features and beta programs.
                  </p>
                </div>
                <div className="glass-card p-6 text-left">
                  <h3 className="font-semibold mb-3 text-foreground">
                    💬 Direct Feedback
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    Share your thoughts and help us build the perfect training
                    intelligence platform.
                  </p>
                </div>
                <div className="glass-card p-6 text-left">
                  <h3 className="font-semibold mb-3 text-foreground">
                    🚀 Launch Day Access
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    Be among the first to experience Lominic when we officially
                    launch.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Final CTA */}
        <section className="section-container">
          <div className="text-center max-w-4xl mx-auto">
            <div className="animate-on-scroll">
              <h2 className="section-title text-3xl lg:text-4xl mb-6 text-foreground">
                Ready to Train Smarter?
              </h2>
              <p className="text-muted-foreground mb-8 leading-relaxed">
                Join thousands of athletes who are already waiting for the
                future of training intelligence.
              </p>

              <a
                onClick={() => {
                  document
                    .querySelector('#form')
                    ?.scrollIntoView({ behavior: 'smooth' })
                }}
                className="button-primary inline-flex items-center text-lg px-8 py-4 cursor-pointer"
              >
                Join the Waitlist Now
                <ArrowRight className="ml-2 w-5 h-5" />
              </a>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
