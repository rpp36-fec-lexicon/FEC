import React from 'react';

const Width = (props) => {
  const widthValue = (220 / 5) * props.width.value;
  const widthStyle = {
    position: 'absolute',
    left: `${widthValue}px`,
    top: '-2px'
  };
  return (
    <div>
      Width
      <div style={props.barStyle}>
        <div style={props.firstWhiteSpaceStyle}></div>
        <div style={props.secondWhiteSpaceStyle}></div>
        <div style={props.leftNotationStyle}>Too tight</div>
        <div style={props.rightNotationStyle}>Too loose</div>
        <div style={widthStyle}>&#9660;</div>
      </div>
      <br></br>
      <br></br>
    </div>
  );
};

export default Width;
