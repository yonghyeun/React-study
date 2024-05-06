import { ReactNode, useState } from 'react';

import ModalContext from './Context';

type Props = {
  children: ReactNode;
};

const ModalProvider: React.FC<Props> = ({ children }) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  return (
    <ModalContext.Provider value={[isOpen, setIsOpen]}>
      {children}
    </ModalContext.Provider>
  );
};

export default ModalProvider;
