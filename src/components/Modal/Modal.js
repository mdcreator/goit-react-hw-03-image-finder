import { Component } from 'react';
import { createPortal } from 'react-dom';
import Loader from 'react-loader-spinner';
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';
import PropTyps from 'prop-types';
import s from './Modal.module.css';

const modalRoot = document.querySelector('#modal-root');

class Modal extends Component {
  static PropTyps = {
    onClose: PropTyps.func.isRequired,
  };

  state = {
    isLoading: false,
    showModal: false,
  };

  componentDidMount() {
    window.addEventListener('keydown', this.handleKeyDown);
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.handleKeyDown);
  }

  handleKeyDown = e => {
    if (e.code === 'Escape') {
      this.props.onClose();
    }
  };

  handleBackdropClick = e => {
    if (e.currentTarget === e.turget) {
      this.props.onClose();
    }
  };

  render() {
    return createPortal(
      <div className={s.Overlay} onClick={this.handleBackdropClick}>
        <div className={s.Modal}>
          {/* {this.props.children} */}
          <img
            src={this.props.src}
            alt={this.props.alt}
            // onClose={this.toggleModal}
            // onLoad={this.handleImageLoaded}
          />
          {this.state.isLoading && (
            <Loader type="Grid" color="#3f51b5" height={80} width={80} />
          )}
        </div>
      </div>,
      modalRoot,
    );
  }
}

export default Modal;
