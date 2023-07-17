import React, { Component } from "react";

class GraphAreaNoContent extends Component {
  
  render() {
    return (
      <div className="graph-area fill-first-label">
        <img src={"./images/write.svg"} alt="" />
        <p className="graph-fill-first-hint">Please fill the table first</p>
      </div>
    );
  }
}

export default GraphAreaNoContent;
