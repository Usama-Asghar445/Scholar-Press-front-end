
import { useState } from "react";
import { forgotPassword } from "../../services/api/auth/api";
import { useNavigate } from "react-router-dom";
import { showError, showSuccess, showWarning } from "../../utils/swal";

export const useForgotPassword = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const handleForgotPassword = async () => {
    if (!email) {
      showWarning("Email is required");
      return;
    }
    try {
      setLoading(true);
      const data = await forgotPassword(email);
      showSuccess(data.message || "Operation successful!");
      navigate("/auth/email-instructions", { state: { email } });
    } catch (err) {
      showError(err.response?.data?.message || "Something went wrong!");
    } finally {
      setLoading(false);
    }
  };

  return { email, setEmail, loading, handleForgotPassword };
};
