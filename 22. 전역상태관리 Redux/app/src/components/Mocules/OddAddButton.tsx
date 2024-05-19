import Button from 'components/Atoms/Button';
import { useDispatch } from 'react-redux';

import { Dispatcher, incrementOdd } from 'store/store';

const OddAddButton = () => {
  const dispatch = useDispatch<Dispatcher>();
  const handleClick = () => {
    dispatch(incrementOdd());
  };

  return <Button onClick={handleClick}>Add If Odd</Button>;
};

export default OddAddButton;
