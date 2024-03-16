import SideBar from '../Components/Sidebar';
import Toolbar from '../Components/Toolbar';
import { Outlet } from 'react-router-dom';

import '../App.css';

export default function Main() {
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
