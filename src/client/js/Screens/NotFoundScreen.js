import React from "react";
import AppContext from "../app/Context/App";
import BaseScreen from "./BaseScreen";
import Screen from "../Components/Screen";

@AppContext
export default class HomeScreen extends BaseScreen {
    render() {
        return (
            <Screen name="NotFound">
                <h1>NotFound Screen</h1>
            </Screen>
        );
    }
}
