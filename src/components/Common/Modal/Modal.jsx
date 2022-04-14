import PropTypes from 'prop-types';
import { Modal } from 'react-bootstrap';
import style from './Modal.module.css';

export function ModalWindow({ title, toggleModalHandler, isModalOpen, children }) {
  return (
    <Modal show={isModalOpen} onHide={toggleModalHandler}>
      <Modal.Header className={style.modal} closeButton>
        <Modal.Title>{title}</Modal.Title>
      </Modal.Header>
      <Modal.Body className={style.modal}>{children}</Modal.Body>
    </Modal>
  );
}

ModalWindow.propTypes = {
  children: PropTypes.node.isRequired,
  title: PropTypes.string.isRequired,
  toggleModalHandler: PropTypes.func.isRequired,
  isModalOpen: PropTypes.bool.isRequired,
};
