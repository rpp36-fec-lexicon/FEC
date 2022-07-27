import React from 'react';

const SellerResponse = (props) => {
  const responseStyle = {
    backgroundColor: '#D3D3D3'
  };

  const boldStyle = {
    fontWeight: 'bold'
  };

  return (
    <div style={responseStyle}>
      <br></br>
      <div style={boldStyle}>Response from Seller:</div>
      <br></br>
      <div>{props.response}</div>
    </div>
  );
};

export default SellerResponse;

