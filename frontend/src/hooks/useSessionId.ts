import { useEffect, useState } from "react";

function generateSessionId(): string {
  return `sess_${crypto.randomUUID ? crypto.randomUUID() : Math.random().toString(36).slice(2)}`;
}

export function useSessionId(): string {
  const [sessionId, setSessionId] = useState<string>("");

  useEffect(() => {
    const existing = window.localStorage.getItem("triptweak_session_id");
    if (existing) {
      setSessionId(existing);
    } else {
      const newId = generateSessionId();
      window.localStorage.setItem("triptweak_session_id", newId);
      setSessionId(newId);
    }
  }, []);

  return sessionId;
}
