import { NavLink } from 'react-router-dom';
import style from './Header.module.css';
import logo from '../../../assets/img/logo.png';

export function Header() {
  return (
    <header className={style.header}>
      <div className={style.contentWrapper}>
        <NavLink to='/' activeClassName='selected'>
          <img className={style.logo} src={logo} alt='logo' />
        </NavLink>
        <nav>
          <ul className={style.headerNav}>
            <li className={style.navItem}>
              <NavLink to='/members' activeClassName={style.selected}>
                Members
              </NavLink>
            </li>
            <li className={style.navItem}>
              <NavLink to='/tasks' activeClassName={style.selected}>
                Tasks
              </NavLink>
            </li>
          </ul>
        </nav>
        <nav className={style.login}>
          <ul>
            <li>
              <NavLink to='/login' activeClassName='selected'>
                Login
              </NavLink>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}