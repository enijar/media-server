import React, { Component, createContext } from "react";
import WebTorrent from "webtorrent";

const Context = createContext({});

export const AppContext = Component => props => (
  <Context.Consumer>
    {app => <Component {...props} app={app}/>}
  </Context.Consumer>
);

export default class AppContextProvider extends Component {
  state = {
    torrentClient: new WebTorrent,
    torrentId: null,
  };

  #setTorrentId = torrentId => this.setState({torrentId});

  #getContext = () => ({
    ...this.state,
    setTorrentId: this.#setTorrentId,
  });

  render () {
    return (
      <Context.Provider value={this.#getContext()}>
        {this.props.children}
      </Context.Provider>
    );
  }
}
