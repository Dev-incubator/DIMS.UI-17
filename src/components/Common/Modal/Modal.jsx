import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import { goBack } from '../../../shared/helpers';
import style from './Modal.module.css';

export function Modal({ title, children }) {
  const history = useHistory();

  return (
    <div className={style.modal} onClick={goBack(history)} role='none'>
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
