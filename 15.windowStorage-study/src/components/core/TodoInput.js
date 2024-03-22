import { useRef } from 'react';
import useDynamicStorage from '../../hooks/useDynamicStorage';
import { setStorageItem } from '../../utils/usingStorage';

/**
 * TodoInput 은 param 으로 받은 storageName에 따라 추가되는 todo 값을 webStorage에 저장합니다.
 * @param {{storageName : String}} 저장에 사용할 webStorage 의 이름
 * @returns {JSX.Element}
 */
export default function TodoInput({ storageName }) {
  const [state, setState] = useDynamicStorage(storageName);
  const inputRef = useRef(null);
  const createTime = new Date();

  const handleClick = () => {
    const newTodo = {
      id: createTime.getTime(),
      content: inputRef.current.value,
      createTime: createTime.toDateString(),
    };

    setState([...state, newTodo]); // state 설정
    setStorageItem(storageName, newTodo.id, newTodo); // storage 설정

    inputRef.current.value = '';
    inputRef.current.focus();
  };

  return (
    <div>
      <input type='text' ref={inputRef} />
      <button onClick={handleClick}>Set Todo</button>
    </div>
  );
}
