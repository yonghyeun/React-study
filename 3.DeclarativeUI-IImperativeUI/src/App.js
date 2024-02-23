import './App.css';
import { useState } from 'react';

export default function App() {
  // 상태값과 상태 변화를 일으킬 trigger 들을 useState 를 이용해 정의
  const [status, setStatus] = useState('empty'); // textarea 의 상태 (typing , submitting , empty )
  const [correct, setCorrect] = useState(null); // 정답 유무의 상태
  const [answer, setAnswer] = useState(''); // 입력값의 상태

  function handleInput(e) {
    setAnswer(e.target.value);
    if (e.target.value.length === 0) setStatus('empty');
    else setStatus('typing');
  }

  function checkAnswer() {
    return new Promise((res, rej) => {
      setTimeout(() => {
        if (answer === '2') res();
        else rej();
      }, 1500);
    });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setStatus('submitting');
    try {
      await checkAnswer();
      setCorrect(true);
    } catch {
      setCorrect(false);
    } finally {
      setStatus('typing');
    }
  }

  return (
    <form>
      <header>
        <h1>Math Quiz</h1>
        <h3>What is 1 + 1 ?</h3>
      </header>
      <main style={{ display: correct === true ? 'none' : '' }}>
        <textarea
          disabled={status === 'submitting'}
          onInput={handleInput}
        ></textarea>
        <br />
        <button disabled={status !== 'typing'} onClick={handleSubmit}>
          submit
        </button>
      </main>
      <footer>
        <p
          id='loading'
          style={{ display: status === 'submitting' ? '' : 'none' }}
        >
          Loading ..
        </p>
        <p
          id='success'
          style={{
            display: status !== 'submitting' && correct === true ? '' : 'none',
          }}
        >
          you are correct
        </p>
        <p
          id='fail'
          style={{
            display: status !== 'submitting' && correct === false ? '' : 'none',
          }}
        >
          try agin !{' '}
        </p>
      </footer>
    </form>
  );
}
