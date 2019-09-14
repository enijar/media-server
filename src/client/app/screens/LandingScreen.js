import React from "react";
import get from "lodash/get";
import BaseScreen from "./BaseScreen";
import Screen from "../components/Screen";
import Search from "../components/Search";
import Pagination from "../components/Pagination";
import services from "../services";
import { AppContext } from "../context/AppContext";
import Preview from "../components/Preview";
import PreviewList from "../components/PreviewList";

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

        <PreviewList>
          {get(this.state.results, 'items', []).map(item => (
            <Preview key={`preview.${item.id}`} {...item}/>
          ))}
        </PreviewList>

        {totalPages > 1 && (
          <Pagination
            page={this.state.results.page}
            totalPages={totalPages}
            onChange={this.#handlePageChange}
          />
        )}
      </Screen>
    );
  }
}
