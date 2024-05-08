import { useState } from 'react';
import { useEffect } from 'react';

export default function Index() {
  const [num, setNum] = useState(0);
  const [name, setName] = useState('동동');

  const increase = () => {
    setNum(num + 1);
  };

  useEffect(() => {
    console.log(`useEffect 실행 ! ${name} , ${num}`);
  }, [name]);

  return (
    <div>
      <h1>내 이름은 {name}</h1>
      <h1>버튼이 눌린 횟수는 {num}</h1>
      <button onClick={increase}>click me !</button>
    </div>
  );
}