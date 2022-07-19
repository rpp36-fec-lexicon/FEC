import React from 'react';

const ProductBreakdown = (props) => {

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
    backgroundColor: 'white'
  };

  const secondWhiteSpaceStyle = {
    position: 'absolute',
    left: '145px',
    width: '5px',
    height: '10px',
    backgroundColor: 'white'
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

  const fitValue = (220 / 5) * props.characteristics.Fit.value;
  const fitStyle = {
    position: 'absolute',
    left: `${fitValue}px`,
    top: '-2px'
  };

  const lengthValue = (220 / 5) * props.characteristics.Length.value;
  const lengthStyle = {
    position: 'absolute',
    left: `${lengthValue}px`,
    top: '-2px'
  };

  const comfortValue = (220 / 5) * props.characteristics.Comfort.value;
  const comfortStyle = {
    position: 'absolute',
    left: `${comfortValue}px`,
    top: '-2px'
  };

  const qualityValue = (220 / 5) * props.characteristics.Quality.value;
  const qualityStyle = {
    position: 'absolute',
    left: `${qualityValue}px`,
    top: '-2px'
  };

  if (Object.keys(props)) {
    return (
      <div>

        <div>
          Fit
          <div style={barStyle}>
            <div style={firstWhiteSpaceStyle}></div>
            <div style={secondWhiteSpaceStyle}></div>
            <div style={leftNotationStyle}>Too small</div>
            <div style={rightNotationStyle}>Too large</div>
            <div style={fitStyle}>&#9660;</div>
          </div>
        </div>

        <br></br>
        <br></br>

        <div>
          Length
          <div style={barStyle}>
            <div style={firstWhiteSpaceStyle}></div>
            <div style={secondWhiteSpaceStyle}></div>
            <div style={leftNotationStyle}>Too short</div>
            <div style={rightNotationStyle}>Too long</div>
            <div style={lengthStyle}>&#9660;</div>
          </div>
        </div>

        <br></br>
        <br></br>

        <div>
          Comfort
          <div style={barStyle}>
            <div style={firstWhiteSpaceStyle}></div>
            <div style={secondWhiteSpaceStyle}></div>
            <div style={leftNotationStyle}>Poor</div>
            <div style={rightNotationStyle}>Perfect</div>
            <div style={comfortStyle}>&#9660;</div>
          </div>
        </div>

        <br></br>
        <br></br>

        <div>
          Quality
          <div style={barStyle}>
            <div style={firstWhiteSpaceStyle}></div>
            <div style={secondWhiteSpaceStyle}></div>
            <div style={leftNotationStyle}>Poor</div>
            <div style={rightNotationStyle}>Great</div>
            <div style={qualityStyle}>&#9660;</div>
          </div>
        </div>
      </div>
    );
  }

};

export default ProductBreakdown;
