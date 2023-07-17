import React, { Component } from "react";

class SubjectRow extends Component {
  state = {
    id: this.props.id,

    placeholderPercentage: this.props.value.percentagePlcHolder,
  };

  onClickSelfSelect = (e) => {
    e.target.select();
  };

  onClickSelectChildInput = (e) => {
    if (e.target.tagName === "INPUT") {
      e.target.select();
    } else {
      e.target.querySelector("input").select();
    }
  };

  onPercentageChange = (event) => {
    this.props.handlePercentageChange(
      this.props.id,
      parseFloat(event.target.value)
    );
  };

  onMarkChange = (event) => {
    this.props.handleMarkChange(this.props.id, parseFloat(event.target.value));
  };

  onMaxMarkChange = (event) => {
    this.props.handleMaxMarkChange(
      this.props.id,
      parseFloat(event.target.value)
    );
  };

  getGrade = () => {
    return (
      (this.props.value.grade / this.props.value.max) * this.props.value.percent
    );
  };

  getGradeLevel = (grade) => {
    if (grade < 0) return "INVALID";
    if (grade < 50) return "F";
    if (grade < 65) return "P";
    if (grade < 75) return "C";
    if (grade < 85) return "D";
    if (grade <= 100) return "HD";
    return "INVALID";
  };

  getClassNameForMark = () =>
    (!isNaN(this.getGrade()) ? "grade-display-box" : "grade-display-box--no-grade") +
    " hover-shadow-button " +
    this.getGradeLevel(
      (this.props.value.grade / this.props.value.max) * 100
    ).toLowerCase();

  render() {
    return (
      <div className="calculator-subject-row">
        <p className="subject-row-front-label">A{this.state.id + 1}</p>
        <div className="subject-row-inputs">
          <div className="double-input-box hover-shadow-button">
            <input
              type="number"
              placeholder="60.00"
              onClick={this.onClickSelfSelect}
              onChange={this.onMarkChange}
              defaultValue={this.props.value.grade}
              title="Your actual mark"
            />
            /
            <input
              type="number"
              placeholder="100"
              onClick={this.onClickSelfSelect}
              onChange={this.onMaxMarkChange}
              defaultValue={this.props.value.max}
              title="Maximum grade possible (usually 100)"
            />
          </div>
          <div
            className="percentage-input-box hover-shadow-button"
            onClick={this.onClickSelectChildInput}
            title="The percentage of the assignment."
          >
            <input
              type="number"
              placeholder={this.state.placeholderPercentage}
              onClick={this.onClickSelfSelect}
              onChange={this.onPercentageChange}
              defaultValue={this.props.value.percent}
            />
            %
          </div>
          <div className={this.getClassNameForMark()}>
            {!isNaN(this.getGrade()) ? this.getGrade().toFixed(2) : "..."}
          </div>
        </div>
        <p className="subject-row-end-label">pt</p>
      </div>
    );
  }
}

export default SubjectRow;
