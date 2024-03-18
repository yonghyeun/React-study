import { createContext, useContext, useState } from 'react';

const LoginContext = createContext(null);
const LoginSetterContext = createContext(null);
const UserInfoContext = createContext(null);
const UserInfoSetterContext = createContext(null);

export function ContextProvider({ children }) {
  const [isLogin, setIsLogin] = useState(false);
  const [userInfo, setUserInfo] = useState({});
  return (
    <LoginContext.Provider value={isLogin}>
      <LoginSetterContext.Provider value={setIsLogin}>
        <UserInfoContext.Provider value={userInfo}>
          <UserInfoSetterContext.Provider value={setUserInfo}>
            {children}
          </UserInfoSetterContext.Provider>
        </UserInfoContext.Provider>
      </LoginSetterContext.Provider>
    </LoginContext.Provider>
  );
}

export function useLogin() {
  const isLogin = useContext(LoginContext);
  const setIsLogin = useContext(LoginSetterContext);
  return [isLogin, setIsLogin];
}

export function useUserInfo() {
  const userInfo = useContext(UserInfoContext);
  const setUserInfo = useContext(UserInfoSetterContext);

  return [userInfo, setUserInfo];
}
