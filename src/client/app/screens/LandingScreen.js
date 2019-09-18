import React from "react";
import get from "lodash/get";
import BaseScreen from "./BaseScreen";
import Screen from "../components/Screen";
import services from "../services";
import Preview from "../components/Preview";
import PreviewList from "../components/PreviewList";

export default class LandingScreen extends BaseScreen {
  state = {
    movies: [],
  };

  async componentDidMount () {
    const res = await services.api.get('/api/movie/latest');
    this.setState({movies: get(res.body, 'items', [])});
  }

  render () {
    return (
      <Screen name="Landing">
        <PreviewList>
          {this.state.movies.map(result => <Preview key={result.id} {...result}/>)}
        </PreviewList>
      </Screen>
    );
  }
}
