import React from 'react';

const Length = (props) => {
  const lengthValue = (220 / 5) * props.length.value;
  const lengthStyle = {
    position: 'absolute',
    left: `${lengthValue}px`,
    top: '-2px'
  };

  return (
    <div>
      Length
      <div style={props.barStyle}>
        <div style={props.firstWhiteSpaceStyle}></div>
        <div style={props.secondWhiteSpaceStyle}></div>
        <div style={props.leftNotationStyle}>Too short</div>
        <div style={props.rightNotationStyle}>Too long</div>
        <div style={lengthStyle}>&#9660;</div>
      </div>
      <br></br>
      <br></br>
    </div>
  );
};

export default Length;
