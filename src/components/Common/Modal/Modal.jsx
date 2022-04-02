import PropTypes from 'prop-types';
import { Modal } from 'react-bootstrap';

export function ModalWindow({ title, toggleModalHandler, isModalOpen, children }) {
  return (
    <Modal show={isModalOpen} onHide={toggleModalHandler} centered>
      <Modal.Header closeButton>
        <Modal.Title>{title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>{children}</Modal.Body>
    </Modal>
  );
}

ModalWindow.propTypes = {
  children: PropTypes.node.isRequired,
  title: PropTypes.string.isRequired,
  toggleModalHandler: PropTypes.func.isRequired,
  isModalOpen: PropTypes.bool,
};
ModalWindow.defaultProps = {
  isModalOpen: false,
};
