import { useState, useEffect, useRef } from 'react';

export default function App() {
  const [roomId, setRoomId] = useState('general');
  const [theme, setTheme] = useState('default');

  return (
    <>
      <SelectServer setRoomId={setRoomId} />
      <SelectTheme setTheme={setTheme} />
      <ChatRoom roomId={roomId} theme={theme} />
    </>
  );
}

function SelectTheme({ setTheme }) {
  function handleSelect(e) {
    setTheme(e.target.value);
  }

  return (
    <main>
      <label htmlFor='theme'>
        적용 할 테마를 골라주세요{' '}
        <select name='theme' id='theme' onChange={handleSelect}>
          <option value='default'>Default Mode</option>
          <option value='DarkMode'>Dark Mode</option>
        </select>
      </label>
    </main>
  );
}

function SelectServer({ setRoomId }) {
  function handleSelect(e) {
    setRoomId(e.target.value);
  }

  return (
    <main>
      <label htmlFor='category'>
        연결 할 서버를 골라주세요{' '}
        <select name='category' id='category' onChange={handleSelect}>
          <option value='general'>General</option>
          <option value='music'>Music</option>
          <option value='game'>Game</option>
        </select>
      </label>
    </main>
  );
}

function ChatRoom({ roomId, theme }) {
  const [text, setText] = useState('');
  const networkRef = useRef(null);

  useEffect(() => {
    if (!networkRef.current) {
      networkRef.current = createConnection(roomId);
      networkRef.current.connect();
    } else {
      networkRef.current.updateRoomId(roomId);
    }

    return () => {
      networkRef.current.disconnect();
    };
  }, [roomId]);

  useEffect(() => {
    if (networkRef.current) {
      networkRef.current.updateTheme(theme);
    }
  }, [theme]);

  return (
    <input
      type='text'
      onChange={(e) => {
        setText(e.target.value);
      }}
    />
  );
}

function createConnection(roomId) {
  let currentRoomId = roomId;
  let currentTheme = 'default'; // 초기 테마 값을 설정

  return {
    connect() {
      console.log(`${currentRoomId}과 연결을 시작합니다`);
    },
    disconnect() {
      console.log(`${currentRoomId}과 연결을 종료합니다`);
    },
    updateRoomId(newRoomId) {
      currentRoomId = newRoomId;
      console.log(`${newRoomId}과 연결을 시작합니다`);
    },
    updateTheme(newTheme) {
      currentTheme = newTheme;
      console.log(`${currentTheme}로 메시지를 주고 받습니다`);
    },
  };
}
