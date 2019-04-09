import React from "react";
import AppContext from "../app/Context/App";
import BaseScreen from "./BaseScreen";
import Screen from "../Components/Screen";
import services from "../services/index";
import config from "../../../config/client";

@AppContext
export default class HomeScreen extends BaseScreen {
    state = {
        featured: [],
        results: [],
        showResults: false,
        submitting: false,
        query: '',
    };

    async componentDidMount() {
        const res = await services.api.get('/api/movie/featured');
        this.setState({featured: res.body.results});
    }

    handleSubmit = async event => {
        event.preventDefault();
        if (this.state.submitting) {
            return;
        }
        await this.setState({submitting: true});
        const res = await services.api.post('/api/movie/search', {query: this.state.query});
        this.setState({submitting: false, showResults: true, results: res.results});
    };

    handleChange = event => {
        this.setState({[event.target.name]: event.target.value});
    };

    render() {
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
                                <img src={`${config.assentEndpoint}/${item.poster_path}`}/>
                                <p>{item.title}</p>
                                <p>Rating: {item.vote_average}</p>
                            </div>
                        ))}
                    </div>
                )}

                {!this.state.showResults && (
                    <div className="grid">
                        {this.state.featured.map((item, index) => (
                            <div key={`featured-${index}`} className="grid-item">
                                <img src={`${config.assentEndpoint}/${item.poster_path}`}/>
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
