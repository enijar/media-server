import React from "react";
import AppContext from "../app/Context/App";
import BaseScreen from "./BaseScreen";
import Screen from "../Components/Screen";

@AppContext
export default class HomeScreen extends BaseScreen {
  render () {
    return (
      <Screen name="Home">
        <h1>Home Screen</h1>
      </Screen>
    );
  }
}
