import { createContext, useContext, useRef } from 'react';

function createConnection() {
  let currentRoomId = 'general';
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

const connectionContext = createContext();

export function ConnectionProvider({ children }) {
  const connection = useRef(createConnection());

  return (
    <connectionContext.Provider value={connection.current}>
      {children}
    </connectionContext.Provider>
  );
}

export function useConnection() {
  const context = useContext(connectionContext);
  if (!context) {
    throw new Error(
      'useConnection 은 ConnectionContext.Provider 내부에서 사용되어야 합니다',
    );
  }
  return context;
}
