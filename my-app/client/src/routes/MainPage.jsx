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

    const checkGotToken = async () => {
      const res = await fetch('/login/token', { method: 'GET' });
      if (!res.ok) return; // 만약 상태코드가 200~299 이하면 빠르게 종료
      const body = await res.json();
      setIsLogin(true);
      setUserInfo((userInfo) => ({ ...userInfo, userId: body.userId }));
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
