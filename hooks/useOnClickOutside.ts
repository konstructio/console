import { useCallback, useEffect, RefObject } from 'react';

export function useOnClickOutside(
  ref: RefObject<HTMLButtonElement | HTMLDivElement>,
  handler: () => void,
) {
  const handleClickOutside = useCallback(() => {
    handler();
  }, [handler]);

  useEffect(() => {
    const listener = (event: MouseEvent | TouchEvent) => {
      if (!ref.current || (event.target instanceof Node && ref.current.contains(event.target))) {
        return;
      }
      handleClickOutside();
    };

    document.addEventListener('click', listener);

    return () => {
      document.removeEventListener('click', listener);
    };
  }, [ref, handleClickOutside]);
}
