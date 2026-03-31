import axios from "axios";
import { BASE_URL, API_ENDPOINTS } from "../../config";

const getAuthHeaders = () => {
  const token = localStorage.getItem("authToken");
  return {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
};

export const assignFieldEditor = async (paperId, editorId) => {
  const response = await axios.post(
    `${BASE_URL}${API_ENDPOINTS.workflow.assignFieldEditor}`,
    { paperId, editorId },
    getAuthHeaders(),
  );
  return response.data;
};

export const assignAE = async (paperId, aeId) => {
  const response = await axios.post(
    `${BASE_URL}${API_ENDPOINTS.workflow.assignAE}`,
    { paperId, aeId },
    getAuthHeaders(),
  );
  return response.data;
};

export const assignReviewers = async (paperId, reviewerIds) => {
  const response = await axios.post(
    `${BASE_URL}${API_ENDPOINTS.workflow.assignReviewers}`,
    { paperId, reviewerIds },
    getAuthHeaders(),
  );
  return response.data;
};

export const getReviewSummary = async (paperId) => {
  const response = await axios.get(
    `${BASE_URL}${API_ENDPOINTS.workflow.reviewSummary(paperId)}`,
    getAuthHeaders(),
  );
  return response.data;
};

export const submitReview = async (paperId, recommendation, comments) => {
  const response = await axios.post(
    `${BASE_URL}${API_ENDPOINTS.workflow.submitReview}`,
    { paperId, recommendation, comments },
    getAuthHeaders(),
  );
  return response.data;
};

export const getPaperReviews = async (paperId) => {
  const response = await axios.get(
    `${BASE_URL}${API_ENDPOINTS.workflow.getPaperReviews(paperId)}`,
    getAuthHeaders(),
  );
  return response.data;
};

export const getMyReviews = async () => {
  const response = await axios.get(
    `${BASE_URL}${API_ENDPOINTS.workflow.getMyReviews}`,
    getAuthHeaders(),
  );
  return response.data;
};
