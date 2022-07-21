import React from 'react';

const Size = (props) => {
  const sizeValue = (220 / 5) * props.size.value;
  const sizeStyle = {
    position: 'absolute',
    left: `${sizeValue}px`,
    top: '-2px'
  };

  return (
    <div>
      Size
      <div style={props.barStyle}>
        <div style={props.firstWhiteSpaceStyle}></div>
        <div style={props.secondWhiteSpaceStyle}></div>
        <div style={props.leftNotationStyle}>Too small</div>
        <div style={props.rightNotationStyle}>Too large</div>
        <div style={sizeStyle}>&#9660;</div>
      </div>
      <br></br>
      <br></br>
    </div>
  );
};

export default Size;

