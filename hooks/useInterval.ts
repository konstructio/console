import { useEffect } from 'react';

export function useInterval(callback: () => void, ms?: number) {
  useEffect(() => {
    const interval = setInterval(callback, ms);
    return () => {
      clearInterval(interval);
    };
  }, [callback, ms]);
}
