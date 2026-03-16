
export const API_ENDPOINTS = {
  auth: {
    login: "/auth/login",
    register: "/auth/register",
    forgotPassword: "/auth/forgot-password",
    verifyEmail: "/auth/verify-email",
    resendCode: "/auth/resend-code",
    resetPassword: "/auth/reset-password",
    getUser: "/user/get",
  },
  profile: {
    completeProfile: "/user/complete-profile",
    updateProfile: "/user/update-profile",
  },
};

export const BASE_URL = "http://localhost:5000/api/v1";