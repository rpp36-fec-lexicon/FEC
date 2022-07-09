import React from 'react';
import styled from 'styled-components';

const IMG = styled.img`
  border: 1px solid;
  border-radius: 15%;
  height: 352px;
  width: 352px;
  object-fit: cover;
`;


class PrimaryImage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div>
        <div>
          <IMG
            src={this.props.pic}
            alt={this.props.pic}
          />
        </div>
      </div>
    );
  }
}

export default PrimaryImage;