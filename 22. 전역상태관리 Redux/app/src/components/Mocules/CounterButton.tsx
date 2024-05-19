import Button from '../Atoms/Button';

import { increment, decrement } from 'store/CounterSlice';
import { useDispatch } from 'react-redux';

export const AddButton = () => {
  const dispatch = useDispatch();

  const handleClick = () => {
    dispatch(increment());
  };

  return (
    <Button width={'200'} onClick={handleClick}>
      +
    </Button>
  );
};

export const SubtractButton = () => {
  const dispatch = useDispatch();
  const handleClick = () => {
    dispatch(decrement());
  };

  return (
    <Button width={'200'} onClick={handleClick}>
      -
    </Button>
  );
};
