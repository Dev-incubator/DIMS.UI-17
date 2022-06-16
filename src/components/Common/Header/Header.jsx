import style from './Header.module.css';
import { NavBar } from './Navbar';

export function Header() {
  return (
    <header className={style.header}>
      <NavBar />
    </header>
  );
}
