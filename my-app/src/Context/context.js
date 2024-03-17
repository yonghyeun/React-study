import { createContext, useContext, useState } from 'react';

const LoginContext = createContext(null);
const LoginSetterContext = createContext(null);

export function ContextProvider({ children }) {
  const [isLogin, setIsLogin] = useState(false);

  return (
    <LoginContext.Provider value={isLogin}>
      <LoginSetterContext.Provider value={setIsLogin}>
        {children}
      </LoginSetterContext.Provider>
    </LoginContext.Provider>
  );
}

export function useLogin() {
  const isLogin = useContext(LoginContext);
  const setIsLogin = useContext(LoginSetterContext);
  return [isLogin, setIsLogin];
}
