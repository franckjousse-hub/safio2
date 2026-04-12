"use client";

import { createContext, useContext, useState, useCallback, ReactNode } from "react";

interface ToastContextType {
  showToast: (message: string) => void;
}

const ToastContext = createContext<ToastContextType>({ showToast: () => {} });

export function useToast() {
  return useContext(ToastContext);
}

export function ToastProvider({ children }: { children: ReactNode }) {
  const [message, setMessage] = useState("");
  const [visible, setVisible] = useState(false);

  const showToast = useCallback((msg: string) => {
    setMessage(msg);
    setVisible(true);
    setTimeout(() => setVisible(false), 2800);
  }, []);

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      <div
        className={`fixed bottom-24 left-1/2 -translate-x-1/2 bg-ss-card border border-ss-border rounded-[14px] px-5 py-3 text-[13px] whitespace-nowrap z-[300] transition-all duration-300 pointer-events-none ${
          visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"
        }`}
      >
        {message}
      </div>
    </ToastContext.Provider>
  );
}
