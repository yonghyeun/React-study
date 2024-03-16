import Title from './SidebarInner/Title';
import { NavLink } from 'react-router-dom';

export default function SideBar() {
  return (
    <section id='side-bar'>
      <header>
        <Title />
      </header>
      <main id='side-bar-main'>
        <nav>
          <ul>
            <li>
              <NavLink to='content/menu1'>menu 1</NavLink>
            </li>
            <li>
              <NavLink to='content/menu2'>menu 2</NavLink>
            </li>
            <li>
              <NavLink to='content/menu3'>menu 3</NavLink>
            </li>
            <li>
              <NavLink to='content/menu4'>menu 4</NavLink>
            </li>
          </ul>
        </nav>
      </main>
    </section>
  );
}
