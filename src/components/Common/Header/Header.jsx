import { NavLink, Link } from 'react-router-dom';
import style from './Header.module.css';
import logo from '../../../assets/img/logo.png';
import { Logout } from '../../Pages/Logout/Logout';
import { LINKS_HEADER_MENU } from '../../../shared/constants';
import { AuthContext } from '../../../Hooks/useAuth';

export function Header() {
  return (
    <AuthContext.Consumer>
      {({ isAuth }) => {
        return (
          <header className={style.header}>
            <div className={style.contentWrapper}>
              <Link to='/'>
                <img className={style.logo} src={logo} alt='logo' />
              </Link>
              <nav>
                <ul className={style.headerNav}>
                  {LINKS_HEADER_MENU.map((item) => (
                    <NavLink
                      key={item.name}
                      to={item.to}
                      className={style[item.className]}
                      activeClassName={style[item.activeClassName]}
                    >
                      {item.name}
                    </NavLink>
                  ))}
                </ul>
              </nav>
              <div className={style.login}>
                <Link to='/login'>{isAuth ? <Logout /> : `Login`}</Link>
              </div>
            </div>
          </header>
        );
      }}
    </AuthContext.Consumer>
  );
}
