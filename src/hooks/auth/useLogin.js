// service/useLogin.js
import { useState } from "react";
import { login } from "../../services/api/auth/api";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import { showError, showSuccess } from "../../utils/swal";

export const useLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    try {
      e.preventDefault();

      setLoading(true);
      const data = await login(email, password);

      localStorage.setItem("authToken", data.token);
      localStorage.setItem("userRole", data.role);
      showSuccess(data.message || "Welcome back!");

      if (data.role === "Editor in Chief") {
        navigate("/chief-editor");
      } else if (data.role === "Associate Editor") {
        navigate("/associate-editor");
      } else if (data.role === "Editor") {
        navigate("/editor");
      } else if (data.role === "Reviewer") {
        navigate("/reviewer");
      } else {
        navigate("/author");
      }
    } catch (err) {
      const msg = err.response?.data?.message || "Login failed";

      showError(msg);
    } finally {
      setLoading(false);
    }
  };

  return {
    email,
    setEmail,
    password,
    setPassword,
    loading,
    handleLogin,
  };
};
