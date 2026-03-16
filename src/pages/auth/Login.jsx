// import {
//   EnvelopeIcon,
//   LockClosedIcon,
//   EyeIcon,
//   EyeSlashIcon,
// } from "@heroicons/react/24/outline";

import { 
  FaEnvelope, 
  FaLock, 
  FaEye, 
  FaEyeSlash 
} from "react-icons/fa";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useLogin } from "../../hooks/auth/useLogin";
export default function Login() {

  const {
    email,
    setEmail,
    password,
    setPassword,
    loading,
    handleLogin,
  } = useLogin()

  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Card */}
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-slate-200">
          {/* Header */}
          <div className="bg-gradient-to-r from-blue-700 to-indigo-800 px-6 py-6">
            <div className="flex justify-center mb-4">
              <div className="w-12 h-12 bg-white/15 rounded-full flex items-center justify-center">
                <FaLock className="h-6 w-6 text-white" />
              </div>
            </div>
            <h2 className="text-white text-2xl font-bold text-center">
              Welcome Back
            </h2>
            <p className="text-blue-200 text-center mt-1 text-sm">
              Sign in to access your research dashboard
            </p>
          </div>
          {/* Form */}
          <div className="p-6 sm:p-8">
            <form onSubmit={handleLogin} className="space-y-5">
              {/* Email */}
              <div className="space-y-1.5">
                <label className="text-sm font-medium text-slate-700">
                  Email Address
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FaEnvelope className="h-5 w-5 text-indigo-500" />
                  </div>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition bg-slate-50 hover:bg-white"
                    placeholder="your.email@university.edu"
                    required
                  />
                </div>
              </div>
              {/* Password */}
              <div className="space-y-1.5">
                <label className="text-sm font-medium text-slate-700">
                  Password
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FaLock className="h-5 w-5 text-indigo-500" />
                  </div>
                  <input
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full pl-10 pr-12 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition bg-slate-50 hover:bg-white"
                    placeholder="••••••••"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  >
                    {showPassword ? (
                      <FaEyeSlash className="h-5 w-5 text-slate-400 hover:text-indigo-500" />
                    ) : (
                      <FaEye className="h-5 w-5 text-slate-400 hover:text-indigo-500" />
                    )}
                  </button>
                </div>
              </div>
              {/* Remember + Forgot */}
              <div className="flex items-center justify-between">
                <label className="flex items-center space-x-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={() => setRememberMe(!rememberMe)}
                    className="w-4 h-4 text-indigo-600 border-slate-300 rounded focus:ring-indigo-500"
                  />
                  <span className="text-sm text-slate-600">Remember me</span>
                </label>
                <Link
                  to="/auth/forgot-password"
                  className="text-sm text-indigo-600 hover:text-indigo-700 hover:underline font-medium"
                >
                  Forgot Password?
                </Link>
              </div>
              {/* Submit */}
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-gradient-to-r from-blue-600 to-indigo-700 text-white py-3.5 rounded-lg font-semibold hover:from-blue-700 hover:to-indigo-800 transform hover:scale-[1.02] transition-all shadow-md hover:shadow-lg disabled:opacity-70 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center gap-2"
              >
                {loading ? (
                  <>
                    <svg
                      className="animate-spin h-5 w-5 text-white"
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
                      />
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      />
                    </svg>
                    Signing in...
                  </>
                ) : (
                  "Sign In"
                )}
              </button>
              {/* Divider */}
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-slate-200" />
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-4 bg-white text-slate-500">
                    New to ScholarPress?
                  </span>
                </div>
              </div>
              {/* Register */}
              <Link
                to="/auth/register"
                className="block w-full text-center bg-white border border-slate-300 text-slate-700 py-3.5 rounded-lg font-semibold hover:bg-slate-50 transition-all shadow-sm"
              >
                Create Account
              </Link>
            </form>
          </div>
        </div>
        {/* Footer */}
        <p className="text-center text-slate-500 text-sm mt-6">
          © 2025 ScholarPress. All rights reserved.
        </p>
      </div>
    </div>
  );
}