import useModal from '../../Context/useModal';

import Modal from '../Modal/Modal';

import style from './style.module.css';

const visibleStyle = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
};

const inVisibleStyle = {
  display: 'none',
};

const GlobalModalWrapper: React.FC = () => {
  const [isOpen, setIsOpen] = useModal();
  const handleClickWrapper = (e: React.MouseEvent<HTMLOptionElement>) => {
    setIsOpen(false);
  };

  return (
    <section
      className={style.global}
      style={isOpen ? { ...visibleStyle } : { ...inVisibleStyle }}
      onClick={handleClickWrapper}
    >
      {isOpen && <Modal />}
    </section>
  );
};

export default GlobalModalWrapper;
