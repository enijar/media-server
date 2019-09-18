import React, { Component } from "react";
import { createPortal } from "react-dom";
import PropTypes from "prop-types";

const node = document.querySelector('#root-overlay');
!node && console.warn('#root-overlay element not found');

export default class Overlay extends Component {
  static propTypes = {
    open: PropTypes.bool,
    onClose: PropTypes.func,
  };

  static defaultProps = {
    open: false,
  };

  #close = () => this.props.onClose && this.props.onClose();

  #handleKeydown = event => {
    this.props.open && event.key === 'Escape' && this.#close();
  };

  componentDidMount () {
    window.addEventListener('keydown', this.#handleKeydown);
  }

  componentWillUnmount () {
    window.removeEventListener('keydown', this.#handleKeydown);
  }

  render () {
    if (!this.props.open) {
      return null;
    }

    return createPortal((
      <div className="Overlay">
        <div className="Overlay__click-catcher" onClick={this.#close}/>
        <div className="Overlay__content">
          <div className="Overlay__close" onClick={this.#close}>&times;</div>
          {this.props.children}
        </div>
      </div>
    ), node);
  }
}
