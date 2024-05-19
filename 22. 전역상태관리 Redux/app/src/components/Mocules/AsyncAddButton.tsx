import Button from 'components/Atoms/Button';
import ProgressBar from 'components/Atoms/ProgressBar';
import { useState } from 'react';
import { ProgressBarProps } from 'types';

import { Dispatcher, incrementAsync } from 'store/store';
import { useDispatch } from 'react-redux';

const AsyncAddButton: React.FC = () => {
  const [isGoing, setIsGoing] = useState<ProgressBarProps['$isGoing']>(false);
  const dispatch = useDispatch<Dispatcher>();

  const handleClick = () => {
    setIsGoing(false);
    setTimeout(() => {
      setIsGoing(true);
    }, 0);

    /* 비동기적으로 디스패칭 시키기 위한 비동기 함수 */
    dispatch(incrementAsync());
  };

  return (
    <Button onClick={handleClick}>
      Add Async
      <ProgressBar $isGoing={isGoing} />
    </Button>
  );
};

export default AsyncAddButton;
