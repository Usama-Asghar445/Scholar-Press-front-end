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
    applyForRole: "/role/applied-for-role",
  },
  role: {
    applyForRole: "/role/applied-for-role",
  },
  paper: {
    submit: "/paper/submit",
    getMyPapers: "/paper/my-papers",
    getPaperStatusCounts: "/paper/status-counts",
    getPaperDetails: (id) => `/paper/details/${id}`,
  },
};

export const BASE_URL = "http://localhost:5000/api/v1";
