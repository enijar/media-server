import React from "react";
import get from "lodash/get";
import AppContext from "../app/Context/App";
import BaseScreen from "./BaseScreen";
import Screen from "../Components/Screen";
import Search from "../Components/Search";
import Pagination from "../Components/Pagination";

@AppContext
export default class HomeScreen extends BaseScreen {
    state = {
        results: null,
        page: 1,
        query: '',
    };

    handleResults = results => {
        results.page = results.query !== this.state.query ? 1 : results.page;
        this.setState({results, query: results.query});
    };

    changePage = page => this.setState({page});

    render() {
        return (
            <Screen name="Home">
                <Search
                    onResults={this.handleResults}
                    page={this.state.page}
                />

                {get(this.state.results, 'items', []).length > 0 && (
                    <div className="grid">
                        {this.state.results.items.map((result, index) => (
                            <div key={`result-${result.id}-${index}`} className="grid-item">
                                <img src={`/images/${result.id}.jpg`} alt={result.title}/>
                                <p>
                                    <strong>{result.title}</strong>
                                </p>
                                <p>{result.year}</p>
                                <p>Rating: {result.rating}</p>
                            </div>
                        ))}
                    </div>
                )}

                {get(this.state.results, 'totalPages', 0) > 1 && (
                    <div className="grid">
                        <Pagination
                            page={this.state.results.page}
                            totalPages={this.state.results.totalPages}
                            onChange={this.changePage}
                        />
                    </div>
                )}
            </Screen>
        );
    }
}
