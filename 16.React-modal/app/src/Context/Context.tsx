import { createContext, Dispatch, SetStateAction } from 'react';

type ModalContextType = [boolean, Dispatch<SetStateAction<boolean>>];

const ModalContext = createContext<ModalContextType>([false, () => {}]);

export default ModalContext;
