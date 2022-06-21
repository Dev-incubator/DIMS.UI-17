import { NavLink } from 'react-router-dom';
import { useContext } from 'react';
import { Container, Nav, Navbar } from 'react-bootstrap';
import { LINKS_HEADER_MENU, USER_ROLES } from '../../../shared/constants';
import { AuthContext } from '../../../Hooks/useAuth';
import style from './Header.module.css';
import logo from '../../../assets/img/logo.png';
import { ReactComponent as SettingsLogo } from '../../../assets/img/settings.svg';
import { SettingsPge } from '../SettingsPage/SetingsPage';
import { SettingsContext } from '../../../Hooks/useSettings';
import { Logout } from '../../Pages/Logout/Logout';

export function NavBar() {
  const { toggleSettings, isShowSettings } = useContext(SettingsContext);
  const { isAuth, role } = useContext(AuthContext);

  const links =
    role === USER_ROLES.user ? LINKS_HEADER_MENU.filter((item) => item.access === USER_ROLES.user) : LINKS_HEADER_MENU;

  return (
    <Container fluid>
      <Navbar collapseOnSelect expand='sm' variant='dark'>
        <img className={style.logo} src={logo} alt='logo' />
        <Navbar.Toggle aria-controls='responsive-navbar-nav' className={style.navBtn} />
        <Navbar.Collapse id='responsive-navbar-nav'>
          <Nav className='me-auto'>
            <ul className={style.navMenu}>
              {isAuth
                ? links.map((item) => (
                    <li key={item.name}>
                      <NavLink
                        to={item.to}
                        className={style[item.className]}
                        activeClassName={style[item.activeClassName]}
                      >
                        {item.name}
                      </NavLink>
                    </li>
                  ))
                : null}
              <li>
                <NavLink to='/about' activeClassName={style.selected}>
                  About
                </NavLink>
              </li>
            </ul>
          </Nav>
        </Navbar.Collapse>
        <div className={style.user}>
          <SettingsLogo className={style.settings} onClick={toggleSettings} />
          {isAuth ? <Logout /> : <NavLink to='/login'>Login</NavLink>}
          {isShowSettings ? <SettingsPge /> : null}
        </div>
      </Navbar>
    </Container>
  );
}
