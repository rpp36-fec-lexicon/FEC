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
    this.changePhoto = this.changePhoto.bind(this);
    this.handleArrowClick = this.handleArrowClick.bind(this);
  }

  componentDidUpdate() {
    if (this.state.photos !== this.props.photos) {
      this.setState({ photos: this.props.photos, currPhoto: this.props.photos[0] });
    }
  }

  changePhoto(num) {
    const {photos} = this.state;
    this.setState({
      currPhoto: photos[(photos.indexOf(this.state.currPhoto) + num + photos.length) % photos.length]
    });
  }

  handleArrowClick(direction) {
    if (direction === 'right') {
      return this.state.currPhoto.url !== this.state.photos[this.state.photos.length - 1].url;
    }
    if (direction === 'left') {
      return this.state.currPhoto.url !== this.state.photos[0].url;
    }
    return false;
  }

  handleClick(link) {
    this.setState({
      currPhoto: this.state.photos.find((pic) => pic.url === link)
    });
  }

  render() {
    console.log('Showcase props for pictures ', this.props);
    return (
      <div>
        {this.handleArrowClick('right') && (
          <button
            style={{margin: '40px'}}
            onClick={() => this.changePhoto(1)}
            className='fa fa-arrow-right'
          />
        )}
        {this.handleArrowClick('left') && (
          <button
            style={{margin: '40px'}}
            onClick={() => this.changePhoto(-1)}
            className='fa fa-arrow-left'
          />
        )}
        <PrimaryImage pic={this.state.currPhoto.url}/>
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