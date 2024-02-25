import Input from './Input';
import Button from './Button';
import { useState } from 'react';
import { useDispatch } from '../core/TaskContext';

export default function TodoHeader() {
  const [text, setText] = useState('');
  const dispatch = useDispatch();

  function dispatchAdd() {
    dispatch({
      type: 'add',
      text,
    });
  }

  return (
    <div className='header'>
      <Input setText={setText} value={text} />
      <Button onClick={dispatchAdd}>Add</Button>
    </div>
  );
}
