import { useState, useEffect, useCallback } from "react";

const STORAGE_KEY = "otp-expiry";

export const useTimer = (initialSeconds: number = 60) => {
  const getRemainingTime = () => {
    const expiry = localStorage.getItem(STORAGE_KEY);

    if (!expiry) return 0;

    const diff = Math.floor((Number(expiry) - Date.now()) / 1000);
    return diff > 0 ? diff : 0;
  };

  const [timeLeft, setTimeLeft] = useState<number>(getRemainingTime);

  // countdown
  useEffect(() => {
    if (timeLeft <= 0) return;

    const interval = setInterval(() => {
      setTimeLeft((prev) => {
        const updated = prev - 1;

        if (updated <= 0) {
          localStorage.removeItem(STORAGE_KEY);
          return 0;
        }

        return updated;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [timeLeft]);

  // start / resend OTP
  const startTimer = useCallback(() => {
    const expiryTime = Date.now() + initialSeconds * 1000;

    localStorage.setItem(STORAGE_KEY, String(expiryTime));
    setTimeLeft(initialSeconds);
  }, [initialSeconds]);

  const formattedTime = `${String(Math.floor(timeLeft / 60)).padStart(
    2,
    "0"
  )}:${String(timeLeft % 60).padStart(2, "0")}`;

  return {
    timeLeft,
    formattedTime,
    startTimer,
    isActive: timeLeft > 0,
  };
};