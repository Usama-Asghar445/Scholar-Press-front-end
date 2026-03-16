import { useLocation, Link } from "react-router-dom";
import { FaEnvelopeOpenText, FaArrowLeft, FaCheckCircle } from "react-icons/fa";

function EmailInstructions() {
  const location = useLocation();
  const email = location.state?.email || "";

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md relative z-10">
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100">
          {/* Header */}
          <div className="bg-gradient-to-r from-blue-700 to-blue-800 px-8 py-3 relative overflow-hidden">
            <div className="absolute top-0 right-0 -mr-8 -mt-8 w-32 h-32 bg-white/10 rounded-full blur-2xl" />
            <div className="absolute bottom-0 left-0 -ml-8 -mb-8 w-32 h-32 bg-white/10 rounded-full blur-2xl" />

            <div className="flex justify-center mb-2 relative z-10">
              <div className="w-11 h-11 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center border-2 border-white/30 shadow-inner">
                <FaEnvelopeOpenText className="h-5 w-5 text-white" />
              </div>
            </div>

            <h2 className="text-white text-xl font-bold text-center relative z-10 tracking-tight">
              Check Your Email
            </h2>
            <p className="text-blue-100 text-center mt-2 text-sm relative z-10 font-medium">
              We've sent verification instructions
            </p>
          </div>

          {/* Body */}
          <div className="p-8 space-y-6">
            {/* Email Display */}
            <div className="bg-blue-50 border border-blue-100 rounded-xl p-3 text-center relative overflow-hidden">
              <div className="absolute top-0 right-0 p-2 opacity-20">
                <FaEnvelopeOpenText className="w-8 h-8 text-blue-600" />
              </div>
              <p className="text-sm text-blue-600 mb-1 font-semibold uppercase tracking-wide">
                Sent to
              </p>
              <p className="font-semibold text-amber-600 text-sm break-all">
                {email || "your-email@example.com"}
              </p>
            </div>

            {/* Instructions */}
            <div className="space-y-4">
              <h4 className="font-bold text-gray-800 text-sm uppercase tracking-wide border-b border-gray-100 pb-2">
                Next Steps
              </h4>

              <ul className="space-y-3">
                {[
                  "Check your inbox for an email from ScholarPress.",
                  "Click the verification link or copy the code.",
                  "Return here to continue your sign-in process.",
                ].map((step, index) => (
                  <li
                    key={index}
                    className="flex items-start gap-3 text-sm text-gray-600"
                  >
                    <FaCheckCircle className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" />
                    <span>{step}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Divider */}
            <div className="border-t border-gray-100 pt-6">
              <p className="text-xs text-center text-gray-400 mb-6">
                Didn't receive the email?{" "}
                <span className="text-blue-600 hover:text-blue-700 font-semibold cursor-pointer transition-colors">
                  Resend
                </span>
              </p>

              {/* Button */}
              <Link
                to="/auth/login"
                className="w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white py-2 rounded-lg font-bold text-lg hover:from-blue-700 hover:to-blue-800 transform hover:scale-[1.01] active:scale-[0.99] transition-all shadow-lg hover:shadow-blue-500/30 flex items-center justify-center gap-2 group"
              >
                <FaArrowLeft className="h-4 w-4 group-hover:-translate-x-1 transition-transform" />
                Back to Login
              </Link>
            </div>
          </div>
        </div>

        {/* Footer */}
        <p className="text-center text-gray-400 text-xs mt-8">
          © 2025 ScholarPress. All rights reserved.
        </p>
      </div>
    </div>
  );
}

export default EmailInstructions;
