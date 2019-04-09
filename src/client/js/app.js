import "core-js";
import "regenerator-runtime/runtime";
import React from "react";
import {render} from "react-dom";
import AppContainer from "./Containers/AppContainer";

render(<AppContainer/>, document.querySelector('#root-app'));
