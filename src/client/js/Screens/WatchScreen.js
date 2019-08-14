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
        this.setState({movie});
    }

    fullScreen = () => {
        if (this.player.current) {
            return this.player.current.requestFullscreen();
        }
    };

    render() {
        if (!this.state.movie) {
            return 'Loading...';
        }

        return (
            <Screen name="Watch">
                <div className="grid">
                    <div>
                        <button onClick={() => this.props.history.push('/')}>&lt;Back</button>
                    </div>

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
                        <p>{(this.state.movie.genres || []).join(', ')}</p>
                    </div>
                </div>

                <div className="grid" style={{alignItems: 'flex-start'}}>
                    <video ref={this.player} autoPlay controls style={{width: '100%'}}>
                        <source src={`/api/stream/${this.state.movie.id}`} type="video/mp4"/>
                    </video>

                    <button onClick={this.fullScreen}>Fullscreen</button>
                </div>
            </Screen>
        );
    }
}
