// service/useVerifyEmail.js
import { useState } from "react";
import { verifyEmail, resendCode } from "../../services/api/auth/api";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import { showError, showSuccess, showWarning } from "../../utils/swal";

export const useVerifyEmail = () => {
  const [email, setEmail] = useState("");
  const [emailVerificationCode, setEmailVerificationCode] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleVerifyEmail = async () => {
    if (!email || !emailVerificationCode) {
      showWarning("Email or verification code missing");
      return;
    }

    try {
      setLoading(true);

      const data = await verifyEmail(email, emailVerificationCode);
      localStorage.setItem("authToken", data.token);
      //read token
      // const token = localStorage.getItem("authToken");

      showSuccess("Account verified successfully");

      navigate("/author");
    } catch (err) {
      const msg = err.response?.data?.message || "Verification failed";

      showError(msg);
    } finally {
      setLoading(false);
    }
  };

  const handleResendCode = async () => {
    if (!email) {
      Swal.fire({
        icon: "warning",
        title: "Missing email",
        text: "Cannot resend code without email",
        position: "top-end",
        toast: true,
        timer: 3000,
        showConfirmButton: false,
      });
      return;
    }

    try {
      setLoading(true);

      const data = await resendCode(email);

      Swal.fire({
        icon: "success",
        title: "Code resent!",
        text: data.message || "New verification code sent",
        position: "top-end",
        toast: true,
        timer: 3000,
        showConfirmButton: false,
      });
    } catch (err) {
      Swal.fire({
        icon: "error",
        title: "Failed",
        text: err.response?.data?.message || "Resend failed",
        position: "top-end",
        toast: true,
        timer: 3000,
        showConfirmButton: false,
      });
    } finally {
      setLoading(false);
    }
  };

  return {
    email,
    setEmail,
    emailVerificationCode,
    setEmailVerificationCode,
    loading,
    handleVerifyEmail,
    handleResendCode,
  };
};
