import Swal from "sweetalert2";
import "animate.css";

// Base toast configuration
const Toast = Swal.mixin({
  toast: true,
  position: "top-end",
  showConfirmButton: false,
  timer: 5000,
  timerProgressBar: true,
  showClass: {
    popup: "animate__animated animate__fadeInRight",
  },
  hideClass: {
    popup: "animate__animated animate__fadeOutRight",
  },
});

// Success Toast
export const showSuccess = (message) => {
  Toast.fire({
    icon: "success",
    title: message,
    background: "white",
    color: "#065f46",
    iconColor: "#16a34a",
    customClass: {
      popup: "rounded-xl shadow-lg border border-red-100",
      title: "text-sm font-medium",
    },
  });
};

// Error Toast
export const showError = (message) => {
  Toast.fire({
    icon: "error",
    title: message,
    background: "white", // soft red background
    color: "#991b1b", // professional deep red
    iconColor: "#ef4444", // modern red icon
    customClass: {
      popup: "rounded-xl shadow-lg border border-red-100",
      title: "text-sm font-medium",
    },
  });
};

// Warning Toast
export const showWarning = (message) => {
  Toast.fire({
    icon: "warning",
    title: message,
    background: "white",
    color: "#78350f",
    iconColor: "#f59e0b",
    customClass: {
      popup: "rounded-xl shadow-lg border border-red-100",
      title: "text-sm font-medium",
    },
  });
};

// Info Toast
export const showInfo = (message) => {
  Toast.fire({
    icon: "info",
    title: message,
  });
};
