import React from 'react';
import PrimaryImage from './PrimaryImage.jsx';


class Showcase extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    console.log('Showcase props for pictures ', this.props);
    return (
      <div>
        <PrimaryImage pic={this.props.photos[0].url}/>
        {this.props.photos.map((pic) => (
          <img
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