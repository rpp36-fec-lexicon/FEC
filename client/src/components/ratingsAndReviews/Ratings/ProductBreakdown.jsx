import React from 'react';
import Characteristic from './Characteristic.jsx';

const ProductBreakdown = (props) => {

  const characteristics = [];

  for (var key in props.characteristics) {
    characteristics.push([key, props.characteristics[key]]);
  }

  characteristics.forEach(characteristic => {
    if (characteristic[0] === 'Size') {
      characteristic[2] = 'Too small';
      characteristic[3] = 'Too large';
    } else if (characteristic[0] === 'Width') {
      characteristic[2] = 'Too tight';
      characteristic[3] = 'Too loose';
    } else if (characteristic[0] === 'Fit') {
      characteristic[2] = 'Too small';
      characteristic[3] = 'Too large';
    } else if (characteristic[0] === 'Length') {
      characteristic[2] = 'Too short';
      characteristic[3] = 'Too long';
    } else if (characteristic[0] === 'Comfort') {
      characteristic[2] = 'Poor';
      characteristic[3] = 'Perfect';
    } else if (characteristic[0] === 'Quality') {
      characteristic[2] = 'Poor';
      characteristic[3] = 'Great';
    }
  });

  if (characteristics.length) {
    return (
      <div>
        {characteristics.map(characteristic => {
          return <Characteristic characteristic={characteristic} key={characteristic[1].id}/>;
        })}
      </div>
    );
  }
};

export default ProductBreakdown;


