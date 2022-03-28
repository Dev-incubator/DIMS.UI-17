import PropTypes from 'prop-types';
import { Modal } from 'react-bootstrap';

export function MyModal({ title, toggleModalHandler, isModalOpen, children }) {
  return (
    <Modal show={isModalOpen} onHide={toggleModalHandler} centered>
      <Modal.Header closeButton>
        <Modal.Title>{title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>{children}</Modal.Body>
    </Modal>
  );
}

MyModal.propTypes = {
  children: PropTypes.node.isRequired,
  title: PropTypes.string.isRequired,
  toggleModalHandler: PropTypes.func.isRequired,
  isModalOpen: PropTypes.bool.isRequired,
};
