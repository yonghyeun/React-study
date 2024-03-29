import { createContext, useState } from 'react';
import { getStorageItems } from '../utils/usingStorage';
export const LocalStorageContext = createContext(null);
export const SessionStorageContext = createContext(null);

/**
 * 각 Context.Provider 들은 Storage에 저장된 값을 객체형태로 받아 배열에 담아 전달해줌
 * @param {children} Context.Provider 들에게 값을 받을 하위 컴포넌트들
 * @returns
 */
export function ContextProvider({ children }) {
  const [localTodo, setLocalTodo] = useState(getStorageItems('localStorage'));
  const [sessionTodo, setSessionTodo] = useState(
    getStorageItems('sessionStorage'),
  );

  return (
    <LocalStorageContext.Provider value={[localTodo, setLocalTodo]}>
      <SessionStorageContext.Provider value={[sessionTodo, setSessionTodo]}>
        {children}
      </SessionStorageContext.Provider>
    </LocalStorageContext.Provider>
  );
}
