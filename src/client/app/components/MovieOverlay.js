import React, { Component } from "react";
import { createPortal } from "react-dom";
import PropTypes from "prop-types";
import Button from "./Button";
import Loading from "./Loading";

const node = document.querySelector('#root-overlay');
!node && console.warn('#root-overlay element not found');

const DEFAULT_STATE = {
  playVideo: false,
  videoLoaded: false,
};

export default class MovieOverlay extends Component {
  static propTypes = {
    open: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    movie: PropTypes.shape({
      id: PropTypes.number.isRequired,
      title: PropTypes.string.isRequired,
      synopsis: PropTypes.string.isRequired,
      rating: PropTypes.number.isRequired,
      year: PropTypes.number.isRequired,
      img: PropTypes.string.isRequired,
    }),
  };

  static defaultProps = {
    open: false,
  };

  state = {...DEFAULT_STATE};

  #close = async () => {
    await this.setState({...DEFAULT_STATE});
    this.props.onClose();
  };

  #play = () => {
    this.setState({playVideo: true});
  };

  #handleKeydown = event => {
    if (this.props.open && event.key === 'Escape') {
      this.#close();
    }
  };

  #handleVideoLoad = () => {
    this.setState({videoLoaded: true});
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
      <div className="MovieOverlay">
        <div className="MovieOverlay__click-catcher" onClick={this.#close}/>
        <div className="MovieOverlay__content">
          <div className="MovieOverlay__close" onClick={this.#close}>&times;</div>

          <div className="MovieOverlay__movie">
            {!this.state.playVideo && (
              <>
                <div className="MovieOverlay__movie-img" style={{backgroundImage: `url(/api/movie/${this.props.movie.id}/image)`}}/>
                <div className="MovieOverlay__movie-info">
                  <div className="MovieOverlay__movie-info-title">
                    {this.props.movie.title}
                  </div>
                  <div className="MovieOverlay__movie-info-synopsis">
                    {this.props.movie.synopsis}
                  </div>
                  <div className="MovieOverlay__movie-actions">
                    <Button onClick={this.#play}>
                      Watch Now
                    </Button>
                  </div>
                </div>
              </>
            )}

            {this.state.playVideo && (
              <div className="MovieOverlay__movie-video">
                {!this.state.videoLoaded && <Loading/>}
                {this.state.playVideo && (
                  <video
                    playsInline
                    autoPlay
                    controls src={`/stream/${this.props.movie.id}`}
                    onLoadedMetadata={this.#handleVideoLoad}
                    style={{display: this.state.videoLoaded ? 'block' : 'none'}}
                  />
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    ), node);
  }
}
