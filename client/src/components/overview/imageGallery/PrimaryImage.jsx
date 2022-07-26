import React from 'react';
import styled from 'styled-components';

const IMG = styled.img`
  border: 1px solid;
  border-radius: 15%;
  height: 720px;
  width: 620px;
  object-fit: cover;
  object-position: center;
  z-index: 1;
  cursor: pointer;
`;

class PrimaryImage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div>
        <IMG
          src={this.props.pic}
          alt={this.props.pic}
          onClick={() => this.props.expand()}
        />
      </div>
    );
  }
}

export default PrimaryImage;