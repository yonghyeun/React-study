import Title from './Title';
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
              <NavLink>menu 1</NavLink>
            </li>
            <li>
              <NavLink>menu 2</NavLink>
            </li>
            <li>
              <NavLink>menu 3</NavLink>
            </li>
            <li>
              <NavLink>menu 4</NavLink>
            </li>
          </ul>
        </nav>
      </main>
    </section>
  );
}
