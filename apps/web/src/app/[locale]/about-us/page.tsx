'use client'

import React, { useEffect } from 'react'
import Link from 'next/link'
import { ArrowRight, Brain, Mountain, Shield, Users, Zap } from 'lucide-react'

const AboutUs = () => {
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
                <Brain className="w-4 h-4 mr-2" />
                <span>About Lominic</span>
              </div>

              <h1
                className="section-title text-4xl sm:text-5xl lg:text-6xl leading-tight opacity-0 animate-fade-in text-white"
                style={{ animationDelay: '0.3s' }}
              >
                Your Training Deserves a Smarter Partner
              </h1>

              <p
                className="section-subtitle mt-6 mb-8 opacity-0 animate-fade-in text-white"
                style={{ animationDelay: '0.5s' }}
              >
                Lominic was born from a simple question: Why does my $800
                smartwatch give me insights that feel… dumb?
              </p>
            </div>
          </div>
        </section>

        {/* Origin Story */}
        <section className="section-container">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="animate-on-scroll">
              <h2 className="section-title text-3xl lg:text-4xl mb-6 text-foreground">
                The Story Behind Lominic
              </h2>
              <p className="text-muted-foreground mb-6 leading-relaxed">
                Like many of you, we've used Garmin, Apple Watch, and Strava.
                We've tracked the miles, logged the heart rates, and read the
                same recycled summary: "You ran faster today."
              </p>
              <p className="text-muted-foreground mb-6 leading-relaxed">
                But training is more than numbers. It's how you feel, how you
                recover, and how your progress stacks over time. That's why we
                built Lominic — your AI-powered workout intelligence engine,
                designed to turn raw fitness data into real, personalized
                insight.
              </p>
            </div>
            <div className="animate-on-scroll">
              <div className="relative">
                <div className="absolute inset-0 bg-dark-900 rounded-2xl -z-10 shadow-xl"></div>
                <div className="relative overflow-hidden rounded-2xl shadow-2xl">
                  <img
                    src="/generic-image.png"
                    alt="Story"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Vision Section */}
        <section
          className="section-container"
          style={{
            backgroundImage: 'url("/background-section2.png")',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        >
          <div className="text-center max-w-4xl mx-auto">
            <div className="animate-on-scroll">
              <div className="pulse-chip mb-6">
                <Mountain className="w-4 h-4 mr-2" />
                <span>The Vision</span>
              </div>

              <h2 className="section-title text-3xl lg:text-4xl mb-6 text-white">
                The Vision Behind Lominic
              </h2>

              <p className="text-muted-foreground mb-8 leading-relaxed text-white">
                Lominic was founded by developers and athletes who believe you
                shouldn't need a sports science degree to understand your
                training.
              </p>

              <div className="glass-card p-8 mb-8">
                <h3 className="text-xl font-semibold mb-4 text-foreground">
                  Our mission is simple:
                </h3>
                <p className="text-lg text-muted-foreground">
                  To turn your wearable data into intelligent, calm, and
                  actionable feedback that improves your body and mind.
                </p>
              </div>

              <p className="text-muted-foreground font-medium text-white">
                We're not here to replace your Garmin. We're here to make it
                smarter.
              </p>
            </div>
          </div>
        </section>

        {/* What Makes Us Different */}
        <section className="section-container">
          <div className="text-center mb-12">
            <h2 className="section-title text-3xl lg:text-4xl mb-6 text-foreground">
              What Makes Lominic Different?
            </h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="feature-card bg-card rounded-2xl p-6 shadow-lg animate-on-scroll border border-border">
              <div className="w-12 h-12 bg-pulse-100 rounded-full flex items-center justify-center mb-4">
                <Brain className="w-6 h-6 text-pulse-600" />
              </div>
              <h3 className="text-xl font-semibold mb-3 text-foreground">
                AI That Thinks Like a Coach
              </h3>
              <p className="text-muted-foreground mb-4">
                Not just "summary stats" — Lominic reads between the lines. It
                tells you:
              </p>
              <ul className="text-sm text-muted-foreground space-y-2">
                <li>
                  • "You've been pushing hard for 3 weeks straight. Time for
                  recovery."
                </li>
                <li>
                  • "Your pace is improving at the same HR. That's aerobic
                  gain."
                </li>
                <li>
                  • "This week you ran more, but slept worse. Watch for signs of
                  overload."
                </li>
              </ul>
            </div>

            <div className="feature-card bg-card rounded-2xl p-6 shadow-lg animate-on-scroll border border-border">
              <div className="w-12 h-12 bg-pulse-100 rounded-full flex items-center justify-center mb-4">
                <Zap className="w-6 h-6 text-pulse-600" />
              </div>
              <h3 className="text-xl font-semibold mb-3 text-foreground">
                Works With What You Use
              </h3>
              <p className="text-muted-foreground">
                Garmin, Strava, Apple Health — we're building Lominic to
                integrate smoothly with your existing tools, not replace them.
              </p>
            </div>

            <div className="feature-card bg-card rounded-2xl p-6 shadow-lg animate-on-scroll border border-border">
              <div className="w-12 h-12 bg-pulse-100 rounded-full flex items-center justify-center mb-4">
                <Shield className="w-6 h-6 text-pulse-600" />
              </div>
              <h3 className="text-xl font-semibold mb-3 text-foreground">
                Private By Design
              </h3>
              <p className="text-muted-foreground">
                We believe your health data is yours. We never sell it. Period.
              </p>
            </div>
          </div>
        </section>

        {/* Slovak Connection */}
        {/* <section className="section-container">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="animate-on-scroll">
              <div className="relative">
                <div className="absolute inset-0 bg-dark-900 rounded-2xl -z-10 shadow-xl"></div>
                <div className="relative overflow-hidden rounded-2xl shadow-2xl">
                  <div className="w-full h-64 bg-gradient-to-br from-blue-100 to-blue-200 flex items-center justify-center">
                    <span className="text-blue-600 font-medium">
                      [Mountain trail shots]
                    </span>
                  </div>
                </div>
              </div>
            </div>
            <div className="animate-on-scroll">
              <h2 className="section-title text-3xl lg:text-4xl mb-6">
                Inspired by Nature, Grounded in Slovakia
              </h2>
              <p className="text-gray-600 mb-6 leading-relaxed">
                Lominic's name comes from Lomnický štít, a Tatra mountain peak.
                Our team is Slovak-born, and deeply connected to nature,
                balance, and performance.
              </p>
            </div>
          </div>
        </section> */}

        {/* Who This Is For */}
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
                Who This Is For
              </h2>
              <p className="text-muted-foreground mb-8 leading-relaxed text-white">
                Lominic is for anyone curious about how to train smarter, not
                just harder.
              </p>

              <div className="grid md:grid-cols-3 gap-6 mb-8">
                <div className="glass-card p-6">
                  <Users className="w-8 h-8 text-pulse-600 mx-auto mb-3" />
                  <h3 className="font-semibold mb-2 text-foreground">
                    Amateur Runners
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    Who want more than cookie-cutter insights
                  </p>
                </div>
                <div className="glass-card p-6">
                  <Zap className="w-8 h-8 text-pulse-600 mx-auto mb-3" />
                  <h3 className="font-semibold mb-2 text-foreground">
                    Multi-Sport Athletes
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    Tracking performance across multiple devices
                  </p>
                </div>
                <div className="glass-card p-6">
                  <Brain className="w-8 h-8 text-pulse-600 mx-auto mb-3" />
                  <h3 className="font-semibold mb-2 text-foreground">
                    Smart Trainers
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    Anyone wanting to train smarter, not harder
                  </p>
                </div>
              </div>

              <p className="text-muted-foreground text-white">
                Whether you're prepping for your first 5K or optimizing
                ultra-marathon cycles, Lominic grows with you — and learns from
                your data to guide you like a coach would.
              </p>
            </div>
          </div>
        </section>

        {/* Behind the Scenes */}
        {/* <section className="section-container">
          <div className="text-center mb-12">
            <h2 className="section-title text-3xl lg:text-4xl mb-6">
              Behind the Scenes
            </h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="animate-on-scroll">
              <div className="relative overflow-hidden rounded-2xl shadow-lg">
                <div className="w-full h-48 bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
                  <span className="text-gray-600 font-medium text-sm">
                    [Founder with smartwatch]
                  </span>
                </div>
              </div>
            </div>
            <div className="animate-on-scroll">
              <div className="relative overflow-hidden rounded-2xl shadow-lg">
                <div className="w-full h-48 bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
                  <span className="text-gray-600 font-medium text-sm">
                    [Whiteboard sketches]
                  </span>
                </div>
              </div>
            </div>
            <div className="animate-on-scroll">
              <div className="relative overflow-hidden rounded-2xl shadow-lg">
                <div className="w-full h-48 bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
                  <span className="text-gray-600 font-medium text-sm">
                    [App prototype]
                  </span>
                </div>
              </div>
            </div>
            <div className="animate-on-scroll">
              <div className="relative overflow-hidden rounded-2xl shadow-lg">
                <div className="w-full h-48 bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
                  <span className="text-gray-600 font-medium text-sm">
                    [Mountain trail shots]
                  </span>
                </div>
              </div>
            </div>
          </div>
        </section> */}

        {/* What's Next */}
        <section className="section-container">
          <div className="text-center max-w-4xl mx-auto">
            <div className="animate-on-scroll">
              <h2 className="section-title text-3xl lg:text-4xl mb-6 text-foreground">
                What's Next
              </h2>
              <p className="text-muted-foreground mb-8 leading-relaxed">
                We're currently integrating with the Garmin Health API, and
                testing early versions of our AI insight engine.
              </p>

              <div className="glass-card p-8 mb-8">
                <h3 className="text-xl font-semibold mb-6 text-foreground">
                  Soon, you'll be able to:
                </h3>
                <div className="grid md:grid-cols-2 gap-4 text-left">
                  <ul className="space-y-2 text-muted-foreground">
                    <li>• Upload workouts</li>
                    <li>
                      • Ask our AI questions ("Was that a good tempo run?")
                    </li>
                    <li>• See weekly summaries</li>
                  </ul>
                  <ul className="space-y-2 text-muted-foreground">
                    <li>• Track recovery and overload signals</li>
                    <li>• Compare your progress to similar athletes</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Get Involved */}
        <section className="section-container">
          <div className="text-center max-w-4xl mx-auto">
            <div className="animate-on-scroll">
              <h2 className="section-title text-3xl lg:text-4xl mb-6 text-foreground">
                Want to Get Involved?
              </h2>

              <div className="grid md:grid-cols-3 gap-6 mb-8">
                <div className="glass-card p-6">
                  <h3 className="font-semibold mb-2 text-foreground">
                    📬 Early Testers Wanted
                  </h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    Join our waitlist
                  </p>
                  <Link
                    href="/waitlist"
                    className="button-primary inline-flex items-center"
                  >
                    Join Waitlist
                    <ArrowRight className="ml-2 w-4 h-4" />
                  </Link>
                </div>
                <div className="glass-card p-6">
                  <h3 className="font-semibold mb-2 text-foreground">
                    💡 Have Feedback?
                  </h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    Message us directly
                  </p>
                  <Link
                    href="/contact"
                    className="button-secondary inline-flex items-center"
                  >
                    Contact Us
                    <ArrowRight className="ml-2 w-4 h-4" />
                  </Link>
                </div>
                <div className="glass-card p-6">
                  <h3 className="font-semibold mb-2 text-foreground">
                    🤝 Coaches & Teams
                  </h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    We're building B2B tools too
                  </p>
                  <Link
                    href="/contact"
                    className="button-secondary inline-flex items-center"
                  >
                    Learn More
                    <ArrowRight className="ml-2 w-4 h-4" />
                  </Link>
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
                Join the Movement
              </h2>
              <p className="text-muted-foreground mb-8 leading-relaxed">
                Whether you're frustrated by shallow stats, or simply want a
                deeper connection with your training, Lominic was built for you.
              </p>

              <div className="glass-card p-8 mb-8">
                <h3 className="text-xl font-semibold mb-4 text-foreground">
                  We're here to help you:
                </h3>
                <div className="grid md:grid-cols-3 gap-4">
                  <div className="text-center">
                    <div className="w-12 h-12 bg-pulse-100 rounded-full flex items-center justify-center mx-auto mb-3">
                      <Zap className="w-6 h-6 text-pulse-600" />
                    </div>
                    <p className="font-medium text-foreground">
                      Train with purpose
                    </p>
                  </div>
                  <div className="text-center">
                    <div className="w-12 h-12 bg-pulse-100 rounded-full flex items-center justify-center mx-auto mb-3">
                      <Brain className="w-6 h-6 text-pulse-600" />
                    </div>
                    <p className="font-medium text-foreground">
                      Recover smarter
                    </p>
                  </div>
                  <div className="text-center">
                    <div className="w-12 h-12 bg-pulse-100 rounded-full flex items-center justify-center mx-auto mb-3">
                      <Mountain className="w-6 h-6 text-pulse-600" />
                    </div>
                    <p className="font-medium text-foreground">
                      Reach your next peak
                    </p>
                  </div>
                </div>
              </div>

              <Link
                href="/"
                className="button-primary inline-flex items-center text-lg px-8 py-4"
              >
                Explore Lominic
                <ArrowRight className="ml-2 w-5 h-5" />
              </Link>
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}

export default AboutUs
