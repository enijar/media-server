import React, { Component } from "react";
import PropTypes from "prop-types";
import { AppContext } from "../context/AppContext";
import Overlay from "./Overlay";
import Button from "./Button";

@AppContext
export default class Preview extends Component {
  static propTypes = {
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    synopsis: PropTypes.string.isRequired,
    rating: PropTypes.number.isRequired,
    year: PropTypes.number.isRequired,
    img: PropTypes.string.isRequired,
  };

  state = {
    overlayOpen: false,
  };

  #toggleOverlay = overlayOpen => () => this.setState({overlayOpen});

  #play = () => {
    console.log('play');
  };

  render () {
    return (
      <>
        <div className="Preview" title={this.props.title} onClick={this.#toggleOverlay(true)}>
          <div className="Preview__poster" style={{backgroundImage: `url(${this.props.img})`}}>
            <div className="Preview__rating">{this.props.rating}/10</div>
          </div>
          <div className="Preview__title">{this.props.title}</div>
          <div className="Preview__year">{this.props.year}</div>
        </div>

        <Overlay open={this.state.overlayOpen} onClose={this.#toggleOverlay(false)}>
          <div className="Preview__overlay">
            <div className="Preview__overlay-img" style={{backgroundImage: `url(${this.props.img})`}}/>
            <div className="Preview__overlay-info">
              <div className="Preview__overlay-info-title">
                {this.props.title}
              </div>
              <div className="Preview__overlay-info-synopsis">
                {this.props.synopsis}
              </div>
              <div className="Preview__overlay-actions">
                <Button onClick={this.#play}>
                  Watch Now
                </Button>
              </div>
            </div>
          </div>
        </Overlay>
      </>
    );
  }
}
