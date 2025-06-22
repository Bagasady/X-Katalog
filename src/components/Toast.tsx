import React, { useEffect } from "react";

interface ToastProps {
  message: string;
  type?: "success" | "error";
  onClose: () => void;
  duration?: number;
}

const Toast: React.FC<ToastProps> = ({
  message,
  type = "success",
  onClose,
  duration = 3000,
}) => {
  useEffect(() => {
    const timer = setTimeout(onClose, duration);
    return () => clearTimeout(timer);
  }, [onClose, duration]);

  return (
    <div
      className={`fixed top-6 right-6 z-50 px-6 py-4 rounded-xl shadow-lg text-white text-base font-semibold flex items-center gap-3 transition-all animate-fade-in-up
        ${type === "success" ? "bg-emerald-500" : "bg-red-500"}
      `}
      style={{ minWidth: 220 }}
    >
      {type === "success" ? (
        <svg
          className="w-5 h-5"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M5 13l4 4L19 7"
          />
        </svg>
      ) : (
        <svg
          className="w-5 h-5"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>
      )}
      <span>{message}</span>
      <button
        onClick={onClose}
        className="ml-2 text-white/80 hover:text-white focus:outline-none"
      >
        ×
      </button>
    </div>
  );
};

export default Toast;
