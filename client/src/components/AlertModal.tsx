import { useEffect, useState } from "react";

type AlertType = "success" | "danger";

interface Props {
  type: AlertType;
  title: string;
  message: string;
  subMessage?: string;
  confirmLabel: string;
  cancelLabel?: string;
  autoClose?: boolean;
  onConfirm: () => void;
  onCancel?: () => void;
}

export default function AlertModal({
  type,
  title,
  message,
  subMessage,
  confirmLabel,
  cancelLabel,
  autoClose = false,
  onConfirm,
  onCancel,
}: Props) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const enterTimer = setTimeout(() => setVisible(true), 10);

    if (autoClose) {
      const exitTimer = setTimeout(() => {
        setVisible(false);
        setTimeout(onConfirm, 400);
      }, 3000);
      return () => {
        clearTimeout(enterTimer);
        clearTimeout(exitTimer);
      };
    }

    return () => clearTimeout(enterTimer);
  }, [autoClose, onConfirm]);

  const handleCancel = () => {
    setVisible(false);
    setTimeout(() => onCancel?.(), 400);
  };

  const handleConfirm = () => {
    setVisible(false);
    setTimeout(() => onConfirm(), 400);
  };

  const isSuccess = type === "success";

  const iconBgColor = isSuccess ? "bg-green-100" : "bg-red-100";
  const innerBgColor = isSuccess ? "bg-green-500" : "bg-red-500";
  const confirmBtnColor = isSuccess
    ? "bg-green-500 hover:bg-green-600"
    : "bg-red-500 hover:bg-red-600";
  const subTextColor = isSuccess ? "text-green-600" : "text-gray-800";

  return (
    <>
      {/* Backdrop */}
      <div
        className={`fixed inset-0 z-40 bg-black transition-all duration-400 ${
          visible ? "opacity-40" : "opacity-0"
        }`}
        onClick={handleCancel}
      />

      {/* Modal */}
      <div
        className={`fixed inset-0 z-50 flex items-center justify-center pointer-events-none transition-all duration-400 ${
          visible ? "opacity-100 scale-100" : "opacity-0 scale-90"
        }`}
      >
        <div className="bg-white rounded-3xl shadow-2xl px-8 py-8 max-w-sm w-full mx-4 pointer-events-auto text-center">

          {/* Icon */}
          <div className="flex items-center justify-center mb-5">
            <div className={`w-20 h-20 rounded-full ${iconBgColor} flex items-center justify-center transition-all duration-500 ${visible ? "scale-100" : "scale-0"}`}>
              <div className={`w-14 h-14 rounded-full ${innerBgColor} flex items-center justify-center transition-all duration-500 delay-100 ${visible ? "scale-100" : "scale-0"}`}>
                {isSuccess ? (
                  <svg
                    className={`w-7 h-7 text-white transition-all duration-300 delay-200 ${visible ? "opacity-100" : "opacity-0"}`}
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={3}
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                ) : (
                  <svg
                    className={`w-7 h-7 text-white transition-all duration-300 delay-200 ${visible ? "opacity-100" : "opacity-0"}`}
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                )}
              </div>
            </div>
          </div>

          {/* Text */}
          <h2 className="text-xl font-bold text-gray-800 mb-2">{title}</h2>
          <p className="text-gray-500 text-sm mb-1">{message}</p>
          {subMessage && (
            <p className={`font-semibold text-sm mb-7 truncate px-4 ${subTextColor}`}>
              "{subMessage}"
            </p>
          )}

          {/* Buttons */}
          <div className={`flex gap-3 ${!cancelLabel ? "justify-center" : ""}`}>
            {cancelLabel && (
              <button
                onClick={handleCancel}
                className="flex-1 py-3 rounded-2xl border border-gray-200 text-gray-600 text-sm font-semibold hover:bg-gray-50 transition-colors"
              >
                {cancelLabel}
              </button>
            )}
            <button
              onClick={handleConfirm}
              className={`flex-1 py-3 rounded-2xl text-white text-sm font-semibold transition-all active:scale-95 ${confirmBtnColor}`}
            >
              {confirmLabel}
            </button>
          </div>
        </div>
      </div>
    </>
  );
}