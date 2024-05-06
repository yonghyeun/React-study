import { useContext, Dispatch, SetStateAction } from 'react';

import ModalContext from './Context';

type ModalContextType = [boolean, Dispatch<SetStateAction<boolean>>];

const useModal = (): ModalContextType => {
  const [isOpen, setIsOpen] = useContext(ModalContext);
  return [isOpen, setIsOpen];
};

export default useModal;
