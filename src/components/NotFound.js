import React, { Component } from "react";
import { connect } from "react-redux";

const margin = { margin: '10rem' };

class NotFound extends Component {
  render() {
    return (
      <div className={margin}>
        <h3>404 page not found</h3>
      </div>
    )
  }
}

const mapStateToProps = state => {};

export default connect(mapStateToProps)(NotFound);
