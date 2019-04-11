import React, {Component} from "react";
import PropTypes from "prop-types";
import services from "../services/index";

export default class Search extends Component {
    static propTypes = {
        onResults: PropTypes.func,
    };

    state = {
        query: '',
    };

    handleChange = async event => {
        await this.setState({[event.target.name]: event.target.value});
        if (this.state.query.trim().length < 3) {
            this.props.onResults && this.props.onResults([]);
            return;
        }
        const res = await services.api.post('/api/movie/search', {query: this.state.query});
        this.props.onResults && this.props.onResults(res.body);
    };

    render() {
        return (
            <div className="Search">
                <input
                    type="text"
                    name="query"
                    value={this.state.query}
                    onChange={this.handleChange}
                    placeholder="Enter a movie title..."
                />
            </div>
        );
    }
}
