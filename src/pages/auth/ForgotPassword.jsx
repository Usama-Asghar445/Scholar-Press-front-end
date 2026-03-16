
import { 
  FaEnvelope, 
  FaArrowLeft, 
  FaKey 
} from "react-icons/fa";
import { Link } from "react-router-dom";
import { useForgotPassword } from "../../hooks/auth/useForgotPassword";

function ForgotPassword() {
  const { email, setEmail, loading, handleForgotPassword } = useForgotPassword();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await handleForgotPassword();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden">
          <div className="bg-gradient-to-r from-blue-600 to-indigo-600  py-3 text-center">
            <div className="flex justify-center mb-3">
              <div className="w-14 h-14 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
                <FaKey className="text-white text-lg" />
              </div>
            </div>

            <h2 className="text-white text-xl font-bold">
              Forgot Password
            </h2>
            <p className="text-blue-100 text-sm mt-1">
              Enter your email to receive reset instructions
            </p>
          </div>

          {/* Form Section */}
          <div className="p-8">
            <form onSubmit={handleSubmit} className="space-y-6">

              <div>
                <label className="block text-sm font-semibold text-gray-600 mb-2">
                  Email Address
                </label>

                <div className="relative">
                  <FaEnvelope className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />

                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                    required
                    className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all outline-none"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-semibold transition-all shadow-md hover:shadow-lg disabled:opacity-60"
              >
                {loading ? "Sending..." : "Send Reset Link"}
              </button>

              <div className="text-center pt-2">
                <Link
                  to="/auth/login"
                  className="inline-flex items-center gap-2 text-gray-500 hover:text-blue-600 text-sm font-medium transition-colors"
                >
                  <FaArrowLeft className="text-xs" />
                  Back to Login
                </Link>
              </div>

            </form>
          </div>
        </div>

        <p className="text-center text-gray-400 text-xs mt-6">
          © 2025 ScholarPress. All rights reserved.
        </p>
      </div>
    </div>
  );
}
export default ForgotPassword;
