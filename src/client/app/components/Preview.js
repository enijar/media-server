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

  render () {
    return (
      <div className="Preview">
        <div
          className="Preview__poster"
          style={{backgroundImage: `url(${this.props.img})`}}
        />
        <div className="Preview__title" title={this.props.title}>{this.props.title}</div>
        <div className="Preview__year">{this.props.year}</div>
      </div>
    );
  }
}
