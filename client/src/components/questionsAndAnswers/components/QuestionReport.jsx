import React from 'react';
import serverhelper from '../sampledata';
import interact from './Interact.jsx';

const QuestionReport = (props) => {
  let reportStatus = 'Report';
  const reportedBtn = () => {
    reportStatus = 'Reported';
    serverhelper.putReportQuestion(props.qid);
    interact('btn', 'QuestionReportButton');
  };

  return (
    <div>
      <button type="submit" onClick={reportedBtn}>{reportStatus}</button>
    </div>
  );
};

export default QuestionReport;