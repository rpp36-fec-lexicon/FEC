import React from 'react';

const Comfort = (props) => {
  const comfortValue = (220 / 5) * props.comfort.value;
  const comfortStyle = {
    position: 'absolute',
    left: `${comfortValue}px`,
    top: '-2px'
  };

  return (
    <div>
      Comfort
      <div style={props.barStyle}>
        <div style={props.firstWhiteSpaceStyle}></div>
        <div style={props.secondWhiteSpaceStyle}></div>
        <div style={props.leftNotationStyle}>Poor</div>
        <div style={props.rightNotationStyle}>Perfect</div>
        <div style={comfortStyle}>&#9660;</div>
      </div>
      <br></br>
      <br></br>
    </div>
  );
};

export default Comfort;
