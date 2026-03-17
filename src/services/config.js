
export const API_ENDPOINTS = {
  auth: {
    login: "/user/login",
    register: "/user/register",
    forgotPassword: "/user/forgot-password",
    verifyEmail: "/user/email-verify",
    resendCode: "/user/resend-code",
    resetPassword: "/user/reset-password",
    getUser: "/user/get",
  },
  profile: {
    completeProfile: "/user/complete-profile",
    updateProfile: "/user/update-profile",
  },
};

export const BASE_URL = "http://localhost:5000/api/v1";