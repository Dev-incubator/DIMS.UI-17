import propTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import style from './Header.module.css';
import logo from '../../../assets/img/logo.png';
import { Logout } from '../../Pages/Logout/Logout';

export function Header({ userName, handleLogout, role }) {
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
                {userName ? <Logout userName={userName} role={role} handleLogout={handleLogout} /> : `Login`}
              </NavLink>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}

Header.propTypes = {
  userName: propTypes.string,
  handleLogout: propTypes.func.isRequired,
  role: propTypes.string,
};

Header.defaultProps = {
  userName: '',
  role: '',
};
