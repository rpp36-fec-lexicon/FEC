import React from 'react';

const Characteristic = (props) => {

  const barStyle = {
    position: 'relative',
    width: '220px',
    height: '10px',
    backgroundColor: 'grey'
  };

  const firstWhiteSpaceStyle = {
    position: 'absolute',
    left: '70px',
    width: '5px',
    height: '10px',
    backgroundColor: 'rgba(229, 228, 228, 0.8)'
  };

  const secondWhiteSpaceStyle = {
    position: 'absolute',
    left: '145px',
    width: '5px',
    height: '10px',
    backgroundColor: 'rgba(229, 228, 228, 0.8)'
  };

  const leftNotationStyle = {
    position: 'absolute',
    top: '15px',
    fontSize: '13px'
  };

  const rightNotationStyle = {
    position: 'absolute',
    right: '0px',
    top: '15px',
    fontSize: '13px'
  };

  const value = (218/5) * props.characteristic[1].value;
  const valueStyle = {
    position: 'absolute',
    left: `${value}px`,
    top: '-2px'
  };

  return (
    <div>
      {props.characteristic[0]}
      <div style={barStyle}>
        <div style={firstWhiteSpaceStyle}></div>
        <div style={secondWhiteSpaceStyle}></div>
        <div style={leftNotationStyle}>{props.characteristic[2]}</div>
        <div style={rightNotationStyle}>{props.characteristic[3]}</div>
        <div style={valueStyle}>&#9660;</div>
      </div>
      <br></br>
      <br></br>
    </div>
  );
};

export default Characteristic;

