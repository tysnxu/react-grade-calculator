import React, { Component } from "react";

class StripeArea extends Component {
  // this.props.subjects;

  marks = 0;
  whatIfValue = 0;

  generateStripeStartValues = () => {
    let runningLeftValue = 0;
    let remainingPercentage = 100;

    let startWidthValueArray = [];

    this.props.subjects.forEach((subject) => {
      let mark = (subject.grade / subject.max) * 100;
      let weightedMark = (subject.grade / subject.max) * subject.percent;

      if (!isNaN(weightedMark)) {
        if (weightedMark !== 0) {
          // DON'T DISPLAY ON STRIP IF NO MARK

          startWidthValueArray.push({
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

    if (remainingPercentage > 0) {
      startWidthValueArray.push({
        id: -1,
        left: runningLeftValue,
        width: remainingPercentage,
        mark: 0,
      });
    }

    this.marks = runningLeftValue;
    this.whatIfValue = remainingPercentage;

    return startWidthValueArray;
  };

  // getWhatIfStrip = () => {
  //   return this.generateStripeStartValues().map((element) => {
  //     let style = {
  //       "--subject-grade": `${element.width}%`,
  //       left: `${element.left}%`,
  //     };

  //     if (!isNaN(element.id)) {
  //       return (
  //         <div
  //           key={element.id}
  //           className={this.getClassForSubjectStripe(element.mark)}
  //           style={style}
  //         >
  //           <p className="subject-stripe--label">A{element.id + 1}</p>
  //         </div>
  //       );
  //     } else {
  //       return (
  //         <div
  //           key="whatif-stripe"
  //           className="subject-stripe whatif-stripe"
  //           style={style}
  //         >
  //           <p className="subject-stripe--label">WHAT IF</p>
  //           <div className="all-what-if-stripes">
  //             <div className="what-if-stripe p">
  //               <p className="what-if-stripe--pre-tag">P</p>
  //               <p className="what-if-stripe--post-tag">
  //                 {(this.marks + 0.5 * this.whatIfValue).toFixed(0)}
  //               </p>
  //             </div>
  //             <div className="what-if-stripe c">
  //               <p className="what-if-stripe--pre-tag">C</p>
  //               <p className="what-if-stripe--post-tag">
  //                 {(this.marks + 0.65 * this.whatIfValue).toFixed(0)}
  //               </p>
  //             </div>
  //             <div className="what-if-stripe d">
  //               <p className="what-if-stripe--pre-tag">D</p>
  //               <p className="what-if-stripe--post-tag">
  //                 {(this.marks + 0.75 * this.whatIfValue).toFixed(0)}
  //               </p>
  //             </div>
  //             <div className="what-if-stripe hd">
  //               <p className="what-if-stripe--pre-tag">HD</p>
  //               <p className="what-if-stripe--post-tag">
  //                 {(this.marks + 0.85 * this.whatIfValue).toFixed(0)}
  //               </p>
  //             </div>
  //           </div>
  //         </div>
  //       );
  //     }
  //   });
  // };

  render() {
    return (
      <>
        {this.generateStripeStartValues().map((element) => {
          let style = {
            "--subject-grade": `${element.width}%`,
            left: `${element.left}%`,
          };

          if (!isNaN(element.id)) {
            return (
              <div
                key={element.id}
                className={this.getClassForSubjectStripe(element.mark)}
                style={style}
              >
                <p className="subject-stripe--label">A{element.id + 1}</p>
              </div>
            );
          } else {
            return (
              <div
                key="whatif-stripe"
                className="subject-stripe whatif-stripe"
                style={style}
              >
                <p className="subject-stripe--label">WHAT IF</p>
                <div className="all-what-if-stripes">
                  <div className="what-if-stripe p">
                    <p className="what-if-stripe--pre-tag">P</p>
                    <p className="what-if-stripe--post-tag">
                      {(this.marks + 0.5 * this.whatIfValue).toFixed(0)}
                    </p>
                  </div>
                  <div className="what-if-stripe c">
                    <p className="what-if-stripe--pre-tag">C</p>
                    <p className="what-if-stripe--post-tag">
                      {(this.marks + 0.65 * this.whatIfValue).toFixed(0)}
                    </p>
                  </div>
                  <div className="what-if-stripe d">
                    <p className="what-if-stripe--pre-tag">D</p>
                    <p className="what-if-stripe--post-tag">
                      {(this.marks + 0.75 * this.whatIfValue).toFixed(0)}
                    </p>
                  </div>
                  <div className="what-if-stripe hd">
                    <p className="what-if-stripe--pre-tag">HD</p>
                    <p className="what-if-stripe--post-tag">
                      {(this.marks + 0.85 * this.whatIfValue).toFixed(0)}
                    </p>
                  </div>
                </div>
              </div>
            );
          }
        })}
      </>
    );
  }
}

export default StripeArea;
