"use client";

import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useLoginMutation } from "@/generated/graphql";

export default function LoginPage() {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [login, { loading, error }] = useLoginMutation();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const { data } = await login({
        variables: { email: formData.email, password: formData.password },
      });
      if (data?.login.access_token) {
        localStorage.setItem("access_token", data.login.access_token);
        window.location.href = "/profile";
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 flex items-center justify-center p-4">
        <form onSubmit={handleSubmit} className="space-y-4 w-full max-w-sm">
          <h1 className="text-2xl font-bold text-center">Login</h1>
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded"
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded"
            required
          />
          {error && (
            <p className="text-red-500 text-sm">{error.message}</p>
          )}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-pulse-500 text-white py-2 rounded"
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>
      </main>
      <Footer />
    </div>
  );
}
