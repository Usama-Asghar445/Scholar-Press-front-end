
import { FaLock, FaShieldAlt, FaEnvelope, FaArrowLeft, FaClock } from 'react-icons/fa';
import { Link, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import { useVerifyEmail } from "../../hooks/auth/useVerifyEmail";

function VerifyEmail() {
  const location = useLocation();
  const passedEmail = location.state?.email;

  const [timer, setTimer] = useState(600);

  const {
    email,
    setEmail,
    emailVerificationCode,
    setEmailVerificationCode,
    loading,
    handleVerifyEmail,
    handleResendCode,
  } = useVerifyEmail();

  const onResend = async () => {
    await handleResendCode();
    setTimer(600); // reset timer
  };

  // set passed email
  useEffect(() => {
    if (passedEmail) setEmail(passedEmail);
  }, [passedEmail, setEmail]);

  // countdown timer — stable interval
  useEffect(() => {
    const interval = setInterval(() => {
      setTimer((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const minutes = String(Math.floor(timer / 60)).padStart(2, "0");
  const seconds = String(timer % 60).padStart(2, "0");

  // submit handler
  const onSubmit = async (e) => {
    e.preventDefault();
    if (timer === 0) return;
    await handleVerifyEmail();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-100 via-orange-100 to-orange-200 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-2xl shadow-2xl border border-amber-100 overflow-hidden">
          <div className="bg-gradient-to-r from-orange-500 to-amber-500 px-6 py-6 text-center">
            <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <FaShieldAlt className="h-8 w-8 text-white" />
            </div>

            <h2 className="text-white text-2xl font-semibold">
              Enter Verification Code
            </h2>

            <p className="text-amber-100 text-sm mt-2">
              We've sent a 6-digit code to your email
            </p>
          </div>

          <div className="p-8">
            <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 mb-6 text-center">
              <div className="flex items-center justify-center gap-2 mb-2">
                <FaEnvelope className="h-5 w-5 text-amber-600" />
                <span className="text-sm text-amber-800 font-medium">
                  Code sent to:
                </span>
              </div>
              <p className="text-amber-900 font-semibold">
                {email || "No email found"}
              </p>
            </div>

            <form className="space-y-6" onSubmit={onSubmit}>
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700 block text-center">
                  Verification Code
                </label>

                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <FaLock className="h-5 w-5 text-amber-500" />
                  </div>

                  <input
                    type="text"
                    placeholder="000000"
                    maxLength="6"
                    value={emailVerificationCode}
                    onChange={(e) => setEmailVerificationCode(e.target.value)}
                    className="w-full pl-12 pr-4 py-4 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 bg-gray-50 hover:bg-white transition text-center tracking-[1em] font-bold text-2xl outline-none"
                  />
                </div>

                <p className="text-xs text-gray-500 text-center">
                  Enter the 6-digit code from your email
                </p>

                {/* {submitted && timer > 0 && (
                  <p className="text-red-600 text-center font-medium">
                    ❌ Invalid code, try again
                  </p>
                )} */}

                {timer === 0 && (
                  <p className="text-red-600 text-center font-medium">
                    ⏰ Code expired, please resend
                  </p>
                )}
              </div>

              {timer > 0 && (
                <div className="bg-gray-50 border border-gray-200 rounded-lg p-3 flex items-center justify-center gap-2">
                  <FaClock className="h-5 w-5 text-gray-500" />
                  <span className="text-sm text-gray-600">
                    Code expires in{" "}
                    <strong className="text-amber-600">
                      {minutes}:{seconds}
                    </strong>
                  </span>
                </div>
              )}

              <button
                type="submit"
                disabled={timer === 0 || loading}
                className={`w-full bg-gradient-to-r from-orange-500 to-amber-500 text-white py-4 rounded-lg font-semibold text-lg transition transform hover:scale-[1.02] shadow-lg hover:shadow-xl ${
                  timer === 0
                    ? "opacity-50 cursor-not-allowed"
                    : "hover:from-amber-600 hover:to-orange-600"
                }`}
              >
                {loading ? "Verifying..." : "Verify Code"}
              </button>

              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-200"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-4 bg-white text-gray-500">or</span>
                </div>
              </div>

              <div className="text-center">
                <p className="text-sm text-gray-600 mb-2">
                  Didn't receive the code?
                </p>

                <button
                  type="button"
                  onClick={onResend}
                  disabled={loading}
                  className="text-amber-600 hover:text-amber-700 font-semibold text-sm hover:underline"
                >
                  Resend Code
                </button>
              </div>

              <div className="bg-amber-50 border-l-4 border-amber-500 p-4 rounded">
                <h4 className="text-sm font-semibold text-amber-800 mb-2">
                  💡 Can't find the code?
                </h4>
                <ul className="text-xs text-amber-700 space-y-1">
                  <li>• Check your spam/junk folder</li>
                  <li>• Make sure you entered the correct email</li>
                  <li>• Wait a few minutes for the email to arrive</li>
                </ul>
              </div>

              <Link
                to="/user/login"
                className="flex items-center justify-center gap-2 text-gray-600 hover:text-amber-600 transition-colors pt-2"
              >
                <FaArrowLeft className="h-4 w-4" />
                <span className="text-sm font-medium">Back to Login</span>
              </Link>
            </form>
          </div>
        </div>

        <p className="text-center text-gray-500 text-sm mt-6">
          © 2025 Scholars Press. All rights reserved.
        </p>

        <div className="mt-4 text-center">
          <p className="text-xs text-gray-600">
            Need help?{" "}
            <Link to="/contact" className="text-amber-600 hover:underline">
              Contact Support
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default VerifyEmail;
