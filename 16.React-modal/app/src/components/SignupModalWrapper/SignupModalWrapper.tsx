import CancleModal from '../CancleModal/CancleModal';
import useCancleModal from '../../Context/useCancleModa';
import style from './style.module.css';

const visibleStyle = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
};

const inVisibleStyle = {
  display: 'none',
};

const SignupModalWrapper: React.FC = () => {
  const [isCancle, setIsCancle] = useCancleModal();
  const handleCancle = () => {
    setIsCancle(false);
  };

  return (
    <section
      className={style.wrapper}
      style={isCancle ? { ...visibleStyle } : { ...inVisibleStyle }}
      onClick={handleCancle}
    >
      {isCancle && <CancleModal />}
    </section>
  );
};

export default SignupModalWrapper;
