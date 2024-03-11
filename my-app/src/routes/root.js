import '../App.css';
import { NavLink, Outlet } from 'react-router-dom';

export default function Root() {
  return (
    <div>
      <nav className='side-bar'>
        <ul>
          <NavLink
            to='/content/1'
            className={({ isActive, isPending, isTransitioning }) => {
              if (isActive) return 'custom-active';
              if (isPending) return 'custom-pending';
              if (isTransitioning) return 'custom-transtioning';
            }}
          >
            {({ isActive }) => (
              <span className={isActive ? 'active-text' : 'default-text'}>
                Content 1
              </span>
            )}
          </NavLink>
          <NavLink
            to='/content/2'
            className={({ isActive, isPending, isTransitioning }) => {
              if (isActive) return 'custom-active';
              if (isPending) return 'custom-pending';
              if (isTransitioning) return 'custom-transtioning';
            }}
          >
            {({ isActive }) => (
              <span className={isActive ? 'active-text' : 'default-text'}>
                Content 2
              </span>
            )}
          </NavLink>
          <NavLink
            to='/content/3'
            className={({ isActive, isPending, isTransitioning }) => {
              if (isActive) return 'custom-active';
              if (isPending) return 'custom-pending';
              if (isTransitioning) return 'custom-transtioning';
            }}
          >
            {({ isActive }) => (
              <span className={isActive ? 'active-text' : 'default-text'}>
                Content 3
              </span>
            )}
          </NavLink>
        </ul>
      </nav>
      <Outlet />
    </div>
  );
}
