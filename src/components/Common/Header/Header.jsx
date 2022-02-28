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
          <ul>
            <li className={style.navItem}>
              <NavLink to='/members' activeClassName='selected'>
                Members
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
