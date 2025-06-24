"use client";

import React, { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { ArrowRight } from "lucide-react";
import { useLoginMutation } from "@/generated/graphql";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [formErrors, setFormErrors] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [loginError, setLoginError] = useState("");
  const [login] = useLoginMutation();
  const router = useRouter();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (formErrors[name as keyof typeof formErrors]) {
      setFormErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const validateForm = () => {
    const errors: typeof formErrors = { email: "", password: "" };
    if (!formData.email.trim()) {
      errors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = "Please enter a valid email address";
    }
    if (!formData.password) {
      errors.password = "Password is required";
    }
    setFormErrors(errors);
    return !errors.email && !errors.password;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError("");
    if (!validateForm()) return;
    setLoading(true);
    try {
      const { data } = await login({
        variables: {
          email: formData.email,
          password: formData.password,
        },
      });
      if (data?.login?.access_token) {
        localStorage.setItem("access_token", data.login.access_token);
        router.push("/profile");
      } else {
        setLoginError("Invalid credentials");
      }
    } catch (err: any) {
      setLoginError(
        err?.graphQLErrors?.[0]?.message || "Login failed. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

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
                  <ArrowRight className="w-3 h-3" />
                </span>
                <span>Sign In</span>
              </div>
              <h1
                className="section-title text-3xl sm:text-4xl leading-tight opacity-0 animate-fade-in text-center"
                style={{ animationDelay: "0.3s" }}
              >
                Welcome Back
              </h1>
              <p
                style={{ animationDelay: "0.5s" }}
                className="section-subtitle mt-4 mb-8 leading-relaxed opacity-0 animate-fade-in text-gray-950 font-normal text-base text-center"
              >
                Log in to your account
              </p>
              <div
                className="glass-card p-6 sm:p-8 opacity-0 animate-fade-in"
                style={{ animationDelay: "0.7s" }}
              >
                <form onSubmit={handleSubmit} className="space-y-6">
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
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-pulse-500 focus:border-transparent transition-all duration-300 ${
                        formErrors.email ? "border-red-500" : "border-gray-300"
                      }`}
                      placeholder="john@example.com"
                    />
                    {formErrors.email && (
                      <p className="mt-1 text-sm text-red-600">
                        {formErrors.email}
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
                    <input
                      type="password"
                      id="password"
                      name="password"
                      value={formData.password}
                      onChange={handleInputChange}
                      required
                      className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-pulse-500 focus:border-transparent transition-all duration-300 ${
                        formErrors.password
                          ? "border-red-500"
                          : "border-gray-300"
                      }`}
                      placeholder="••••••••"
                    />
                    {formErrors.password && (
                      <p className="mt-1 text-sm text-red-600">
                        {formErrors.password}
                      </p>
                    )}
                  </div>
                  {loginError && (
                    <p className="text-sm text-red-600 text-center">
                      {loginError}
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
                    {loading ? "Signing In..." : "Sign In"}
                    <ArrowRight className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1" />
                  </button>
                </form>
                <div className="mt-6 text-center">
                  <p className="text-sm text-gray-600">
                    Don&apos;t have an account?{" "}
                    <a
                      href="/signup"
                      className="text-pulse-600 hover:text-pulse-700 font-medium"
                    >
                      Sign up
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
