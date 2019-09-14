import React, { Component } from "react";

export default class PreviewList extends Component {
  render () {
    return (
      <div className="PreviewList">
        {this.props.children}
      </div>
    );
  }
}
