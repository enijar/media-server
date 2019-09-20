import React from "react";
import get from "lodash/get";
import BaseScreen from "./BaseScreen";
import Screen from "../components/Screen";
import Services from "../services";
import Search from "../components/Search";
import Preview from "../components/Preview";
import PreviewList from "../components/PreviewList";

let LATEST_MOVIES_CACHE = [];

export default class LandingScreen extends BaseScreen {
  state = {
    movies: [],
  };

  async componentDidMount () {
    const res = await Services.api.get('/api/movie/latest');
    LATEST_MOVIES_CACHE = get(res.body, 'items', []);
    this.setState({movies: LATEST_MOVIES_CACHE});
  }

  #search = async query => {
    const res = await Services.api.post('/api/movie/search', {query});
    this.setState({movies: get(res.body, 'items', [])});
  };

  #handleChange = query => {
    query.trim().length === 0 && this.setState({movies: LATEST_MOVIES_CACHE});
  };

  render () {
    return (
      <Screen name="Landing">
        <Search onSubmit={this.#search} onChange={this.#handleChange}/>
        <PreviewList>
          {this.state.movies.map(result => <Preview key={result.id} {...result}/>)}
        </PreviewList>
      </Screen>
    );
  }
}
