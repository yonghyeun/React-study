import style from './styles.module.css';

import TextWrapper from '../TextWrapper/TextWrapper';
import SignIn from '../SignIn/SignIn';
import Modal from '../Modal/Modal';
import { useState } from 'react';
const Content: React.FC = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  return (
    <main className={style.content}>
      <span>
        <TextWrapper.Title />
        <TextWrapper.Text />
      </span>
      <SignIn setIsOpen={setIsOpen} />
      {isOpen && <Modal setIsOpen={setIsOpen} />}
    </main>
  );
};

export default Content;
