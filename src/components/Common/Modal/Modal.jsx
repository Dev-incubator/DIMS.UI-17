import PropTypes from 'prop-types';
import style from './Modal.module.css';

export function Modal({ title, handleToggleModal, isModalOpen, children }) {
  return (
    <div
      className={isModalOpen ? `${style.modal} ${style.modal_active}` : style.modal}
      onClick={handleToggleModal}
      role='none'
    >
      <div
        className={isModalOpen ? `${style.content} ${style.content_active}` : style.content}
        onClick={(e) => e.stopPropagation()}
        role='none'
      >
        <h1 className={style.title}>{title}</h1>
        {children}
      </div>
    </div>
  );
}

Modal.propTypes = {
  children: PropTypes.node.isRequired,
  title: PropTypes.string.isRequired,
  handleToggleModal: PropTypes.func.isRequired,
  isModalOpen: PropTypes.bool.isRequired,
};
