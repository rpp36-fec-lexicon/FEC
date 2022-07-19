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
    const { photos } = props;
    this.state = {
      photos,
      currPhoto: photos[0]
    };
    this.handleClick = this.handleClick.bind(this);
  }

  componentDidUpdate() {
    if (this.state.photos !== this.props.photos) {
      this.setState({ photos: this.props.photos, currPhoto: this.props.photos[0] });
    }
  }

  handleClick(link) {
    this.setState({
      currPhoto: this.state.photos.find((pic) => pic.url === link)
    });
  }

  render() {
    return (
      <div>
        {this.state.currPhoto ?
          <>
            <PrimaryImage pic={this.state.currPhoto.url}/>
          </>
          :
          <>
            <PrimaryImage pic={this.props.photos[0].url}/>
          </>
        }
        {/* <PrimaryImage pic={currPhoto.url}/> */}
        {this.props.photos.map((pic) => (
          <IMG
            key={pic.url}
            src={pic.thumbnail_url}
            onClick={() => this.handleClick(pic.url)}
            alt={pic.url}
          />
        ))}
      </div>
    );
  }
}

export default Showcase;