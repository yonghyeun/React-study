import SideBar from '../Components/Sidebar';
import Toolbar from '../Components/Toolbar';
import { Outlet } from 'react-router-dom';
import '../App.css';
import { getCookie } from '../function';
import { useLogin } from '../Context/context';
import { useEffect } from 'react';

export default function Main() {
  const [isLogin, setIsLogin] = useLogin();

  useEffect(() => {
    if (!isLogin && getCookie('userId') && getCookie('password')) {
      setIsLogin(true);
    }
  });

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
