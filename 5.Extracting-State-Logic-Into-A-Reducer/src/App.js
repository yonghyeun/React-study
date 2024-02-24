import { useReducer, useState } from 'react';
import './App.css';

export default function App() {
  const [counters, setCounters] = useState([
    {
      id: 0,
      body: <Counter color='#038C7F' />,
    },
    {
      id: 1,
      body: <Counter color='#ADD9D1' />,
    },
    {
      id: 2,
      body: <Counter color='#D95252' />,
    },
  ]);

  function handleOnclick() {
    const copied = [...counters];
    for (let i = copied.length - 1; i > 0; i -= 1) {
      const j = Math.floor(Math.random() * (i + 1));
      [copied[i], copied[j]] = [copied[j], copied[i]];
    }
    setCounters(copied);
  }

  return (
    <>
      <div className='wrapper'>
        {counters.map((component) => (
          <div key={component.id}>{component.body}</div>
        ))}
        <button onClick={handleOnclick}>Shuffle</button>
      </div>
    </>
  );
}

function Counter({ color }) {
  const [num, dispatch] = useReducer(taskHandler, 0);

  /**
   * useReducer 에 들어갈 Reducer function 으로 action 객체의 type에 따라 state 를 새롭게 갱신
   * @param {Number} num 렌더링 로직과 연결된 state 값
   * @param {Object} action dispatch 함수를 통해 전달 받은 action 객체
   * @returns 업데이트 할 새로운 state
   */
  function taskHandler(num, action) {
    switch (action.type) {
      case 'add': {
        return num + 1;
      }

      case 'subtract': {
        return num - 1;
      }

      case 'reset': {
        return 0;
      }

      default: {
        throw new Error('그런 타입은 없어요 ~!');
      }
    }
  }

  function dispatchAdd() {
    dispatch({ type: 'add' });
  }

  function dispatchSubtract() {
    dispatch({ type: 'subtract' });
  }

  function dispatchReset() {
    dispatch({ type: 'reset' });
  }

  return (
    <div className='container' style={{ backgroundColor: color }}>
      <p>{num}</p>
      <div className='button-wrapper'>
        <button onClick={dispatchAdd}>Increase Number</button>
        <button onClick={dispatchSubtract}>Subtract Number</button>
        <button onClick={dispatchReset}>Reset Number</button>
      </div>
    </div>
  );
}
