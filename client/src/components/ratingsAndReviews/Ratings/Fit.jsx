import React from 'react';

const Fit = (props) => {
  const fitValue = (220 / 5) * props.fit.value;
  const fitStyle = {
    position: 'absolute',
    left: `${fitValue}px`,
    top: '-2px'
  };

  return (
    <div>
      Fit
      <div style={props.barStyle}>
        <div style={props.firstWhiteSpaceStyle}></div>
        <div style={props.secondWhiteSpaceStyle}></div>
        <div style={props.leftNotationStyle}>Too small</div>
        <div style={props.rightNotationStyle}>Too large</div>
        <div style={fitStyle}>&#9660;</div>
      </div>
      <br></br>
      <br></br>
    </div>
  );
};

export default Fit;
