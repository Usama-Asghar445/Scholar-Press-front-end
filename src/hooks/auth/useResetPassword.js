import { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import Swal from "sweetalert2";
import { resetPassword } from "../../services/api/auth/api";
import { showError, showSuccess, showWarning } from "../../utils/swal";

export const useResetPassword = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  // Get email and code from URL parameters
  const email = searchParams.get("email");
  const code = searchParams.get("code");

  const [formData, setFormData] = useState({
    password: "",
    confirmPassword: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [isSuccess, setIsSuccess] = useState(false);

  // Password strength checker
  const getPasswordStrength = (password) => {
    let strength = 0;
    if (password.length >= 6) strength++;
    if (password.length >= 8) strength++;
    if (/[a-z]/.test(password)) strength++;
    if (/[A-Z]/.test(password)) strength++;
    if (/[0-9]/.test(password)) strength++;
    if (/[^a-zA-Z0-9]/.test(password)) strength++;

    if (strength <= 2)
      return { label: "Weak", color: "bg-red-500", width: "w-1/4" };
    if (strength <= 4)
      return { label: "Medium", color: "bg-yellow-500", width: "w-2/4" };
    if (strength <= 5)
      return { label: "Strong", color: "bg-green-500", width: "w-3/4" };
    return { label: "Very Strong", color: "bg-green-600", width: "w-full" };
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    // Clear error when user types
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = "Please confirm your password";
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate email and code from URL
    if (!email || !code) {
      showWarning(
        "The reset password link is invalid or expired. Please request a new one.",
      );
      return;
    }

    if (!validateForm()) return;

    setLoading(true);

    try {
      // Call the API
      const data = await resetPassword({
        email: email,
        emailVerificationCode: code,
        newPassword: formData.password,
      });

      if (data.token) {
        localStorage.setItem("authToken", data.token);
        localStorage.setItem("userRole", data.role);
      }

      setIsSuccess(true);

      showSuccess(data.message || "Your password has been reset successfully.");

      // Redirect to login after 3 seconds
      //   setTimeout(() => {
      //     navigate("/user/login");
      //   }, 3000);
    } catch (error) {
      console.error("Password reset error:", error);

      let errorMessage = "Password reset failed. Please try again.";

      if (error.response?.data?.message) {
        errorMessage = error.response.data.message;
      } else if (error.message) {
        errorMessage = error.message;
      }

      showError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const handleGoToDashboard = () => {
    const role = localStorage.getItem("userRole");

    if (role === "Editor in Chief") {
      navigate("/chief-editor");
    } else if (role === "Associate Editor") {
      navigate("/associate-editor");
    } else if (role === "Editor") {
      navigate("/editor");
    } else if (role === "Reviewer") {
      navigate("/reviewer");
    } else {
      navigate("/author");
    }
  };

  return {
    formData,
    showPassword,
    showConfirmPassword,
    loading,
    errors,
    isSuccess,
    email,
    code,
    getPasswordStrength,
    handleChange,
    handleSubmit,
    handleGoToDashboard,
    setShowPassword,
    setShowConfirmPassword,
  };
};
