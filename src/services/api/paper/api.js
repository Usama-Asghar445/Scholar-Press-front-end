import axios from "axios";
import { BASE_URL, API_ENDPOINTS } from "../../config";

const getAuthConfig = () => {
  const token = localStorage.getItem("authToken");
  return {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
};

export const getPapers = async (params = {}) => {
  try {
    const response = await axios.get(
      `${BASE_URL}${API_ENDPOINTS.paper.getPapers}`,
      {
        ...getAuthConfig(),
        params,
      },
    );

    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

export const getAssociateEditors = async () => {
  try {
    const response = await axios.get(
      `${BASE_URL}${API_ENDPOINTS.chiefEditor.getAssociateEditors}`,
      getAuthConfig(),
    );

    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

export const getReviewers = async () => {
  try {
    const response = await axios.get(
      `${BASE_URL}${API_ENDPOINTS.chiefEditor.getReviewers}`,
      getAuthConfig(),
    );

    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

export const getUserQualifications = async (userId) => {
  try {
    const response = await axios.get(
      `${BASE_URL}${API_ENDPOINTS.chiefEditor.getUserQualifications(userId)}`,
      getAuthConfig(),
    );

    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};
