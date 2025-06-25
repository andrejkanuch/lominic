"use client";

import React, { useEffect, useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { ArrowRight, Eye, EyeOff, Check } from "lucide-react";
import { useRegisterMutation } from "@/generated/graphql";
import { useRouter } from "next/navigation";
import { useFormik } from "formik";
import { z } from "zod";

const SignUpSchema = z
  .object({
    firstName: z.string().nonempty("First name is required"),
    lastName: z.string().nonempty("Last name is required"),
    email: z.string().email("Please enter a valid email address"),
    password: z.string().min(6, "Password must be at least 6 characters"),
    confirmPassword: z.string(),
    agreeToTerms: z.literal(true, {
      errorMap: () => ({
        message: "You must agree to the terms and conditions",
      }),
    }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

type SignUpValues = z.infer<typeof SignUpSchema>;

export default function SignUpPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [register, { loading }] = useRegisterMutation();
  const router = useRouter();
  const [registerError, setRegisterError] = useState("");

  const formik = useFormik<SignUpValues>({
    initialValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      confirmPassword: "",
      agreeToTerms: true,
    },
    validate: (values) => {
      const result = SignUpSchema.safeParse(values);
      if (result.success) return {};
      const errors: Record<string, string> = {};
      for (const issue of result.error.issues) {
        const key = issue.path[0] as string;
        if (!errors[key]) errors[key] = issue.message;
      }
      return errors;
    },
    onSubmit: async (values) => {
      setRegisterError("");
      try {
        const { data } = await register({
          variables: {
            email: values.email,
            password: values.password,
            firstName: values.firstName,
            lastName: values.lastName,
          },
        });
        if (data?.register?.access_token) {
          localStorage.setItem("access_token", data.register.access_token);
          router.push("/profile");
        } else {
          setRegisterError("Registration failed");
        }
      } catch (error: any) {
        if (error.graphQLErrors) {
          error.graphQLErrors.forEach((err: any) => {
            if (err.message.includes("already exists")) {
              formik.setFieldError(
                "email",
                "User with this email already exists"
              );
            }
          });
        }
        setRegisterError(
          error?.graphQLErrors?.[0]?.message ||
            "Registration failed. Please try again."
        );
      }
    },
  });

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("animate-fade-in");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );

    const elements = document.querySelectorAll(".animate-on-scroll");
    elements.forEach((el) => observer.observe(el));

    return () => {
      elements.forEach((el) => observer.unobserve(el));
    };
  }, []);

  return (
    <div className="min-h-screen">
      <Navbar />
      <main className="pt-20">
        <section
          className="overflow-hidden relative bg-cover"
          style={{
            backgroundImage: 'url("/Header-background.webp")',
            backgroundPosition: "center 30%",
            padding: "60px 12px 40px",
          }}
        >
          <div className="absolute -top-[10%] -right-[5%] w-1/2 h-[70%] bg-pulse-gradient opacity-20 blur-3xl rounded-full"></div>
          <div className="container px-4 sm:px-6 lg:px-8">
            <div className="max-w-md mx-auto">
              <div
                className="pulse-chip mb-6 opacity-0 animate-fade-in"
                style={{ animationDelay: "0.1s" }}
              >
                <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-pulse-500 text-white mr-2">
                  <Check className="w-3 h-3" />
                </span>
                <span>Join Lominic</span>
              </div>
              <h1
                className="section-title text-3xl sm:text-4xl leading-tight opacity-0 animate-fade-in text-center"
                style={{ animationDelay: "0.3s" }}
              >
                Create Your Account
              </h1>
              <p
                className="section-subtitle mt-4 mb-8 leading-relaxed opacity-0 animate-fade-in text-gray-950 font-normal text-base text-center"
                style={{ animationDelay: "0.5s" }}
              >
                Start your AI-powered training journey today
              </p>
              <div
                className="glass-card p-6 sm:p-8 opacity-0 animate-fade-in"
                style={{ animationDelay: "0.7s" }}
              >
                <form onSubmit={formik.handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label
                        htmlFor="firstName"
                        className="block text-sm font-medium text-gray-700 mb-2"
                      >
                        First Name
                      </label>
                      <input
                        type="text"
                        id="firstName"
                        name="firstName"
                        value={formik.values.firstName}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-pulse-500 focus:border-transparent transition-all duration-300 ${
                          formik.touched.firstName && formik.errors.firstName
                            ? "border-red-500"
                            : "border-gray-300"
                        }`}
                        placeholder="John"
                      />
                      {formik.touched.firstName && formik.errors.firstName && (
                        <p className="mt-1 text-sm text-red-600">
                          {formik.errors.firstName}
                        </p>
                      )}
                    </div>
                    <div>
                      <label
                        htmlFor="lastName"
                        className="block text-sm font-medium text-gray-700 mb-2"
                      >
                        Last Name
                      </label>
                      <input
                        type="text"
                        id="lastName"
                        name="lastName"
                        value={formik.values.lastName}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-pulse-500 focus:border-transparent transition-all duration-300 ${
                          formik.touched.lastName && formik.errors.lastName
                            ? "border-red-500"
                            : "border-gray-300"
                        }`}
                        placeholder="Doe"
                      />
                      {formik.touched.lastName && formik.errors.lastName && (
                        <p className="mt-1 text-sm text-red-600">
                          {formik.errors.lastName}
                        </p>
                      )}
                    </div>
                  </div>
                  <div>
                    <label
                      htmlFor="email"
                      className="block text-sm font-medium text-gray-700 mb-2"
                    >
                      Email Address
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formik.values.email}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-pulse-500 focus:border-transparent transition-all duration-300 ${
                        formik.touched.email && formik.errors.email
                          ? "border-red-500"
                          : "border-gray-300"
                      }`}
                      placeholder="john@example.com"
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
                      <input
                        type={showPassword ? "text" : "password"}
                        id="password"
                        name="password"
                        value={formik.values.password}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        className={`w-full px-4 py-3 pr-12 border rounded-lg focus:ring-2 focus:ring-pulse-500 focus:border-transparent transition-all duration-300 ${
                          formik.touched.password && formik.errors.password
                            ? "border-red-500"
                            : "border-gray-300"
                        }`}
                        placeholder="••••••••"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                      >
                        {showPassword ? (
                          <EyeOff className="w-5 h-5" />
                        ) : (
                          <Eye className="w-5 h-5" />
                        )}
                      </button>
                    </div>
                    {formik.touched.password && formik.errors.password && (
                      <p className="mt-1 text-sm text-red-600">
                        {formik.errors.password}
                      </p>
                    )}
                  </div>
                  <div>
                    <label
                      htmlFor="confirmPassword"
                      className="block text-sm font-medium text-gray-700 mb-2"
                    >
                      Confirm Password
                    </label>
                    <div className="relative">
                      <input
                        type={showConfirmPassword ? "text" : "password"}
                        id="confirmPassword"
                        name="confirmPassword"
                        value={formik.values.confirmPassword}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        className={`w-full px-4 py-3 pr-12 border rounded-lg focus:ring-2 focus:ring-pulse-500 focus:border-transparent transition-all duration-300 ${
                          formik.touched.confirmPassword &&
                          formik.errors.confirmPassword
                            ? "border-red-500"
                            : "border-gray-300"
                        }`}
                        placeholder="••••••••"
                      />
                      <button
                        type="button"
                        onClick={() =>
                          setShowConfirmPassword(!showConfirmPassword)
                        }
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                      >
                        {showConfirmPassword ? (
                          <EyeOff className="w-5 h-5" />
                        ) : (
                          <Eye className="w-5 h-5" />
                        )}
                      </button>
                    </div>
                    {formik.touched.confirmPassword &&
                      formik.errors.confirmPassword && (
                        <p className="mt-1 text-sm text-red-600">
                          {formik.errors.confirmPassword}
                        </p>
                      )}
                  </div>
                  <div className="flex items-start space-x-3">
                    <input
                      type="checkbox"
                      id="agreeToTerms"
                      name="agreeToTerms"
                      checked={formik.values.agreeToTerms}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      className="mt-1 h-4 w-4 text-pulse-600 focus:ring-pulse-500 border-gray-300 rounded"
                    />
                    <label
                      htmlFor="agreeToTerms"
                      className="text-sm text-gray-600"
                    >
                      I agree to the{" "}
                      <a
                        href="#"
                        className="text-pulse-600 hover:text-pulse-700 underline"
                      >
                        Terms of Service
                      </a>{" "}
                      and{" "}
                      <a
                        href="#"
                        className="text-pulse-600 hover:text-pulse-700 underline"
                      >
                        Privacy Policy
                      </a>
                    </label>
                  </div>
                  {formik.touched.agreeToTerms &&
                    formik.errors.agreeToTerms && (
                      <p className="text-sm text-red-600">
                        {formik.errors.agreeToTerms}
                      </p>
                    )}
                  {registerError && (
                    <p className="text-sm text-red-600 text-center">
                      {registerError}
                    </p>
                  )}
                  <button
                    type="submit"
                    disabled={loading}
                    className="flex items-center justify-center group w-full text-center disabled:opacity-50 disabled:cursor-not-allowed"
                    style={{
                      backgroundColor: "#FE5C02",
                      borderRadius: "1440px",
                      boxSizing: "border-box",
                      color: "#FFFFFF",
                      cursor: "pointer",
                      fontSize: "14px",
                      lineHeight: "20px",
                      padding: "16px 24px",
                      border: "1px solid white",
                    }}
                  >
                    {loading ? "Creating Account..." : "Create Account"}
                    <ArrowRight className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1" />
                  </button>
                </form>
                <div className="mt-6 text-center">
                  <p className="text-sm text-gray-600">
                    Already have an account?{" "}
                    <a
                      href="/login"
                      className="text-pulse-600 hover:text-pulse-700 font-medium"
                    >
                      Sign in
                    </a>
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div
            className="hidden lg:block absolute bottom-0 left-1/4 w-64 h-64 bg-pulse-100/30 rounded-full blur-3xl -z-10 parallax"
            data-speed="0.05"
          ></div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
