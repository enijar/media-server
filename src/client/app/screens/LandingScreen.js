import React from "react";
import { Link } from "react-router-dom";
import get from "lodash/get";
import BaseScreen from "./BaseScreen";
import Screen from "../components/Screen";
import Search from "../components/Search";
import Pagination from "../components/Pagination";
import services from "../services";
import { AppContext } from "../context/AppContext";

@AppContext
export default class LandingScreen extends BaseScreen {
  state = {
    results: null,
    page: 1,
    query: '',
  };

  #handlePageChange = page => {
    if (page === this.state.page) {
      return;
    }
    this.setState({page});
    return this.#search(this.state.query, page);
  };

  #search = async (query, page) => {
    const res = await services.api.post('/api/movie/search', {query, page});
    this.setState({results: res.body});
  };

  #handleQueryChange = query => {
    if (query.trim().length < 2 || query === this.state.query) {
      return;
    }
    this.setState({query, page: 1});
    return this.#search(query, 1);
  };

  async componentDidMount () {
    const res = await services.api.get('/api/movie/latest');
    this.setState({results: res.body});
  }

  render () {
    const totalPages = get(this.state.results, 'totalPages', 0);

    return (
      <Screen name="Landing">
        <Search onChange={this.#handleQueryChange}/>

        {get(this.state.results, 'items', []).length > 0 && (
          <div className="grid">
            {this.state.results.items.map((result, index) => (
              <Link key={`result-${result.id}-${index}`} className="grid-item" to={`/watch/${result.id}`}>
                <img src={result.img} alt={result.title}/>
                <p><strong>{result.title}</strong></p>
                <p>{result.year}</p>
                <p>Rating: {result.rating}</p>
              </Link>
            ))}
          </div>
        )}

        <div className="grid">
          {totalPages > 1 && (
            <Pagination
              page={this.state.results.page}
              totalPages={totalPages}
              onChange={this.#handlePageChange}
            />
          )}
        </div>
      </Screen>
    );
  }
}
