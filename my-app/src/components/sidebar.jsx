import { NavLink } from 'react-router-dom';

export default function Sidebar() {
  return (
    <nav className='side-bar'>
      <ul>
        <NavLink to='/content/1'>Content 1</NavLink>
        <NavLink to='/content/2'>Content 2</NavLink>
        <NavLink to='/content/3'>Content 3</NavLink>
      </ul>
    </nav>
  );
}
