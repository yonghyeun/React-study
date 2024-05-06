import style from './styles.module.css';

import TextWrapper from '../TextWrapper/TextWrapper';
import SignIn from '../SignIn/SignIn';
import useModal from '../../Context/useModal';
const Content: React.FC = () => {
  const [_, setIsOpen] = useModal();

  return (
    <main className={style.content}>
      <span>
        <TextWrapper.Title />
        <TextWrapper.Text />
      </span>
      <SignIn setIsOpen={setIsOpen} />
    </main>
  );
};

export default Content;
