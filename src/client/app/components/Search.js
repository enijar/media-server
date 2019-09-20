import React, { Component } from "react";
import PropTypes from "prop-types";

export default class Search extends Component {
  static propTypes = {
    onSubmit: PropTypes.func,
    onChange: PropTypes.func,
  };

  state = {
    query: '',
  };

  #handleChange = event => {
    const query = event.target.value;
    this.setState({query});
    this.props.onChange && this.props.onChange(query);
  };

  #handleSubmit = event => {
    event.preventDefault();
    this.props.onSubmit && this.props.onSubmit(this.state.query);
  };

  render () {
    return (
      <form className="Search" onSubmit={this.#handleSubmit}>
        <input
          type="text"
          name="query"
          value={this.state.query}
          onChange={this.#handleChange}
          placeholder="Enter a movie title..."
        />
      </form>
    );
  }
}
