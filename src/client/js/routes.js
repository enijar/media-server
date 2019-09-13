import React from "react";
import { Route, Switch } from "react-router-dom";
import HomeScreen from "./Screens/HomeScreen";
import WatchScreen from "./Screens/WatchScreen";
import NotFoundScreen from "./Screens/NotFoundScreen";

export default () => (
  <Switch>
    <Route exact path="/" component={HomeScreen}/>
    <Route exact path="/watch/:id" component={WatchScreen}/>
    <Route component={NotFoundScreen}/>
  </Switch>
);
