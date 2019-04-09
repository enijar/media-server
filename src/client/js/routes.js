import React from "react";
import {Route, Switch} from "react-router-dom";
import HomeScreen from "./Screens/HomeScreen";
import NotFoundScreen from "./Screens/NotFoundScreen";

export default () => (
    <Switch>
        <Route exact path="/" component={HomeScreen}/>
        <Route component={NotFoundScreen}/>
    </Switch>
);
