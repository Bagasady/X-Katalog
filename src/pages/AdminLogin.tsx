import React, { useState } from "react";
import { Navigate } from "react-router-dom";
import { Lock, User, Eye, EyeOff, ShieldCheck } from "lucide-react";
import { useAdminAuth } from "../hooks/useAdminAuth";

function AdminLogin() {
  const { isAuthenticated, login, loading: authLoading } = useAdminAuth();
  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  if (authLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-lg text-gray-600">
        Loading...
      </div>
    );
  }
  if (isAuthenticated) {
    return <Navigate to="/admin/dashboard" replace />;
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const success = await login(credentials.email, credentials.password);
      if (!success) {
        setError("Email atau password salah.");
      }
    } catch (err) {
      setError("Login gagal. Silakan coba lagi.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-200 via-white to-emerald-100">
      <div className="w-full max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-0 md:gap-12 items-center px-4 py-12 animate-fade-in">
        {/* Illustration (desktop only) */}
        <div className="hidden md:flex flex-col items-center justify-center h-full">
          <div className="relative">
            <div className="absolute -top-8 -left-8 w-40 h-40 bg-indigo-300 opacity-30 rounded-full blur-2xl animate-pulse" />
            <div className="absolute -bottom-8 -right-8 w-32 h-32 bg-emerald-300 opacity-20 rounded-full blur-2xl animate-pulse" />
            <div className="bg-white/60 backdrop-blur-lg rounded-3xl shadow-2xl p-10 flex flex-col items-center border border-indigo-100">
              <ShieldCheck className="h-16 w-16 text-indigo-500 mb-4 animate-glow" />
              <h2 className="text-2xl font-bold text-indigo-700 mb-2">
                Welcome, Admin!
              </h2>
              <p className="text-gray-600 text-center max-w-xs">
                Kelola produk, kategori, dan analitik katalog Anda dengan mudah
                dan aman.
              </p>
            </div>
          </div>
        </div>
        {/* Login Card */}
        <div className="w-full">
          <div className="bg-white/80 backdrop-blur-lg rounded-3xl shadow-2xl p-8 md:p-10 border border-indigo-100 animate-slide-up">
            <div className="text-center mb-8">
              <div className="mx-auto h-16 w-16 bg-indigo-600 rounded-full flex items-center justify-center shadow-lg animate-scale-in">
                <Lock className="h-8 w-8 text-white" />
              </div>
              <h2 className="mt-6 text-3xl font-bold text-gray-900">
                Admin Login
              </h2>
              <p className="mt-2 text-sm text-gray-600">
                Sign in to access the admin dashboard
              </p>
            </div>
            <form className="space-y-6" onSubmit={handleSubmit}>
              <div className="space-y-4">
                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Email
                  </label>
                  <div className="mt-1 relative">
                    <input
                      id="email"
                      name="email"
                      type="email"
                      required
                      value={credentials.email}
                      onChange={(e) =>
                        setCredentials((prev) => ({
                          ...prev,
                          email: e.target.value,
                        }))
                      }
                      className="appearance-none relative block w-full px-3 py-3 pl-10 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400 focus:z-10 transition-all duration-200 bg-white/80"
                      placeholder="Enter your email"
                    />
                    <User className="absolute left-3 top-3.5 h-5 w-5 text-gray-400" />
                  </div>
                </div>
                <div>
                  <label
                    htmlFor="password"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Password
                  </label>
                  <div className="mt-1 relative">
                    <input
                      id="password"
                      name="password"
                      type={showPassword ? "text" : "password"}
                      required
                      value={credentials.password}
                      onChange={(e) =>
                        setCredentials((prev) => ({
                          ...prev,
                          password: e.target.value,
                        }))
                      }
                      className="appearance-none relative block w-full px-3 py-3 pl-10 pr-10 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400 focus:z-10 transition-all duration-200 bg-white/80"
                      placeholder="Enter your password"
                    />
                    <Lock className="absolute left-3 top-3.5 h-5 w-5 text-gray-400" />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-3.5 text-gray-400 hover:text-gray-600"
                      tabIndex={-1}
                    >
                      {showPassword ? (
                        <EyeOff className="h-5 w-5" />
                      ) : (
                        <Eye className="h-5 w-5" />
                      )}
                    </button>
                  </div>
                </div>
              </div>
              {error && (
                <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg animate-fade-in">
                  {error}
                </div>
              )}
              <button
                type="submit"
                disabled={loading}
                className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-lg text-white bg-gradient-to-r from-indigo-600 to-emerald-500 hover:from-indigo-700 hover:to-emerald-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-400 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 shadow-lg"
              >
                {loading ? "Signing in..." : "Sign in"}
              </button>
              <div className="text-center mt-4">
                <a
                  href="/"
                  className="text-indigo-600 hover:text-indigo-500 text-sm font-medium underline underline-offset-2 transition-colors duration-200"
                >
                  ← Back to Store
                </a>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminLogin;
