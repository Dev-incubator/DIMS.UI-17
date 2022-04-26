import ClipLoader from 'react-spinners/ClipLoader';
import style from './Loader.module.css';

export function Loader() {
  return (
    <div className={style.loader}>
      <ClipLoader />
    </div>
  );
}
