import React, { Component } from "react";

class CalculatorHeader extends Component {
  render() {
    return <div className="calculator-header">
      <span>Grade</span>
      <span>/</span>
      <span>Maximum</span>
      <span>x</span>
      <span>Percentage</span>
      <span>=</span>
      <span>Final Points</span>
    </div>;
  }
}

export default CalculatorHeader;
