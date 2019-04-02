import React from "react";
import AppContext from "../app/Context/App";
import BaseScreen from "./BaseScreen";
import Screen from "../Components/Screen";

const API_KEY = '51421ce3f49d256ef63b70b3beeb7792';
const API_ENDPOINT = 'https://api.themoviedb.org/3';
const ASSET_ENDPOINT = 'https://image.tmdb.org/t/p/w500';

@AppContext
export default class HomeScreen extends BaseScreen {
  state = {
    popular: [],
    results: [],
    showResults: false,
    submitting: false,
    query: '',
  };

  async componentDidMount () {
    let res = await fetch(`${API_ENDPOINT}/trending/movie/week?api_key=${API_KEY}`);
    res = await res.json();
    this.setState({popular: res.results});
  }

  handleSubmit = async event => {
    event.preventDefault();
    if (this.state.submitting) {
      return;
    }
    await this.setState({submitting: true});
    let res = await fetch(`${API_ENDPOINT}/search/movie?api_key=${API_KEY}&language=en-US&query=${this.state.query}&page=1&include_adult=false`);
    res = await res.json();
    this.setState({submitting: false, showResults: true, results: res.results});
  };

  handleChange = event => {
    this.setState({[event.target.name]: event.target.value});
  };

  render () {
    return (
      <Screen name="Home">
        <div className="grid">
          <form onSubmit={this.handleSubmit}>
            <input name="query" onChange={this.handleChange}/>
            <button>Search</button>
          </form>
        </div>

        {this.state.showResults && (
          <div className="grid">
            {this.state.results.filter(item => item.poster_path && item.original_language === 'en').map((item, index) => (
              <div key={`result-${index}`} className="grid-item">
                <img src={`${ASSET_ENDPOINT}/${item.poster_path}`}/>
                <p>{item.title}</p>
                <p>Rating: {item.vote_average}</p>
              </div>
            ))}
          </div>
        )}

        {!this.state.showResults && (
          <div className="grid">
            {this.state.popular.map((item, index) => (
              <div key={`popular-${index}`} className="grid-item">
                <img src={`${ASSET_ENDPOINT}/${item.poster_path}`}/>
                <p>{item.title}</p>
                <p>Rating: {item.vote_average}</p>
              </div>
            ))}
          </div>
        )}
      </Screen>
    );
  }
}
