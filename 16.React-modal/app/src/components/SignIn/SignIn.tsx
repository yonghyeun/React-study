import style from './style.module.css';

type Props = {
  setIsOpen: (isOpen: boolean) => void;
};

const SignIn: React.FC<Props> = ({ setIsOpen }) => {
  const handleClick = () => {
    setIsOpen(true);
  };

  return (
    <button className={style.signIn} onClick={handleClick}>
      똥손단 가입하기
    </button>
  );
};

export default SignIn;
