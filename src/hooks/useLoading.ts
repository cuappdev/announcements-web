import { useEffect, useState } from "react";

export const useLoading = (duration: number, canDismiss: boolean) => {
  const [isLoading, setIsLoading] = useState(true);
  const [scale, setScale] = useState(1);

  useEffect(() => {
    if (!canDismiss) {
      const interval = setInterval(() => {
        setScale(prevScale => prevScale === 1 ? 0.5 : 1);
      }, duration);

      return () => clearInterval(interval);
    } else {
      const timer = setTimeout(() => {
        setIsLoading(false);
      }, duration);

      return () => clearTimeout(timer);
    }
  }, [duration, canDismiss]);

  return { isLoading, scale };
};
