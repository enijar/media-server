import React, {Component} from "react";
import Routes from "../routes";
import {withRouter} from "react-router-dom";
import {AppContext} from "../app/Context/App";

@withRouter
export default class App extends Component {
    state = {};

    getContext() {
        return {};
    }

    render() {
        return (
            <AppContext.Provider value={this.getContext()}>
                <Routes/>
            </AppContext.Provider>
        );
    }
}
