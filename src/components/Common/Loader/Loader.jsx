import FadeLoader from 'react-spinners/FadeLoader';
import style from './Loader.module.css';

export function Loader() {
  return (
    <div className={style.loader}>
      <FadeLoader />
    </div>
  );
}
