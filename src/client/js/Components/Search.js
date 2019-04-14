import React, {Component} from "react";
import PropTypes from "prop-types";

export default class Search extends Component {
    static propTypes = {
        onChange: PropTypes.func,
    };

    state = {
        query: '',
    };

    handleChange = event => {
        this.setState({query: event.target.value});
        this.props.onChange && this.props.onChange(event.target.value);
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
