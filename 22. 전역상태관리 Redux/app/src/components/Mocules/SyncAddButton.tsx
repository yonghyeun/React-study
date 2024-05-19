import Button from 'components/Atoms/Button';
import store from 'store/store';
import { incrementByAmount } from 'store/CounterSlice';

import { useDispatch } from 'react-redux';

const SyncAddButton = () => {
  const dispatch = useDispatch();
  const handleClick: React.MouseEventHandler<HTMLButtonElement> = () => {
    const { amount } = store.getState();
    dispatch(incrementByAmount(amount));
  };

  return <Button onClick={handleClick}>Add Sync</Button>;
};

export default SyncAddButton;
