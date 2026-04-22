import { useEffect, useState } from "react";

interface Props {
  title: string;
  onDone: () => void;
}

export default function CompletionAlert({ title, onDone }: Props) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const enterTimer = setTimeout(() => setVisible(true), 10);
    const exitTimer = setTimeout(() => {
      setVisible(false);
      setTimeout(onDone, 400);
    }, 3000);

    return () => {
      clearTimeout(enterTimer);
      clearTimeout(exitTimer);
    };
  }, [onDone]);

  return (
    <>
      <div
        className={`fixed inset-0 z-40 bg-black transition-all duration-400 ${
          visible ? "opacity-40" : "opacity-0"
        }`}
        onClick={() => {
          setVisible(false);
          setTimeout(onDone, 400);
        }}
      />
      <div
        className={`fixed inset-0 z-50 flex items-center justify-center pointer-events-none transition-all duration-400 ${
          visible ? "opacity-100 scale-100" : "opacity-0 scale-90"
        }`}
      >
        <div className="bg-white rounded-3xl shadow-2xl px-10 py-10 max-w-sm w-full mx-4 pointer-events-auto text-center">
          <div className="flex items-center justify-center mb-6">
            <div className={`w-20 h-20 rounded-full bg-green-100 flex items-center justify-center transition-all duration-500 ${visible ? "scale-100" : "scale-0"}`}>
              <div className={`w-14 h-14 rounded-full bg-green-500 flex items-center justify-center transition-all duration-500 delay-100 ${visible ? "scale-100" : "scale-0"}`}>
                <svg
                  className={`w-7 h-7 text-white transition-all duration-300 delay-200 ${visible ? "opacity-100" : "opacity-0"}`}
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={3}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              </div>
            </div>
          </div>

          <h2 className="text-2xl font-bold text-gray-800 mb-2">Awesome! 🎉</h2>
          <p className="text-gray-500 text-sm mb-1">You completed another task</p>
          <p className="text-green-600 font-semibold text-base mb-7 truncate px-4">
            "{title}"
          </p>
          <button
            onClick={() => {
              setVisible(false);
              setTimeout(onDone, 400);
            }}
            className="w-full bg-green-500 hover:bg-green-600 active:scale-95 text-white font-semibold py-3 rounded-2xl transition-all duration-200"
          >
            Go Back!
          </button>
        </div>
      </div>
    </>
  );
}