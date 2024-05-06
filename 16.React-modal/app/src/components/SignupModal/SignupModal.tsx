import style from './styles.module.css';

import SignupModalWrapper from '../SignupModalWrapper/SignupModalWrapper';

import useModal from '../../Context/useModal';
import useCancleModal from '../../Context/useCancleModa';

const SignUpModal: React.FC = () => {
  const [isOpen, setIsOpen] = useModal();
  const [isCancle, setIsCancle] = useCancleModal();

  const handleSubmit = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    // Submit 을 하는 어떤 로직들 ..
    setIsOpen(false);
  };

  const handleCancle = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setIsCancle(true);
  };

  const stopPropoation = (e: React.MouseEvent<HTMLFormElement>) => {
    e.stopPropagation();
  };

  return (
    <form action='/' onClick={stopPropoation}>
      <SignupModalWrapper />
      <div className={style.group}>
        <input
          type='text'
          id='username'
          name='username'
          placeholder='아이디를 입력하세요'
        />
      </div>
      <div className={style.group}>
        <input
          type='text'
          id='password'
          name='password'
          placeholder='비밀번호를 입력하세요'
        />
      </div>
      <div className={style.buttonWrapper}>
        <button className={style.submit} onClick={handleSubmit}>
          제출하기
        </button>
        <button className={style.submit} onClick={handleCancle}>
          취소
        </button>
      </div>
    </form>
  );
};

export default SignUpModal;
