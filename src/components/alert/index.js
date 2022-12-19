import React, { Component } from "react";

import "./styles.css";

class Alert extends Component {
  constructor(props) {
    super(props);
    this.color = null;
    this.fontSize = "14px";
  }

  getStyle = () => {
    return {
      color: this.color,
      fontSize: this.fontSize,
    };
  };

  render() {
    const { message } = this.props;
    return (
      <div>
        <p className="alert-message" style={this.getStyle()}>
          {message}
        </p>
      </div>
    );
  }
}

export default Alert;
