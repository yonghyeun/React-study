import useCancleModal from '../../Context/useCancleModa';
import useModal from '../../Context/useModal';
import style from './style.module.css';

const CancleModal = () => {
  const [isOpen, setIsOpen] = useModal();
  const [isCancle, setIsCancle] = useCancleModal();
  return (
    <section className={style.cancleModal} onClick={(e) => e.stopPropagation()}>
      <h1>정말 취소하시겠어요 ?</h1>
      <section>
        <button
          className={style.button}
          onClick={(e) => {
            e.stopPropagation();
            setIsCancle(false);
            setIsOpen(false);
          }}
        >
          넵
        </button>
        <button
          className={style.button}
          onClick={(e) => {
            e.stopPropagation();
            setIsCancle(false);
          }}
        >
          아뇨
        </button>
      </section>
    </section>
  );
};

export default CancleModal;
