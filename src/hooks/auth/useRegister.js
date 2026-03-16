// service/useRegister.js
import { useState } from "react";
import { register } from "../../services/api/auth/api";
import { useNavigate } from "react-router-dom";
import { showSuccess, showError, showWarning } from "../../utils/swal";

export const useRegister = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [agreed, setAgreed] = useState(false);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    if (!agreed) {
      showWarning("Please agree to Terms and Privacy Policy to continue");
      return;
    }

    try {
      setLoading(true);

      const res = await register(
        firstName,
        lastName,
        phone,
        email,
        password,
        agreed,
      );

      showSuccess(res.message || "Registration successful!");

      navigate("/auth/email-verify", {
        state: { email },
      });
    } catch (err) {
      const msg = err.response?.data?.message || "Registration failed";
      showError(msg);
    } finally {
      setLoading(false);
    }
  };

  return {
    firstName,
    setFirstName,
    lastName,
    setLastName,
    phone,
    setPhone,
    email,
    setEmail,
    password,
    setPassword,
    agreed,
    setAgreed,
    loading,
    handleRegister,
  };
};
