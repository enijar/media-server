import React from "react";
import AppContext from "../app/Context/App";
import BaseScreen from "./BaseScreen";
import Screen from "../Components/Screen";
import Search from "../Components/Search";

@AppContext
export default class HomeScreen extends BaseScreen {
    state = {
        results: [],
    };

    handleResults = results => {
        this.setState({results});
    };

    render() {
        return (
            <Screen name="Home">
                <Search onResults={this.handleResults}/>

                {this.state.results.length > 0 && (
                    <div className="grid">
                        {this.state.results.map((result, index) => (
                            <div key={`result-${index}`}>
                                <img src={`/images/${result.id}.jpg`}/>
                                <h4>{result.title}</h4>
                            </div>
                        ))}
                    </div>
                )}
            </Screen>
        );
    }
}
