import { ReactNode } from 'react';

import style from './styles.module.css';

type Props = {
  children: ReactNode;
};

const Wrapper: React.FC<Props> = ({ children }) => {
  return <section className={style.wrapper}>{children}</section>;
};

export default Wrapper;
