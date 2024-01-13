import { useState, useCallback, useEffect } from 'react';

export interface IUseModal {
  isOpen: boolean;
  openModal(): void;
  closeModal(): void;
}

const useModal = (defaultState = false): IUseModal => {
  const [isOpen, setIsOpen] = useState(defaultState);

  const openModal = useCallback(() => {
    setIsOpen(true);
  }, []);

  const closeModal = useCallback(() => setIsOpen(false), []);

  useEffect(() => {
    setIsOpen(defaultState);
  }, [defaultState]);

  return { isOpen, openModal, closeModal };
};

export default useModal;
