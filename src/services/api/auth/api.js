import { BASE_URL, API_ENDPOINTS } from "../../config";
import axios from "axios";



export const login = async (email, password) => {
  const res = await axios.post(`${BASE_URL}${API_ENDPOINTS.auth.login}`, {
    email,
    password,
  });

  return res.data;
};

export const register = async (
  firstName,
  lastName,
  phone,
  email,
  password,
  agreed,
) => {
  const res = await axios.post(`${BASE_URL}${API_ENDPOINTS.auth.register}`, {
    firstName,
    lastName,
    phone,
    email,
    password,
    agreed,
  });

  return res.data;
};

export const forgotPassword = async (email) => {
  const res = await axios.post(
    `${BASE_URL}${API_ENDPOINTS.auth.forgotPassword}`,
    {
      email,
    },
  );

  return res.data;
};

export const verifyEmail = async (email, emailVerificationCode) => {
  const res = await axios.post(`${BASE_URL}${API_ENDPOINTS.auth.verifyEmail}`, {
    email,
    emailVerificationCode,
  });

  return res.data;
};

export const resendCode = async (email) => {
  const res = await axios.post(`${BASE_URL}${API_ENDPOINTS.auth.resendCode}`, {
    email,
  });

  return res.data;
};

export const resetPassword = async (data) => {
  const response = await axios.post(
    `${BASE_URL}${API_ENDPOINTS.auth.resetPassword}`,
    {
      email: data.email,
      emailVerificationCode: data.emailVerificationCode,
      newPassword: data.newPassword,
    },
  );

  return response.data;
};

export const getUser = async () => {
  const token = localStorage.getItem("authToken");

  const response = await axios.get(`${BASE_URL}${API_ENDPOINTS.auth.getUser}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
};

export const logoutUser = () => {
  localStorage.removeItem("authToken");
  window.location.href = "/auth/login";
};
