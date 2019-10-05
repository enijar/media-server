import React from "react";
import get from "lodash/get";
import BaseScreen from "./BaseScreen";
import Screen from "../components/Screen";
import Services from "../services";
import Search from "../components/Search";
import Preview from "../components/Preview";
import PreviewList from "../components/PreviewList";
import MovieOverlay from "../components/MovieOverlay";

let LATEST_MOVIES_CACHE = [];

export default class LandingScreen extends BaseScreen {
  state = {
    movies: [],
    overlayOpen: false,
    movie: null,
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

  #closeOverlay = () => {
    this.setState({overlayOpen: false});
  };

  #openOverlay = movie => {
    this.setState({overlayOpen: true, movie});
  };

  render () {
    return (
      <Screen name="Landing">
        <Search onSubmit={this.#search} onChange={this.#handleChange}/>
        <PreviewList>
          {this.state.movies.map(movie => (
            <Preview
              key={movie.id}
              movie={movie}
              openOverlay={this.#openOverlay}
            />
          ))}

          <MovieOverlay
            open={this.state.overlayOpen}
            onClose={this.#closeOverlay}
            movie={this.state.movie}
          />
        </PreviewList>
      </Screen>
    );
  }
}
