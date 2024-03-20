import SideBar from '../Components/Sidebar';
import Toolbar from '../Components/Toolbar';
import { Outlet } from 'react-router-dom';
import '../App.css';
import { useLogin, useUserInfo } from '../Context/context';
import { useEffect } from 'react';

export default function Main() {
  const [, setIsLogin] = useLogin();
  const [, setUserInfo] = useUserInfo();

  useEffect(() => {
    // 새로고침 시 쿠키에 토큰이 존재한다면 자동으로 로그인을 시도하는 useEffect
    // TODO 더러운 코드 고치기, try , catch 문을 꼭 써야 할까 ? 그냥

    const checkGotToken = async () => {
      try {
        const res = await fetch('/login/token', { method: 'GET' });
        if (!res.ok) {
          throw Error({
            message: '기존의 토큰이 없어 자동 로그인은 시도하지 않습니다',
          });
        }
        const body = await res.json();
        if (body) {
          setIsLogin(true);
          setUserInfo((userInfo) => {
            return { ...userInfo, userId: body.userId };
          });
        }
      } catch (e) {
        setIsLogin(false);
        setUserInfo({});
      }
    };
    checkGotToken();
  }, []);

  return (
    <section style={{ display: 'flex' }}>
      <SideBar />
      <main style={{ display: 'flex', flexDirection: 'column' }}>
        <Toolbar />
        <div id='main-content'>
          <Outlet />
        </div>
      </main>
    </section>
  );
}
