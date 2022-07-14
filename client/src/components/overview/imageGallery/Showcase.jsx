import React from 'react';
import PrimaryImage from './PrimaryImage.jsx';
import styled from 'styled-components';

const IMG = styled.img`
  margin: 5px;
  border-radius: 35%;
  height: 100px;
  width: 100px;
  object-fit: cover;
`;

class Showcase extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    // console.log('Showcase props for pictures ', this.props);
    return (
      <div>
        <PrimaryImage pic={this.props.photos[0].url}/>
        {this.props.photos.map((pic) => (
          <IMG
            key={pic.url}
            src={pic.thumbnail_url}
            alt={pic.url}
          />
        ))}
      </div>
    );
  }
}

export default Showcase;