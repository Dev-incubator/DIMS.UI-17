import style from './Footer.module.css';
import { FOOTER_KEYS } from '../../../shared/constants';

export function Footer() {
  return (
    <footer className={style.footer}>
      <p>
        {FOOTER_KEYS.copyRight} {FOOTER_KEYS.years}
      </p>
    </footer>
  );
}
