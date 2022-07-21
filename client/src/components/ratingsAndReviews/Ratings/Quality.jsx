import React from 'react';

const Quality = (props) => {
  const qualityValue = (220 / 5) * props.quality.value;
  const qualityStyle = {
    position: 'absolute',
    left: `${qualityValue}px`,
    top: '-2px'
  };

  return (
    <div>
      Quality
      <div style={props.barStyle}>
        <div style={props.firstWhiteSpaceStyle}></div>
        <div style={props.secondWhiteSpaceStyle}></div>
        <div style={props.leftNotationStyle}>Poor</div>
        <div style={props.rightNotationStyle}>Great</div>
        <div style={qualityStyle}>&#9660;</div>
      </div>
      <br></br>
      <br></br>
    </div>
  );
};

export default Quality;
