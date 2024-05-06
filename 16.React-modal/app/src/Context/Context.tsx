import { createContext, Dispatch, SetStateAction } from 'react';

type ModalContextType = [boolean, Dispatch<SetStateAction<boolean>>];

const ModalContext = createContext<ModalContextType>([false, () => {}]);
const CancleContext = createContext<ModalContextType>([false, () => {}]);

export { ModalContext, CancleContext };
