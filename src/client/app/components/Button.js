import React, { Component } from "react";
import PropTypes from "prop-types";

export default class Preview extends Component {
  static propTypes = {
    className: PropTypes.string,
    onClick: PropTypes.func,
  };

  static defaultProps = {
    className: '',
  };

  #handleClick = () => this.props.onClick && this.props.onClick();

  render () {
    return (
      <button className={`Button ${this.props.className}`} onClick={this.#handleClick}>
        {this.props.children}
      </button>
    );
  }
}
