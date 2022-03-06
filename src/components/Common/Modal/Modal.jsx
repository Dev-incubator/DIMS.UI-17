import PropTypes from 'prop-types';
import style from './Modal.module.css';

export function Modal({ callModal, isActive, children }) {
  return (
    <div className={isActive ? `${style.modal} ${style.modalActive}` : style.modal} onClick={callModal} role='none'>
      <div
        className={isActive ? `${style.content} ${style.contentActive}` : style.content}
        onClick={(e) => e.stopPropagation()}
        role='none'
      >
        {children}
      </div>
    </div>
  );
}

Modal.propTypes = {
  children: PropTypes.node.isRequired,
  isActive: PropTypes.bool.isRequired,
  callModal: PropTypes.func.isRequired,
};
