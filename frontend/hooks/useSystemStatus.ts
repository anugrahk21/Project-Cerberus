import { useState, useEffect } from "react";
import { checkHealth } from "@/lib/api";

export function useSystemStatus(checkInterval = 30000) {
  const [isSystemOnline, setIsSystemOnline] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let mounted = true;

    const verifyHealth = async () => {
      try {
        const online = await checkHealth();
        if (mounted) {
          setIsSystemOnline(online);
          setIsLoading(false);
        }
      } catch (error) {
        if (mounted) {
          setIsSystemOnline(false);
          setIsLoading(false);
        }
      }
    };

    verifyHealth();
    const interval = setInterval(verifyHealth, checkInterval);

    return () => {
      mounted = false;
      clearInterval(interval);
    };
  }, [checkInterval]);

  return { isSystemOnline, isLoading };
}
