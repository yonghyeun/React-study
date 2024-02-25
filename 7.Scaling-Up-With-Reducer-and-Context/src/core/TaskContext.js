import { createContext, useContext, useReducer } from 'react';
import taskReducer from './TaskReducer.js';

const taskContext = createContext(null);
const dispatchContext = createContext(null);

export function TaskProvider({ children }) {
  const [tasks, dispatch] = useReducer(taskReducer, []);

  return (
    <taskContext.Provider value={tasks}>
      <dispatchContext.Provider value={dispatch}>
        {children}
      </dispatchContext.Provider>
    </taskContext.Provider>
  );
}

// 커스텀 훅 생성
export function useTask() {
  return useContext(taskContext);
}

export function useDispatch() {
  return useContext(dispatchContext);
}
