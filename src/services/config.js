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
    resubmit: (id) => `/paper/resubmit/${id}`,
  },
  workflow: {
    assignFieldEditor: "/editor-in-chief/paper-management/assign-editor",
    assignAE: "/editor-in-chief/paper-management/assign-ae",
    assignReviewers: "/editor-in-chief/paper-management/assign-reviewers",
    reviewSummary: (paperId) =>
      `/editor-in-chief/paper-management/review-summary/${paperId}`,
    submitReview: "/review/submit",
    getPaperReviews: (paperId) => `/review/paper/${paperId}`,
    getMyReviews: "/review/my-reviews",
  },
  chiefEditor: {
    // Role Management
    getPendingApplications:
      "/editor-in-chief/role-management/get-pending-applications",
    acceptRoleStatus: "/editor-in-chief/role-management/accept-role-status",
    getUsers: "/editor-in-chief/role-management/users",
    getUserProfile: (id) => `/editor-in-chief/role-management/users/${id}`,
    getPapers: "/editor-in-chief/paper-management/get-papers",
    updateStatus: (id) =>
      `/editor-in-chief/paper-management/update-status/${id}`,
    getPublishedPapers: "/editor-in-chief/paper-management/published-papers",
  },
};

export const BASE_URL = "http://localhost:5000/api/v1";
