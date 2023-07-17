import React, { Component } from "react";

class GraphArea extends Component {
  marks = 0;
  whatIfValue = 0;
  whatIfStrip = [];

  // 50%, 65%, 75%, 85%, 100%
  calculatedWhatIfMarks = [];

  getGradeLevel = (grade) => {
    if (grade < 0) return "INVALID";
    if (grade < 50) return "F";
    if (grade < 65) return "P";
    if (grade < 75) return "C";
    if (grade < 85) return "D";
    if (grade <= 100) return "HD";
    return "INVALID";
  };

  getClassForSubjectStripe = (mark) => {
    return "subject-stripe " + this.getGradeLevel(mark).toLowerCase();
  };

  generateStripeValues = () => {
    let runningLeftValue = 0;
    let remainingPercentage = 100;

    let whatIfData = [];

    this.props.subjects.forEach((subject) => {
      let mark = (subject.grade / subject.max) * 100;
      let weightedMark = (subject.grade / subject.max) * subject.percent;

      if (!isNaN(weightedMark)) {
        if (weightedMark !== 0) {
          // DON'T DISPLAY ON STRIP IF NO MARK

          whatIfData.push({
            id: subject.id,
            left: runningLeftValue,
            width: weightedMark,
            mark: mark,
          });
        }

        runningLeftValue += weightedMark;
        remainingPercentage -= subject.percent;
      }
    });

    this.marks = runningLeftValue;
    this.whatIfValue = remainingPercentage;
    this.whatIfStrip = whatIfData;

    this.calculatedWhatIfMarks = [];
    this.calculatedWhatIfMarks.push(this.marks + 0.5 * this.whatIfValue);
    this.calculatedWhatIfMarks.push(this.marks + 0.65 * this.whatIfValue);
    this.calculatedWhatIfMarks.push(this.marks + 0.75 * this.whatIfValue);
    this.calculatedWhatIfMarks.push(this.marks + 0.85 * this.whatIfValue);
    this.calculatedWhatIfMarks.push(this.marks + this.whatIfValue);
  };

  getSubjectStrips = () => {
    return (
      <>
        {this.whatIfStrip.map((element) => {
          let style = {
            "--subject-grade": `${element.width}%`,
            left: `${element.left}%`,
          };

          return (
            <div
              key={element.id}
              className={this.getClassForSubjectStripe(element.mark)}
              style={style}
              title={`${element.width.toFixed(2)}%`}
            >
              <p className="subject-stripe--label">A{element.id + 1}</p>
            </div>
          );
        })}
      </>
    );
  };

  generateStripeArea = () => {
    if (this.whatIfValue === 0) {
      // NORMAL STRIPE MODE
      return (
        <>
          <div className="stripe-area no-what-if">
            {this.getSubjectStrips()}
          </div>
          <div
            className={
              this.marks > 75
                ? "summary-total-strip no-space"
                : "summary-total-strip"
            }
            style={{ "--total-width": this.marks + "%" }}
          >
            <p>
              <b>{this.getGradeLevel(this.marks)}</b> / {this.marks.toFixed(2)}
              pt
            </p>
          </div>
        </>
      );
    } else {
      // WHAT-IF MODE
      return (
        <div className="stripe-area">
          {this.getSubjectStrips()}
          <div
            key="whatif-stripe"
            className="subject-stripe whatif-stripe"
            style={{
              "--subject-grade": `${this.whatIfValue}%`,
              left: `${this.marks}%`,
            }}
          >
            <p className="subject-stripe--label">WHAT IF</p>
            <div
              className="all-what-if-stripes"
              data-too-long={
                this.marks + this.whatIfValue > 96 ? "true" : "false"
              }
            >
              <div className="what-if-stripe p">
                <p className="what-if-stripe--pre-tag">P</p>
                <p className="what-if-stripe--post-tag">
                  {this.calculatedWhatIfMarks[0].toFixed(0)}
                </p>
              </div>
              <div className="what-if-stripe c">
                <p className="what-if-stripe--pre-tag">C</p>
                <p className="what-if-stripe--post-tag">
                  {this.calculatedWhatIfMarks[1].toFixed(0)}
                </p>
              </div>
              <div className="what-if-stripe d">
                <p className="what-if-stripe--pre-tag">D</p>
                <p className="what-if-stripe--post-tag">
                  {this.calculatedWhatIfMarks[2].toFixed(0)}
                </p>
              </div>
              <div className="what-if-stripe hd">
                <p className="what-if-stripe--pre-tag">HD</p>
                <p className="what-if-stripe--post-tag">
                  {this.calculatedWhatIfMarks[3].toFixed(0)}
                </p>
              </div>
            </div>
          </div>
        </div>
      );
    }
  };

  generateWhatIfParagraph = () => {
    if (this.whatIfValue !== 0) {
      return (
        <div className="what-if-text-area">
          <p className="what-if-text-area-title">If you get...</p>
          <p className="what-if-text-area-title">your total would be...</p>
          <p>P (50%)</p>
          <p>
            {this.getGradeAndLevel(this.calculatedWhatIfMarks[0])}{" - "}
            <span>{this.getGradeAndLevel(this.calculatedWhatIfMarks[1])}</span>
          </p>
          <p>C (65%)</p>
          <p>
            {this.getGradeAndLevel(this.calculatedWhatIfMarks[1])}{" - "}
            <span>{this.getGradeAndLevel(this.calculatedWhatIfMarks[2])}</span>
          </p>
          <p>D (75%)</p>
          <p>
            {this.getGradeAndLevel(this.calculatedWhatIfMarks[2])}{" - "}
            <span>{this.getGradeAndLevel(this.calculatedWhatIfMarks[3])}</span>
          </p>
          <p>HD (85%)</p>
          <p>
            {this.getGradeAndLevel(this.calculatedWhatIfMarks[3])}{" - "}
            <span>{this.getGradeAndLevel(this.calculatedWhatIfMarks[4])}</span>
          </p>
        </div>
      );
    }
  };

  getGradeComment = () => {
    if (this.whatIfValue <= 0) {
      if (this.marks > 80) return "You did an excellent job!";
      if (this.marks > 65) return "You did a great job.";
      if (this.marks > 50) return "You passed the subject.";
      return "You didn't pass the subject.";
    } else {
      if (this.marks + this.whatIfValue === 100)
        return "You could get full mark!";
      if (this.marks + this.whatIfValue > 85)
        return "You could get high distinction!";
      if (this.marks + this.whatIfValue > 75)
        return "You can still get distinction!";
      if (this.marks + this.whatIfValue > 65)
        return "You can still get credit!";

      if (this.marks > 65) return "At least you have credit!";
      if (this.marks > 50) return "At least you passed!";
      if (this.marks < 50) return "You could still pass the subject!";
    }

    return "You can do it!";
  };

  getGradeAndLevel = (grade) =>
    `${grade.toFixed(2)} (${this.getGradeLevel(grade)})`;

  render() {
    this.generateStripeValues();

    return (
      <div className="graph-area">
        <p className="summary-header">{this.getGradeComment()}</p>
        {this.generateStripeArea()}
        {this.generateWhatIfParagraph()}
      </div>
    );
  }
}

export default GraphArea;
