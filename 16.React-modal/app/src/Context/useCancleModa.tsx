import { useContext, Dispatch, SetStateAction } from 'react';

import { CancleContext } from './Context';

type ModalContextType = [boolean, Dispatch<SetStateAction<boolean>>];

const useCancleModal = (): ModalContextType => {
  const [isCancle, setIsCancle] = useContext(CancleContext);
  return [isCancle, setIsCancle];
};

export default useCancleModal;
