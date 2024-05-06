import { ReactNode, useState } from 'react';

import { ModalContext, CancleContext } from './Context';

type Props = {
  children: ReactNode;
};

const ModalProvider: React.FC<Props> = ({ children }) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isCancle, setIsCancle] = useState<boolean>(false);

  return (
    <ModalContext.Provider value={[isOpen, setIsOpen]}>
      <CancleContext.Provider value={[isCancle, setIsCancle]}>
        {children}
      </CancleContext.Provider>
    </ModalContext.Provider>
  );
};

export default ModalProvider;
