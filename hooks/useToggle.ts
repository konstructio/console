import { useCallback, useState } from 'react';

export default function useToggle(defaultState = false) {
  const [isOpen, setIsOpen] = useState(defaultState);
  const open = useCallback(() => {
    setIsOpen(true);
  }, []);
  const close = useCallback(() => setIsOpen(false), []);

  return { isOpen, open, close };
}
