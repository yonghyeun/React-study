import Input from 'components/Atoms/Input';

import { useSelector, useDispatch } from 'react-redux';
import { RootState } from 'store/store';
import { changeAmount } from 'store/CounterSlice';

const InputCharCounter = () => {
  const dispatch = useDispatch();

  const increseAmount = useSelector((state: RootState) => state.amount);
  const handleChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    dispatch(changeAmount(Number(e.target.value)) || 0);
  };

  return <Input defaultValue={increseAmount} onChange={handleChange} />;
};

export default InputCharCounter;
