import React, { Component, createContext } from "react";

const Context = createContext({});

export const AppContext = Component => props => (
  <Context.Consumer>
    {app => <Component {...props} app={app}/>}
  </Context.Consumer>
);

export default class AppContextProvider extends Component {
  state = {
    //
  };

  #getContext = () => ({
    ...this.state,
  });

  render () {
    return (
      <Context.Provider value={this.#getContext()}>
        {this.props.children}
      </Context.Provider>
    );
  }
}
