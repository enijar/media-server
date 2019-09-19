import React, { Component, createRef } from "react";
import PropTypes from "prop-types";
import { AppContext } from "../context/AppContext";
import Services from "../services/index";
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

  #video = createRef();

  state = {
    overlayOpen: false,
  };

  #toggleOverlay = overlayOpen => () => {
    !overlayOpen && this.props.app.torrentClient.remove(torrentId);
    this.setState({overlayOpen});
  };

  #handleClick = () => this.#play();

  #play = async () => {
    if (!this.#video.current) {
      return console.error('No video node');
    }

    const torrentId = Services.magnet.get(this.props);

    // Add new torrent
    this.props.app.setTorrentId(torrentId);
    this.props.app.torrentClient.add(torrentId, torrent => {
      const file = torrent.files.find(file => file.name.endsWith('.mp4'));
      file.appendTo(this.#video.current, {autoplay: true});
    });
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
            {!this.props.app.torrentId && (
              <>
                <div className="Preview__overlay-img" style={{backgroundImage: `url(${this.props.img})`}}/>
                <div className="Preview__overlay-info">
                  <div className="Preview__overlay-info-title">
                    {this.props.title}
                  </div>
                  <div className="Preview__overlay-info-synopsis">
                    {this.props.synopsis}
                  </div>
                  <div className="Preview__overlay-actions">
                    <Button onClick={this.#handleClick}>
                      Watch Now
                    </Button>
                  </div>
                </div>
              </>
            )}

            <div
              ref={this.#video}
              className="Preview__overlay-video"
              style={{display: this.props.app.torrentId ? 'block' : 'none'}}
            />
          </div>
        </Overlay>
      </>
    );
  }
}
