// import {
//   UserIcon,
//   EnvelopeIcon,
//   LockClosedIcon,
//   PhoneIcon,
//   EyeIcon,
//   EyeSlashIcon,
// } from "@heroicons/react/24/outline";

import {
  FaUser,
  FaEnvelope,
  FaLock,
  FaPhone,
  FaEye,
  FaEyeSlash,
} from "react-icons/fa";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useRegister } from "../../hooks/auth/useRegister";

export default function Register() {
  const {
    firstName,
    setFirstName,
    lastName,
    setLastName,
    phone,
    setPhone,
    email,
    setEmail,
    password,
    setPassword,
    agreed,
    setAgreed,
    loading,
    handleRegister,
  } = useRegister();

  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-slate-200">
          <div className="bg-gradient-to-r from-blue-600 to-indigo-700 px-6 py-3">
            <div className="flex justify-center mb-4">
              <div className="w-12 h-12 bg-white/15 rounded-full flex items-center justify-center">
                <FaLock className="h-6 w-6 text-white" />
              </div>
            </div>
            <h2 className="text-white text-2xl font-bold text-center">
              Create Account
            </h2>
            <p className="text-blue-200 text-center mt-1 text-sm">
              Join the ScholarPress research community
            </p>
          </div>
          <div className="p-6 sm:p-8">
            <form onSubmit={handleRegister} className="space-y-4">
              {/* Name Fields */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-slate-700 sr-only">
                    First Name
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <FaUser className="h-5 w-5 text-indigo-500" />
                    </div>
                    <input
                      type="text"
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                      placeholder="First Name"
                      className="w-full pl-10 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 transition bg-slate-50 hover:bg-white"
                      required
                    />
                  </div>
                </div>
                <div>
                  <label className="text-sm font-medium text-slate-700 sr-only">
                    Last Name
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <FaUser className="h-5 w-5 text-indigo-500" />
                    </div>
                    <input
                      type="text"
                      value={lastName}
                      onChange={(e) => setLastName(e.target.value)}
                      placeholder="Last Name"
                      className="w-full pl-10 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 transition bg-slate-50 hover:bg-white"
                      required
                    />
                  </div>
                </div>
              </div>
              {/* Phone */}
              <div>
                <label className="text-sm font-medium text-slate-700 sr-only">
                  Phone Number
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FaPhone className="h-5 w-5 text-indigo-500" />
                  </div>
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="Phone Number"
                    className="w-full pl-10 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 transition bg-slate-50 hover:bg-white"
                    required
                  />
                </div>
              </div>
              {/* Email */}
              <div>
                <label className="text-sm font-medium text-slate-700 sr-only">
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
                    placeholder="Email Address"
                    className="w-full pl-10 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 transition bg-slate-50 hover:bg-white"
                    required
                  />
                </div>
              </div>
              {/* Password */}
              <div>
                <label className="text-sm font-medium text-slate-700 sr-only">
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
                    placeholder="Password"
                    className="w-full pl-10 pr-12 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 transition bg-slate-50 hover:bg-white"
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
              {/* Terms */}
              <div className="flex items-start space-x-2">
                <input
                  type="checkbox"
                  checked={agreed}
                  onChange={() => setAgreed(!agreed)}
                  className="mt-1 w-4 h-4 text-indigo-600 border-slate-300 rounded focus:ring-indigo-500"
                  required
                />
                <span className="text-sm text-slate-700">
                  I agree to the{" "}
                  <a href="/terms" className="text-indigo-600 hover:underline">
                    Terms of Service
                  </a>{" "}
                  and{" "}
                  <a
                    href="/privacy"
                    className="text-indigo-600 hover:underline"
                  >
                    Privacy Policy
                  </a>
                </span>
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
                    Creating Account...
                  </>
                ) : (
                  "Create Account"
                )}
              </button>
              {/* Divider */}
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-slate-200" />
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-4 bg-white text-slate-500">
                    Already have an account?
                  </span>
                </div>
              </div>
              {/* Login Link */}
              <Link
                to="/auth/login"
                className="block w-full text-center bg-white border border-slate-300 text-slate-700 py-3.5 rounded-lg font-semibold hover:bg-slate-50 transition-all shadow-sm"
              >
                Sign In
              </Link>
            </form>
          </div>
        </div>
        <p className="text-center text-slate-500 text-sm mt-6">
          © 2025 ScholarPress. All rights reserved.
        </p>
      </div>
    </div>
  );
}
