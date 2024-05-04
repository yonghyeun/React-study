import { useRef } from 'react';
import style from './styles.module.css';

type Props = {
  setIsOpen: (isOpen: boolean) => void;
};

const Modal: React.FC<Props> = ({ setIsOpen }) => {
  const handleSubmit = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    // Submit 을 하는 어떤 로직들 ..
    setIsOpen(false);
  };

  const handleCancle = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setIsOpen(false);
  };
  const formRef = useRef<HTMLFormElement>(null);

  const handleClickWrapper = (e: React.MouseEvent<HTMLOptionElement>) => {
    // 1. formRef.current 가 null 이 아니고 (mount 이후)
    // 2. 눌린 e.target 이 formRef.current 내부 엘리먼트가 면
    if (formRef.current && !formRef.current.contains(e.target as Node)) {
      setIsOpen(false);
    }
  };

  return (
    <section className={style.modalWrapper} onClick={handleClickWrapper}>
      <form action='/' ref={formRef}>
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
    </section>
  );
};

export default Modal;
