import React, {createRef} from "react";
import WebTorrent from "webtorrent";
import AppContext from "../app/Context/App";
import BaseScreen from "./BaseScreen";
import Screen from "../Components/Screen";
import services from "../services/index";

@AppContext
export default class WatchScreen extends BaseScreen {
    client = new WebTorrent({
        dht: false,
    });

    player = createRef();

    state = {
        movie: null,
    };

    async componentDidMount() {
        const movie = (await services.api.get(`/api/movie/${this.props.match.params.id}`)).body;
        const magnet = services.magnet.get(movie);

        console.log(magnet);

        this.setState({movie});

        const res = await services.api.get(`/api/stream/${movie.id}`);
        console.log('res', res);
    }

    render() {
        if (!this.state.movie) {
            return 'Loading...';
        }

        return (
            <Screen name="Watch">
                <div className="grid">
                    <div className="grid-item" style={{
                        width: '100%',
                        textAlign: 'left',
                    }}>
                        <h1>{this.state.movie.title}</h1>

                        <p><strong>Description</strong></p>
                        <p>{this.state.movie.description_full}</p>

                        <p><strong>Year</strong></p>
                        <p>{this.state.movie.year}</p>

                        <p><strong>Genres</strong></p>
                        <p>{this.state.movie.genres.join(', ')}</p>
                    </div>
                </div>

                <div className="grid">
                    <div ref={this.player}/>
                </div>
            </Screen>
        );
    }
}
