import React from "react";
import BaseScreen from "./BaseScreen";
import Screen from "../components/Screen";
import { AppContext } from "../context/AppContext";

@AppContext
export default class HomeScreen extends BaseScreen {
  render () {
    return (
      <Screen name="NotFound">
        <h1>NotFound Screen</h1>
      </Screen>
    );
  }
}
