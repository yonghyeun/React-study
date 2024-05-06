import { ReactNode, useEffect } from 'react';

type Props = {
  children: ReactNode;
  to: string;
  modal: ReactNode;
};

const Trigger: React.FC<Props> = ({ children, to, modal }) => {
  useEffect(() => {});

  return <section>{children}</section>;
};

export default Trigger;
