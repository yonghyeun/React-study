import { useState } from 'react';
import Selector from './Components/Selector.js';
import TodoTitle from './Components/TodoTitle.js';
import TodoContent from './Components/TodoContent.js';
import './App.css';

export default function App() {
  const [userId, setUserId] = useState('1');

  function handleChange({ target }) {
    setUserId(target.value);
  }

  return (
    <>
      <Selector userId={userId} onChange={handleChange} />
      <TodoTitle userId={userId} />
      <TodoContent userId={userId} />
    </>
  );
}
