import { useState } from 'react';
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
  const [num, setNum] = useState(0);

  return (
    <div className='container' style={{ backgroundColor: color }}>
      <p>{num}</p>
      <div className='wrapper'>
        <button
          onClick={() => {
            setNum(num + 1);
          }}
        >
          Increase Number
        </button>
        <button
          onClick={() => {
            setNum(num - 1);
          }}
        >
          Subtract Number
        </button>
        <button
          onClick={() => {
            setNum(0);
          }}
        >
          Reset Number
        </button>
      </div>
    </div>
  );
}
