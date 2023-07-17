import "./App.css";
import React, { useState, useEffect } from "react";

import SubjectRow from "./Components/SubjectRow";
import CalculatorHeader from "./Components/CalculatorHeader";
import CalculatorController from "./Components/CalculatorController";

import GraphArea from "./Components/GraphArea";
import GraphAreaNoContent from "./Components/GraphAreaNoContent";

function App() {
  let defaultPercentage = 30;

  const [info, setInfo] = useState({
    subjects: [
      {
        id: 0,
        grade: undefined,
        max: undefined,
        percent: undefined,
        percentagePlcHolder: defaultPercentage,
      },
      {
        id: 1,
        grade: undefined,
        max: undefined,
        percent: undefined,
        percentagePlcHolder: defaultPercentage,
      },
    ],
    totalPercentage: defaultPercentage * 2,
    totalMarks: 0,
  });

  // LOAD FROM LOCAL STORAGE
  useEffect(() => {
    const info = JSON.parse(localStorage.getItem("subjectInfo"));
    if (info) {
      setInfo(info);
    }
  }, []);

  const localStoreInfo = (info) => {
    // console.log(info.totalPercentage);
    localStorage.setItem("subjectInfo", JSON.stringify(info));
  };

  const updateInfo = (newInfo) => {
    setInfo(newInfo);
    localStoreInfo(newInfo);
  };

  const calculateTotalMark = (subjects) => {
    let mark = 0;
    subjects.forEach((subject) => {
      mark += (subject.grade / subject.max) * subject.percent || 0;
    });
    return mark;
  };

  const calculateTotalPercentage = (subjects) => {
    let percentage = 0;
    subjects.forEach((subject) => {
      // percentage += subject.percent || subject.percentagePlcHolder;
      percentage += (subject.percent || 0);
    });
    return percentage;
  };

  const handleAddSubject = () => {
    // CHECK IF PERCENTAGE WOULD'VE REACHED 100%
    let newSubjectPercentage = defaultPercentage;
    if (info.totalPercentage + defaultPercentage >= 100) {
      newSubjectPercentage = 100 - info.totalPercentage;
    }

    let newSubjects = [
      ...info.subjects,
      {
        id: info.subjects.length,
        grade: undefined,
        max: undefined,
        percent: undefined,
        percentagePlcHolder: newSubjectPercentage,
      },
    ];

    updateInfo({
      ...info,
      subjects: newSubjects,
      totalPercentage: calculateTotalPercentage(newSubjects),
      totalMarks: calculateTotalMark(newSubjects),
    });
  };

  const handleRemoveSubject = () => {
    let newSubjects = info.subjects.filter(
      (subject) => subject !== info.subjects[info.subjects.length - 1]
    );
    // console.log(newSubjects);

    updateInfo({
      ...info,
      subjects: newSubjects,
      totalPercentage: calculateTotalPercentage(newSubjects),
      totalMarks: calculateTotalMark(newSubjects),
    });
  };

  const handlePercentageChange = (subjectID, newValue) => {
    let newSubjects = info.subjects.map((subject) => {
      if (subject.id === subjectID) subject.percent = newValue;
      return subject;
    });

    updateInfo({
      ...info,
      subjects: newSubjects,
      totalPercentage: calculateTotalPercentage(newSubjects),
      totalMarks: calculateTotalMark(newSubjects),
    });
  };

  const handleMarkChange = (subjectID, newValue) => {
    let newSubjects = info.subjects.map((subject) => {
      if (subject.id === subjectID) subject.grade = newValue;
      return subject;
    });

    updateInfo({
      ...info,
      subjects: newSubjects,
      totalPercentage: calculateTotalPercentage(newSubjects),
      totalMarks: calculateTotalMark(newSubjects),
    });
  };

  const handleMaxMarkChange = (subjectID, newValue) => {
    let newSubjects = info.subjects.map((subject) => {
      if (subject.id === subjectID) subject.max = newValue;
      return subject;
    });

    updateInfo({
      ...info,
      subjects: newSubjects,
      totalPercentage: calculateTotalPercentage(newSubjects),
      totalMarks: calculateTotalMark(newSubjects),
    });
  };

  const getGraphArea = () =>
    info.totalMarks === 0 ? (
      <GraphAreaNoContent />
    ) : (
      <GraphArea subjects={info.subjects} mark={info.subjects.totalMarks} />
    );

  return (
      <div className="main-container">
        <div className="calculator-section">
          <h1>What if?</h1>
          <h3>Check if you can pass the subject.</h3>
          <div className="calculator-table">
            <CalculatorHeader />
            {info.subjects.map((subject) => (
              <SubjectRow
                key={subject.id}
                id={subject.id}
                value={subject}
                handlePercentageChange={handlePercentageChange}
                handleMarkChange={handleMarkChange}
                handleMaxMarkChange={handleMaxMarkChange}
                totalPercentage={info.totalPercentage}
              />
            ))}
          </div>

          <div className="calculator-controller-section">
            <CalculatorController
              addSubjectHandler={handleAddSubject}
              removeSubjectHandler={handleRemoveSubject}
              enableAddButton={info.totalPercentage < 100}
              enableMinusButton={info.subjects.length > 1}
              remainingPercentage={100 - info.totalPercentage}
              totalMarks={info.totalMarks}
            />
          </div>
        </div>

        <div className="graph-section">
          <h1>Summary</h1>
          {getGraphArea()}
        </div>
      <div className="logo-box"><p>Created by</p><img src={"./images/logo.svg"} alt="" />
      </div>
      </div>

  );
}

export default App;
