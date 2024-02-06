import { useEffect, useState } from 'react';

export function useDebouncedPromise<T, P>(
  func: (param: P) => Promise<T>,
  delay: number,
): (param: P) => Promise<T> {
  const [timeoutId, setTimeoutId] = useState<NodeJS.Timeout | null>(null);

  useEffect(() => {
    return () => {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
    };
  }, [timeoutId]);

  return (param: P) => {
    return new Promise<T>((resolve, reject) => {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }

      const newTimeoutId = setTimeout(() => {
        func(param).then(resolve).catch(reject);
      }, delay);

      setTimeoutId(newTimeoutId);
    });
  };
}
