"use client";

import React, { useEffect } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { UserProfile } from "@/components/UserProfile";
import { useGetCurrentUserQuery } from "@/generated/graphql";
import { useRouter } from "next/navigation";

export default function ProfilePage() {
  const router = useRouter();
  const { data: userData, loading, error } = useGetCurrentUserQuery();

  // Initialize intersection observer to detect when elements enter viewport
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

  // Redirect to login if not authenticated
  useEffect(() => {
    if (!loading && !userData?.me) {
      router.push("/login");
    }
  }, [loading, userData, router]);

  if (loading) {
    return (
      <div className="min-h-screen">
        <Navbar />
        <main className="pt-20">
          <div className="container px-4 sm:px-6 lg:px-8 py-12">
            <div className="max-w-4xl mx-auto">
              <div className="animate-pulse">
                <div className="h-8 bg-gray-200 rounded w-1/4 mb-6"></div>
                <div className="space-y-4">
                  <div className="h-64 bg-gray-200 rounded"></div>
                  <div className="h-32 bg-gray-200 rounded"></div>
                </div>
              </div>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (error || !userData?.me) {
    return (
      <div className="min-h-screen">
        <Navbar />
        <main className="pt-20">
          <div className="container px-4 sm:px-6 lg:px-8 py-12">
            <div className="max-w-4xl mx-auto">
              <div className="text-center">
                <h1 className="text-2xl font-bold text-gray-900 mb-4">
                  Authentication Required
                </h1>
                <p className="text-gray-600 mb-6">
                  Please log in to view your profile.
                </p>
                <button
                  onClick={() => router.push("/login")}
                  className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-pulse-600 hover:bg-pulse-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pulse-500"
                >
                  Go to Login
                </button>
              </div>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

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
            <div className="max-w-4xl mx-auto">
              <div
                className="pulse-chip mb-6 opacity-0 animate-fade-in"
                style={{ animationDelay: "0.1s" }}
              >
                <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-pulse-500 text-white mr-2">
                  <svg
                    className="w-3 h-3"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                      clipRule="evenodd"
                    />
                  </svg>
                </span>
                <span>Your Profile</span>
              </div>

              <h1
                className="section-title text-3xl sm:text-4xl leading-tight opacity-0 animate-fade-in"
                style={{ animationDelay: "0.3s" }}
              >
                Welcome back, {userData.me.firstName}!
              </h1>

              <p
                style={{ animationDelay: "0.5s" }}
                className="section-subtitle mt-4 mb-8 leading-relaxed opacity-0 animate-fade-in text-gray-950 font-normal text-base"
              >
                Manage your account settings and view your information
              </p>

              <div
                className="glass-card p-6 sm:p-8 opacity-0 animate-fade-in"
                style={{ animationDelay: "0.7s" }}
              >
                <UserProfile />
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
