import './App.css';
import { useState } from 'react';

export default function App() {
  function useRefCustom(initialValue) {
    const [ref, setterFunc] = useState({ current: initialValue });
    return ref;
  }

  const [state, setState] = useState(true);
  const ref = useRefCustom(0);

  return (
    <>
      <button
        onClick={() => {
          console.log(ref);
          ref.current = ref.current + 1;
        }}
      >
        click
      </button>
      <button
        onClick={() => {
          console.log('리렌더링합니다!');

          setState(!state);
        }}
      >
        re-render!
      </button>
    </>
  );
}
