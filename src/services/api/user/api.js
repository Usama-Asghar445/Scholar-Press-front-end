import { BASE_URL, API_ENDPOINTS } from "../../config";
import axios from "axios";

export const getRelatedUsers = async () => {
  const token = localStorage.getItem("authToken");

  const response = await axios.get(
    `${BASE_URL}${API_ENDPOINTS.user.getRelatedUsers}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );

  return response.data;
};
