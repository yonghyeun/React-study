import Button from 'components/Atoms/Button';
import ProgressBar from 'components/Atoms/ProgressBar';
import { useState } from 'react';
import { ProgressBarProps } from 'types';
const AsyncAddButton: React.FC = () => {
  const [isGoing, setIsGoing] = useState<ProgressBarProps['$isGoing']>(false);
  const handleClick = () => {
    setIsGoing(false);
    setTimeout(() => {
      setIsGoing(true);
    }, 0);
  };

  return (
    <Button onClick={handleClick}>
      Add Async
      <ProgressBar $isGoing={isGoing} />
    </Button>
  );
};

export default AsyncAddButton;
