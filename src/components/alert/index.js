import React, { Component } from "react";

import "./styles.css";

class Alert extends Component {
  constructor(props) {
    super(props);
    this.color = null;
    this.fontSize = "14px";
    this.backgroundColor = null;
    this.margin = "0 auto";
  }

  getStyle = () => {
    return {
      color: this.color,
      fontSize: this.fontSize,
      backgroundColor: this.backgroundColor,
      margin: this.margin,
    };
  };

  render() {
    const { message } = this.props;
    return (
      <div className="alert-message" style={this.getStyle()}>
        {message}
      </div>
    );
  }
}

export default Alert;
