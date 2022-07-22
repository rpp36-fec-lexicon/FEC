import React from 'react';
import Size from './Size.jsx';
import Width from './Width.jsx';
import Fit from './Fit.jsx';
import Length from './Length.jsx';
import Comfort from './Comfort.jsx';
import Quality from './Quality.jsx';

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

  let size;
  let width;
  let fit;
  let length;
  let comfort;
  let quality;

  if (Object.keys(props.characteristics)) {
    if (props.characteristics.Size !== undefined) {
      size = <Size
        size={props.characteristics.Size}
        barStyle={barStyle}
        firstWhiteSpaceStyle={firstWhiteSpaceStyle}
        secondWhiteSpaceStyle={secondWhiteSpaceStyle}
        leftNotationStyle={leftNotationStyle}
        rightNotationStyle={rightNotationStyle}
      />;
    }

    if (props.characteristics.Width !== undefined) {
      width = <Width
        width={props.characteristics.Width}
        barStyle={barStyle}
        firstWhiteSpaceStyle={firstWhiteSpaceStyle}
        secondWhiteSpaceStyle={secondWhiteSpaceStyle}
        leftNotationStyle={leftNotationStyle}
        rightNotationStyle={rightNotationStyle}/>;
    }

    if (props.characteristics.Fit !== undefined) {
      fit = <Fit
        fit={props.characteristics.Fit}
        barStyle={barStyle}
        firstWhiteSpaceStyle={firstWhiteSpaceStyle}
        secondWhiteSpaceStyle={secondWhiteSpaceStyle}
        leftNotationStyle={leftNotationStyle}
        rightNotationStyle={rightNotationStyle}/>;
    }

    if (props.characteristics.Length !== undefined) {
      length = <Length
        length={props.characteristics.Length}
        barStyle={barStyle}
        firstWhiteSpaceStyle={firstWhiteSpaceStyle}
        secondWhiteSpaceStyle={secondWhiteSpaceStyle}
        leftNotationStyle={leftNotationStyle}
        rightNotationStyle={rightNotationStyle}/>;
    }

    if (props.characteristics.Comfort !== undefined) {
      comfort = <Comfort
        comfort={props.characteristics.Comfort}
        barStyle={barStyle}
        firstWhiteSpaceStyle={firstWhiteSpaceStyle}
        secondWhiteSpaceStyle={secondWhiteSpaceStyle}
        leftNotationStyle={leftNotationStyle}
        rightNotationStyle={rightNotationStyle}/>;
    }

    if (props.characteristics.Quality !== undefined) {
      quality = <Quality
        quality={props.characteristics.Quality}
        barStyle={barStyle}
        firstWhiteSpaceStyle={firstWhiteSpaceStyle}
        secondWhiteSpaceStyle={secondWhiteSpaceStyle}
        leftNotationStyle={leftNotationStyle}
        rightNotationStyle={rightNotationStyle}/>;
    }

    return (
      <div>
        {size}

        {width}

        {fit}

        {length}

        {comfort}

        {quality}

      </div>
    );
  }

};

export default ProductBreakdown;
