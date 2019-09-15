import React, { Component } from "react";
import PropTypes from "prop-types";

export default class Preview extends Component {
  static propTypes = {
    title: PropTypes.string.isRequired,
    synopsis: PropTypes.string.isRequired,
    rating: PropTypes.number.isRequired,
    year: PropTypes.number.isRequired,
    img: PropTypes.string.isRequired,
  };

  state = {
    open: this.props.title === 'Hoax',
  };

  #open = () => {
    !this.state.open && this.setState({open: true});
  };

  #close = () => {
    this.state.open && this.setState({open: false});
  };

  render () {
    return (
      <div
        className={`Preview ${this.state.open ? 'Preview--open' : ''}`}
        title={this.state.open ? undefined : this.props.title}
        onClick={this.#open}
      >
        {!this.state.open && (
          <>
            <div
              className="Preview__poster"
              style={{backgroundImage: `url(${this.props.img})`}}
            >
              <div className="Preview__rating">
                {this.props.rating}/10
              </div>
            </div>
            <div className="Preview__title">{this.props.title}</div>
            <div className="Preview__year">{this.props.year}</div>
          </>
        )}

        {this.state.open && (
          <>
            <div className="Preview__close" onClick={this.#close}>
              &times;
            </div>
          </>
        )}
      </div>
    );
  }
}
