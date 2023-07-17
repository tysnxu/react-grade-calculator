import React, { Component } from "react";

class CalculatorController extends Component {
  getGradeLevel = (grade) => {
    if (parseFloat(grade) === 0) return "...";
    if (grade < 0) return "INVALID";
    if (grade < 50) return "F";
    if (grade < 65) return "P";
    if (grade < 75) return "C";
    if (grade < 85) return "D";
    if (grade <= 100) return "HD";
    return "INVALID";
  };

  getGradeLevelFull = (grade) => {
    if (parseFloat(grade) === 0) return "...";
    if (grade < 0) return "INVALID";
    if (grade < 50) return "Fail";
    if (grade < 65) return "Pass";
    if (grade < 75) return "Credit";
    if (grade < 85) return "Distinction";
    if (grade <= 100) return "High Distinction";
    return "INVALID";
  };

  getPercentage = () => {
    return this.props.totalMarks;
  };

  getPercentageOutOfTotal = () => {
    return ((this.props.totalMarks) / (100 - this.props.remainingPercentage) * 100).toFixed(2) ;
  }

  getClassForPercentage = () =>
    "percentage-indicator hover-shadow-button" +
    (!this.props.enableAddButton ? " disabled-button" : "") +
    (this.props.remainingPercentage < 0 ? " invalid-input" : "");

  getClassForPlusButton = () =>
    "plus-button hover-shadow-button" +
    (!this.props.enableAddButton ? " disabled-button" : "");

  getClassForMinusButton = () =>
    "minus-button hover-shadow-button" +
    (!this.props.enableMinusButton ? " disabled-button" : "");

  render() {
    return (
      <>
        <div className="calculator-controller-header">
          <span>Add / Remove Row</span>
          <span>Marks left</span>
          <span>Current Total</span>
        </div>
        <div className="calculator-controller-row">
          <div
            className={this.getClassForMinusButton()}
            onClick={this.props.removeSubjectHandler}
            title="Remove the last assignment"
          ></div>
          <div
            className={this.getClassForPlusButton()}
            onClick={this.props.addSubjectHandler}
            title="Add a new assignment"
            ></div>
          <div className={this.getClassForPercentage()}>
            {this.props.remainingPercentage.toFixed(0)}%
          </div>
          <div className="total-indicator hover-shadow-button">{this.getPercentage() !== 0 ? (this.getPercentage()).toFixed(2) : "..."}</div>
          <div className="total-points-end-label">pt</div>
        </div>
        <div className="calculator-status-row">
          <div
            className="calculator-total-out-of hover-shadow-button"
            style={{"--current-grade": `${this.getPercentageOutOfTotal()}%`}}
          >
            {this.props.totalMarks.toFixed(2) || 0} out of{" "}
            {(100 - this.props.remainingPercentage).toFixed(2)}
          </div>
          <div className={"calculator-total-level hover-shadow-button " + this.getGradeLevel(this.getPercentageOutOfTotal()).toLowerCase()} title={this.getGradeLevelFull(this.getPercentageOutOfTotal())}>
            {this.getGradeLevel(this.getPercentageOutOfTotal())}
          </div>
        </div>
      </>
    );
  }
}

export default CalculatorController;
