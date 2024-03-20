import SideBar from '../Components/Sidebar';
import Toolbar from '../Components/Toolbar';
import { Outlet } from 'react-router-dom';
import '../App.css';
import { useLogin } from '../Context/context';
import { useEffect } from 'react';

export default function Main() {
  const [isLogin, setIsLogin] = useLogin();

  const fetching = async () => {
    const res = await fetch('/', { method: 'GET' });
    const json = await res.json();

    return await json;
  };

  const json = fetching();
  console.log(json);

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
