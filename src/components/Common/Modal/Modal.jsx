import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import style from './Modal.module.css';

export function Modal({ title, children }) {
  const history = useHistory();

  return (
    <div className={style.modal} onClick={() => history.goBack()} role='none'>
      <div className={style.content} onClick={(e) => e.stopPropagation()} role='none'>
        <h1 className={style.title}>{title}</h1>
        {children}
      </div>
    </div>
  );
}

Modal.propTypes = {
  children: PropTypes.node.isRequired,
  title: PropTypes.string.isRequired,
};
