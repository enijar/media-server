import React, { Component } from "react";
import PropTypes from "prop-types";
import { AppContext } from "../context/AppContext";

@AppContext
export default class Preview extends Component {
  static propTypes = {
    movie: PropTypes.shape({
      id: PropTypes.number.isRequired,
      title: PropTypes.string.isRequired,
      synopsis: PropTypes.string.isRequired,
      rating: PropTypes.number.isRequired,
      year: PropTypes.number.isRequired,
      img: PropTypes.string.isRequired,
    }).isRequired,
    openOverlay: PropTypes.func.isRequired,
  };

  #openOverlay = () => {
    this.props.openOverlay(this.props.movie);
  };

  render () {
    return (
      <>
        <div className="Preview" title={this.props.movie.title} onClick={this.#openOverlay}>
          <div className="Preview__poster" style={{backgroundImage: `url(${this.props.movie.img})`}}>
            <div className="Preview__rating">{this.props.movie.rating}/10</div>
          </div>
          <div className="Preview__title">{this.props.movie.title}</div>
          <div className="Preview__year">{this.props.movie.year}</div>
        </div>
      </>
    );
  }
}
