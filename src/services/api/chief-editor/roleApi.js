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

export const getPendingApplications = async () => {
  try {
    const response = await axios.get(
      `${BASE_URL}${API_ENDPOINTS.chiefEditor.getPendingApplications}`,
      getAuthConfig()
    );
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

export const updateRoleStatus = async (userId, role, action, chiefNote) => {
  try {
    const response = await axios.patch(
      `${BASE_URL}${API_ENDPOINTS.chiefEditor.acceptRoleStatus}`,
      { userId, role, action, chiefNote },
      getAuthConfig()
    );
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

export const getAllUsers = async (role = "All") => {
  try {
    const response = await axios.get(
      `${BASE_URL}${API_ENDPOINTS.chiefEditor.getUsers}?role=${role}`,
      getAuthConfig()
    );
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

export const getUserFullProfile = async (userId) => {
  try {
    const response = await axios.get(
      `${BASE_URL}${API_ENDPOINTS.chiefEditor.getUserProfile(userId)}`,
      getAuthConfig()
    );
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};
