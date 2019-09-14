import React, { Component } from "react";
import PropTypes from "prop-types";

export default class Pagination extends Component {
  static propTypes = {
    onChange: PropTypes.func,
    page: PropTypes.number,
    totalPages: PropTypes.number,
  };

  static defaultProps = {
    page: 1,
    totalPages: 1,
  };

  #handlePress = page => () => {
    console.log('page', page);
    this.props.onChange && this.props.onChange(page);
  };

  render () {
    return (
      <div className="Pagination">
        {Array.from({length: this.props.totalPages}).map((item, index) => (
          <button
            key={`page-${index}`}
            type="button"
            onClick={this.#handlePress(index + 1)}
          >
            {index + 1}
          </button>
        ))}
      </div>
    );
  }
}
