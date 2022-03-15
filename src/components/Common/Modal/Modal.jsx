import React from 'react';
import PropTypes from 'prop-types';
import reactDom from 'react-dom';
import style from './Modal.module.css';

export class Modal extends React.Component {
  constructor(props) {
    super(props);
    this.root = document.createElement('div');
  }

  componentDidMount() {
    document.body.appendChild(this.root);
  }

  componentWillUnmount() {
    document.body.removeChild(this.root);
  }

  render() {
    const { title, toggleModalHandler, isModalOpen, children } = this.props;

    return reactDom.createPortal(
      <div
        className={isModalOpen ? `${style.modal} ${style.modal_active}` : style.modal}
        onClick={toggleModalHandler}
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
      </div>,
      this.root,
    );
  }
}

Modal.propTypes = {
  children: PropTypes.node.isRequired,
  title: PropTypes.string.isRequired,
  toggleModalHandler: PropTypes.func.isRequired,
  isModalOpen: PropTypes.bool.isRequired,
};
