import React, { Component } from "react";
import { BrowserRouter } from "react-router-dom";
import App from "../components/App";
import AppContextProvider from "../context/AppContext";

export default class AppContainer extends Component {
  render () {
    return (
      <AppContextProvider>
        <BrowserRouter>
          <App/>
        </BrowserRouter>
      </AppContextProvider>
    );
  }
}
