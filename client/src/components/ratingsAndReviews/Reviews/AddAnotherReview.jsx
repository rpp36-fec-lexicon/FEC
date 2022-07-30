import React from 'react';
import ReviewModal from './ReviewModal.jsx';
import styled from 'styled-components';

const Button = styled.button`
  margin-right: 30px;
  height: 50px;
  width: auto;
  min-width: 100px;
  text-align: center;
  font-family: Optima, sans-serif;
  padding: 10px;
  border-radius: 30px;
  border: 2px solid rgba(39, 200, 210, 0.9);
  color: rgba(39, 200, 210, 0.9);
  background-color: transparent;
  transition: all 0.5s;
  cursor: pointer;
  &:hover {
    cursor: pointer;
    color: #fff;
    background-color: rgba(39, 200, 210, 0.9);
    box-shadow: 0px 5px 10px rgba(39, 200, 210, 0.4);
  }
  &:active {
    box-shadow: 10px 10px 9px 4px rgba(37, 125, 255, 0.7);
  }
`;

const AddAnotherReview = (props) => {

  return (
    <div>
      <Button onClick={() => { props.showReviewModalFunc(); }}>ADD A REVIEW  +</Button>
    </div>
  );
};

export default AddAnotherReview;

