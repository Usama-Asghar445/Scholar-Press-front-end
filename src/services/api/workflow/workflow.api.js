import axios from "axios";
import { BASE_URL } from "../../config";

const getAuthConfig = () => {
  const token = localStorage.getItem("authToken");
  return {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
};

const API_PATH = `${BASE_URL}/api/v1/paper/workflow`;

export const deskReject = async (paperId, comments) => {
  const response = await axios.post(`${API_PATH}/desk-reject`, { paperId, comments }, getAuthConfig());
  return response.data;
};

export const assignHandlingEditor = async (paperId, editorId) => {
  const response = await axios.post(`${API_PATH}/assign-handling-editor`, { paperId, editorId }, getAuthConfig());
  return response.data;
};

export const finalDecision = async (paperId, decision, comments) => {
  const response = await axios.post(`${API_PATH}/final-decision`, { paperId, decision, comments }, getAuthConfig());
  return response.data;
};

export const publishPaper = async (paperId) => {
  const response = await axios.post(`${API_PATH}/publish`, { paperId }, getAuthConfig());
  return response.data;
};

export const assignAssociateEditor = async (paperId, associateEditorId) => {
  const response = await axios.post(`${API_PATH}/assign-associate-editor`, { paperId, associateEditorId }, getAuthConfig());
  return response.data;
};

export const assignReviewers = async (paperId, reviewerIds) => {
  const response = await axios.post(`${API_PATH}/assign-reviewers`, { paperId, reviewerIds }, getAuthConfig());
  return response.data;
};

export const recommendDecision = async (paperId, recommendation, comments) => {
  const response = await axios.post(`${API_PATH}/recommend-decision`, { paperId, recommendation, comments }, getAuthConfig());
  return response.data;
};

export const respondInvitation = async (paperId, response) => {
  const res = await axios.post(`${API_PATH}/respond-invitation`, { paperId, response }, getAuthConfig());
  return res.data;
};

export const submitReview = async (paperId, decision, comments) => {
  const response = await axios.post(`${API_PATH}/submit-review`, { paperId, decision, comments }, getAuthConfig());
  return response.data;
};

export const submitRevision = async (paperId, updatedFileData) => {
  const response = await axios.post(`${API_PATH}/submit-revision`, { paperId, updatedFileData }, getAuthConfig());
  return response.data;
};
