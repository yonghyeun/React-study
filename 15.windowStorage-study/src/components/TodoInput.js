import { useState, useRef } from 'react';
import useDynamicStorage from '../hooks/useDynamicStorage';
import { setStorageItem } from '../utils/usingStorage';

/**
 * TodoInput 은 param 으로 받은 storageName에 따라 추가되는 todo 값을 webStorage에 저장합니다.
 * @param {{storageName : String}} 저장에 사용할 webStorage 의 이름
 * @returns {JSX.Element}
 */
export default function TodoInput({ storageName }) {
  // TODO useRef 사용하기
  const [state, setState] = useDynamicStorage(storageName);
  const inputRef = useRef(null);
  const handleClick = () => {
    const id = Math.floor(Math.random() * 1000000);
    const newTodo = {
      id,
      content: inputRef.current.value,
      createTime: new Date(),
    };
    setState([...state, newTodo]); // state 설정
    setStorageItem(storageName, id, newTodo); // storage 설정
  };

  return (
    <div>
      <input type='text' ref={inputRef} />
      <button onClick={handleClick}>Set Todo</button>
    </div>
  );
}
