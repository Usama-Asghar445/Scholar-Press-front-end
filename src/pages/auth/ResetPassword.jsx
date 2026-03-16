
import { 
  FaLock,          // FaLock
  FaRegEye,        // FaRegEye
  FaRegEyeSlash,   // FaRegEyeSlash
  FaCheckCircle,   // FaCheckCircle
  FaShieldAlt      // FaShieldAlt
} from "react-icons/fa";
import { Link } from "react-router-dom";
import { useResetPassword } from "../../hooks/auth/useResetPassword";
import { useEffect } from "react";

function ResetPassword() {
  const {
    formData,
    showPassword,
    showConfirmPassword,
    loading,
    errors,
    isSuccess,
    email,
    code,
    getPasswordStrength,
    handleChange,
    handleSubmit,
    handleGoToDashboard,
    setShowPassword,
    setShowConfirmPassword,
  } = useResetPassword();

  const passwordStrength = getPasswordStrength(formData.password);

  // Check if email and code are present in URL
  useEffect(() => {
    if (!email || !code) {
      // You can show an error or redirect
      console.warn("Email or verification code missing from URL");
    }
  }, [email, code]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-100 via-orange-100 to-orange-200 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Card */}
        <div className="bg-white rounded-2xl shadow-2xl overflow-hidden border border-amber-100">
          {/* Header */}
          <div className="bg-gradient-to-r from-orange-500 to-amber-500 px-6 py-5">
            <div className="flex justify-center mb-4">
              <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                {isSuccess ? (
                  <FaCheckCircle className="h-6 w-6 text-white" />
                ) : (
                  <FaShieldAlt className="h-6 w-6 text-white" />
                )}
              </div>
            </div>

            <h2 className="text-white text-2xl font-semibold text-center">
              {isSuccess ? "Password Reset!" : "Create New Password"}
            </h2>
            <p className="text-amber-100 text-center mt-1 text-sm">
              {isSuccess
                ? "Your password has been successfully reset"
                : "Your new password must be different from previous passwords"}
            </p>
          </div>

          {/* Form */}
          <div className="p-8">
            {!isSuccess ? (
              <form onSubmit={handleSubmit} className="space-y-5">
                {/* Display email (read-only) */}
                {email && (
                  <div className="bg-amber-50 border border-amber-200 rounded-lg p-3 mb-4">
                    <p className="text-sm text-amber-800">
                      <span className="font-medium">Resetting password for:</span>{" "}
                      <span className="font-semibold">{email}</span>
                    </p>
                  </div>
                )}

                {/* New Password */}
                <div className="space-y-1">
                  <label className="text-sm font-medium text-gray-700">
                    New Password
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <FaLock className="h-5 w-5 text-amber-500" />
                    </div>
                    <input
                      type={showPassword ? "text" : "password"}
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                      className={`w-full pl-10 pr-12 py-3 border ${
                        errors.password ? "border-red-500" : "border-gray-300"
                      } rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent transition bg-gray-50 hover:bg-white`}
                      placeholder="Enter new password"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute inset-y-0 right-0 pr-3 flex items-center"
                    >
                      {showPassword ? (
                        <FaRegEyeSlash className="h-5 w-5 text-gray-400 hover:text-amber-500" />
                      ) : (
                        <FaRegEye className="h-5 w-5 text-gray-400 hover:text-amber-500" />
                      )}
                    </button>
                  </div>
                  {errors.password && (
                    <p className="text-red-500 text-xs mt-1">{errors.password}</p>
                  )}

                  {/* Password Strength Indicator */}
                  {formData.password && (
                    <div className="mt-2">
                      <div className="flex items-center justify-between text-xs mb-1">
                        <span className="text-gray-500">Password Strength</span>
                        <span
                          className={`font-medium ${
                            passwordStrength.label === "Weak"
                              ? "text-red-500"
                              : passwordStrength.label === "Medium"
                              ? "text-yellow-500"
                              : "text-green-500"
                          }`}
                        >
                          {passwordStrength.label}
                        </span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className={`h-2 rounded-full transition-all duration-300 ${passwordStrength.color} ${passwordStrength.width}`}
                        ></div>
                      </div>
                    </div>
                  )}
                </div>

                {/* Confirm Password */}
                <div className="space-y-1">
                  <label className="text-sm font-medium text-gray-700">
                    Confirm New Password
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <FaLock className="h-5 w-5 text-amber-500" />
                    </div>
                    <input
                      type={showConfirmPassword ? "text" : "password"}
                      name="confirmPassword"
                      value={formData.confirmPassword}
                      onChange={handleChange}
                      className={`w-full pl-10 pr-12 py-3 border ${
                        errors.confirmPassword
                          ? "border-red-500"
                          : "border-gray-300"
                      } rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent transition bg-gray-50 hover:bg-white`}
                      placeholder="Confirm new password"
                    />
                    <button
                      type="button"
                      onClick={() =>
                        setShowConfirmPassword(!showConfirmPassword)
                      }
                      className="absolute inset-y-0 right-0 pr-3 flex items-center"
                    >
                      {showConfirmPassword ? (
                        <FaRegEyeSlash className="h-5 w-5 text-gray-400 hover:text-amber-500" />
                      ) : (
                        <FaRegEye className="h-5 w-5 text-gray-400 hover:text-amber-500" />
                      )}
                    </button>
                  </div>
                  {errors.confirmPassword && (
                    <p className="text-red-500 text-xs mt-1">
                      {errors.confirmPassword}
                    </p>
                  )}

                  {/* Password Match Indicator */}
                  {formData.confirmPassword &&
                    formData.password === formData.confirmPassword && (
                      <p className="text-green-500 text-xs mt-1 flex items-center gap-1">
                        <FaCheckCircle className="h-4 w-4" />
                        Passwords match
                      </p>
                    )}
                </div>

                {/* Password Requirements */}
                <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
                  <h4 className="text-sm font-medium text-amber-800 mb-2">
                    Password Requirements:
                  </h4>
                  <ul className="text-xs text-amber-700 space-y-1">
                    <li
                      className={`flex items-center gap-2 ${
                        formData.password.length >= 6 ? "text-green-600" : ""
                      }`}
                    >
                      <span
                        className={`w-4 h-4 rounded-full flex items-center justify-center text-xs ${
                          formData.password.length >= 6
                            ? "bg-green-500 text-white"
                            : "bg-gray-300"
                        }`}
                      >
                        {formData.password.length >= 6 ? "✓" : "•"}
                      </span>
                      At least 6 characters
                    </li>
                    <li
                      className={`flex items-center gap-2 ${
                        /[A-Z]/.test(formData.password) ? "text-green-600" : ""
                      }`}
                    >
                      <span
                        className={`w-4 h-4 rounded-full flex items-center justify-center text-xs ${
                          /[A-Z]/.test(formData.password)
                            ? "bg-green-500 text-white"
                            : "bg-gray-300"
                        }`}
                      >
                        {/[A-Z]/.test(formData.password) ? "✓" : "•"}
                      </span>
                      At least one uppercase letter
                    </li>
                    <li
                      className={`flex items-center gap-2 ${
                        /[a-z]/.test(formData.password) ? "text-green-600" : ""
                      }`}
                    >
                      <span
                        className={`w-4 h-4 rounded-full flex items-center justify-center text-xs ${
                          /[a-z]/.test(formData.password)
                            ? "bg-green-500 text-white"
                            : "bg-gray-300"
                        }`}
                      >
                        {/[a-z]/.test(formData.password) ? "✓" : "•"}
                      </span>
                      At least one lowercase letter
                    </li>
                    <li
                      className={`flex items-center gap-2 ${
                        /[0-9]/.test(formData.password) ? "text-green-600" : ""
                      }`}
                    >
                      <span
                        className={`w-4 h-4 rounded-full flex items-center justify-center text-xs ${
                          /[0-9]/.test(formData.password)
                            ? "bg-green-500 text-white"
                            : "bg-gray-300"
                        }`}
                      >
                        {/[0-9]/.test(formData.password) ? "✓" : "•"}
                      </span>
                      At least one number
                    </li>
                  </ul>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-gradient-to-r from-orange-500 to-amber-500 text-white py-4 rounded-lg font-semibold text-lg hover:from-amber-600 hover:to-orange-600 transform hover:scale-[1.02] transition shadow-lg hover:shadow-xl disabled:opacity-70 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center"
                >
                  {loading ? (
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
                      Resetting Password...
                    </>
                  ) : (
                    "Reset Password"
                  )}
                </button>

                {/* Back to Login */}
                <Link
                  to="/auth/login"
                  className="block text-center text-gray-600 hover:text-amber-600 text-sm font-medium transition-colors"
                >
                  Back to Login
                </Link>
              </form>
            ) : (
              // Success State
              <div className="space-y-6 text-center">
                {/* Success Animation */}
                <div className="flex justify-center">
                  <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center animate-bounce">
                    <FaCheckCircle className="h-12 w-12 text-green-500" />
                  </div>
                </div>

                {/* Success Message */}
                <div>
                  <h3 className="text-xl font-semibold text-gray-800 mb-2">
                    Password Reset Successful!
                  </h3>
                  <p className="text-gray-600 text-sm">
                    Your password has been changed successfully. You can now use
                    your new password to sign in to your account.
                  </p>
                </div>

                {/* Success Info Box */}
                <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                  <div className="flex items-center gap-2 text-green-700">
                    <FaShieldAlt className="h-5 w-5" />
                    <span className="text-sm font-medium">
                      Your account is now secure
                    </span>
                  </div>
                </div>

                {/* Go to Login Button */}
                <button
                  onClick={handleGoToDashboard}
                  className="w-full bg-gradient-to-r from-orange-500 to-amber-500 text-white py-4 rounded-lg font-semibold text-lg hover:from-amber-600 hover:to-orange-600 transform hover:scale-[1.02] transition shadow-lg hover:shadow-xl"
                >
                  Continue to Dashboard
                </button>

                {/* Auto redirect message */}
                <p className="text-gray-400 text-xs">
                  Redirecting to login page in 3 seconds...
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Footer */}
        <p className="text-center text-gray-500 text-sm mt-6">
          © 2025 Scholars Press. All rights reserved.
        </p>
      </div>
    </div>
  );
}

export default ResetPassword;