'use client'

import React, { useEffect, useState } from 'react'
import Navbar from '../../../components/Navbar'
import Footer from '../../../components/Footer'
import { useLoginMutation } from '../../../generated/graphql'
import { useRouter } from 'next/navigation'
import { useFormik } from 'formik'
import { z } from 'zod'
import { Button } from '../../../components/ui/button'
import { Input } from '../../../components/ui/input/input'

const LoginSchema = z.object({
  email: z.string().email('Please enter a valid email address'),
  password: z.string().min(1, 'Password is required'),
})

type LoginValues = z.infer<typeof LoginSchema>

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false)
  const [login, { loading, error }] = useLoginMutation()
  const router = useRouter()

  const formik = useFormik<LoginValues>({
    initialValues: { email: '', password: '' },
    validate: values => {
      const result = LoginSchema.safeParse(values)
      if (result.success) return {}
      const errors: Record<string, string> = {}
      for (const issue of result.error.issues) {
        const key = issue.path[0] as string
        if (!errors[key]) errors[key] = issue.message
      }
      return errors
    },
    onSubmit: async values => {
      try {
        const { data } = await login({
          variables: { email: values.email, password: values.password },
        })
        if (data?.login.access_token) {
          localStorage.setItem('access_token', data.login.access_token)
          router.push('/client')
        }
      } catch (err) {
        console.error(err)
      }
    },
  })

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
    <div className="min-h-screen">
      <Navbar />
      <main className="pt-20">
        <section
          className="overflow-hidden relative bg-cover min-h-screen flex items-center"
          style={{
            backgroundImage: 'url("/Header-background.webp")',
            backgroundPosition: 'center 30%',
            padding: '60px 12px 40px',
          }}
        >
          <div className="container px-4 sm:px-6 lg:px-8">
            <div className="max-w-md mx-auto">
              <h1 className="section-title text-3xl sm:text-4xl mb-6 opacity-0 animate-fade-in text-center">
                Welcome Back
              </h1>
              <div
                className="glass-card p-6 sm:p-8 opacity-0 animate-fade-in"
                style={{ animationDelay: '0.2s' }}
              >
                <form onSubmit={formik.handleSubmit} className="space-y-6">
                  <div>
                    <label
                      htmlFor="email"
                      className="block text-sm font-medium text-gray-700 mb-2"
                    >
                      Email
                    </label>
                    <Input
                      type="email"
                      id="email"
                      name="email"
                      value={formik.values.email}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      placeholder="you@example.com"
                    />
                    {formik.touched.email && formik.errors.email && (
                      <p className="mt-1 text-sm text-red-600">
                        {formik.errors.email}
                      </p>
                    )}
                  </div>
                  <div>
                    <label
                      htmlFor="password"
                      className="block text-sm font-medium text-gray-700 mb-2"
                    >
                      Password
                    </label>
                    <div className="relative">
                      <Input
                        type={showPassword ? 'text' : 'password'}
                        id="password"
                        name="password"
                        value={formik.values.password}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        className={` transition-all duration-300 ${
                          formik.touched.password && formik.errors.password
                            ? 'border-red-500'
                            : 'border-gray-300'
                        }`}
                        placeholder="••••••••"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                      >
                        {showPassword ? (
                          <span className="sr-only">Hide</span>
                        ) : (
                          <span className="sr-only">Show</span>
                        )}
                      </button>
                    </div>
                    {formik.touched.password && formik.errors.password && (
                      <p className="mt-1 text-sm text-red-600">
                        {formik.errors.password}
                      </p>
                    )}
                  </div>
                  {error && (
                    <p className="text-red-500 text-sm">{error.message}</p>
                  )}
                  <Button
                    type="submit"
                    disabled={loading}
                    className="flex items-center justify-center group w-full text-center disabled:opacity-50 disabled:cursor-not-allowed"
                    style={{
                      backgroundColor: '#FE5C02',
                      borderRadius: '1440px',
                      boxSizing: 'border-box',
                      color: '#FFFFFF',
                      cursor: 'pointer',
                      fontSize: '14px',
                      lineHeight: '20px',
                      padding: '16px 24px',
                      border: '1px solid white',
                    }}
                  >
                    {loading ? 'Logging in...' : 'Login'}
                  </Button>
                </form>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
