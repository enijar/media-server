import React, {Component} from "react";
import PropTypes from "prop-types";
import services from "../services/index";

export default class Search extends Component {
    static propTypes = {
        onResults: PropTypes.func,
        page: PropTypes.number,
    };

    static defaultProps = {
        page: 1,
    };

    state = {
        query: '',
        page: this.props.page,
    };

    async componentWillReceiveProps(nextProps, nextContext) {
        if (nextProps.page && nextProps.page !== this.state.page) {
            await this.setState({page: nextProps.page});
            return this.submit();
        }
    }

    async submit() {
        if (this.state.query.trim().length < 3) {
            this.props.onResults && this.props.onResults([]);
            return;
        }
        const res = await services.api.post('/api/movie/search', {
            query: this.state.query,
            page: this.state.page,
        });
        this.props.onResults && this.props.onResults(res.body);
    }

    handleChange = async event => {
        await this.setState({[event.target.name]: event.target.value});
        return this.submit();
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
