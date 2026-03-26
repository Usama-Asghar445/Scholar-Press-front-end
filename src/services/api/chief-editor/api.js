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

export const getChiefEditorPapers = async () => {
  try {
    const response = await axios.post(
      `${BASE_URL}${API_ENDPOINTS.chiefEditor.getPapers}`,
      {},
      getAuthConfig()
    );
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

export const updatePaperStatus = async (id, status) => {
  try {
    const response = await axios.put(
      `${BASE_URL}${API_ENDPOINTS.chiefEditor.updateStatus(id)}`,
      { status },
      getAuthConfig()
    );
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

export const getPublishedPapers = async () => {
  try {
    const response = await axios.get(
      `${BASE_URL}${API_ENDPOINTS.chiefEditor.getPublishedPapers}`,
      getAuthConfig()
    );
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

export const getChiefEditorStats = async () => {
  try {
    const response = await axios.post(
      `${BASE_URL}${API_ENDPOINTS.chiefEditor.getPapers}`,
      {},
      getAuthConfig()
    );
    const papers = response.data.data;

    const stats = {
      total: papers.length,
      submitted: papers.filter((p) => p.status === "Submitted").length,
      underReview: papers.filter((p) => p.status === "Under Review").length,
      accepted: papers.filter((p) => p.status === "Accepted").length,
      rejected: papers.filter((p) => p.status === "Rejected").length,
      published: papers.filter((p) => p.status === "Published").length,
      minorRevision: papers.filter((p) => p.status === "Minor Revision").length,
      majorRevision: papers.filter((p) => p.status === "Major Revision").length,
    };

    return { success: true, data: stats };
  } catch (error) {
    throw error.response?.data || error.message;
  }
};
