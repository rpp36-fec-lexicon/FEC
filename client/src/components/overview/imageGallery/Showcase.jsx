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
      currPhoto: photos[0],
      picList: [],
      count: 0,
      min: 0,
      max: 7
    };
    this.handleClick = this.handleClick.bind(this);
    this.changePhoto = this.changePhoto.bind(this);
    this.handleArrowClick = this.handleArrowClick.bind(this);
    this.sliceThumbnails = this.sliceThumbnails.bind(this);
    this.updateCount = this.updateCount.bind(this);
    this.nextThumbnails = this.nextThumbnails.bind(this);
    this.previousThumbnails = this.previousThumbnails.bind(this);
  }

  componentDidMount() {
    this.sliceThumbnails();
  }

  componentDidUpdate() {
    if (this.state.photos !== this.props.photos) {
      this.setState({
        photos: this.props.photos,
        currPhoto: this.props.photos[0]
      });
    }
  }

  changePhoto(num) {
    const {photos} = this.state;
    this.setState({
      currPhoto: photos[(photos.indexOf(this.state.currPhoto) + num + photos.length) % photos.length]
    }, () =>
      this.updateCount());
  }

  updateCount() {
    const {photos} = this.state;
    this.setState({
      count: photos.indexOf(this.state.currPhoto)
    }, () => {
      if (this.state.count === this.state.max) {
        this.nextThumbnails();
      }
      if (this.state.count === this.state.min - 1) {
        this.previousThumbnails();
      }
    });
  }

  nextThumbnails() {
    this.setState({
      min: this.state.min + 7,
      max: this.state.max + 7
    });
  }

  previousThumbnails() {
    this.setState({
      min: this.state.min - 7,
      max: this.state.max - 7
    });
  }

  handleArrowClick(direction) {
    if (direction === 'right') {
      return this.state.currPhoto.url !== this.state.photos[this.state.photos.length - 1].url;
    }
    if (direction === 'left') {
      return this.state.currPhoto.url !== this.state.photos[0].url;
    }
    if (direction === 'up') {
      return this.state.min !== 0;
    }
    if (direction === 'down') {
      return this.state.max < this.state.photos.length;
    }
    return false;
  }

  handleClick(link) {
    this.setState({
      currPhoto: this.state.photos.find((pic) => pic.url === link)
    });
  }

  sliceThumbnails(min, max) {
    const {photos} = this.state;
    var setOfPhotos = photos.slice(min, max);
    console.log('this is set of photos', setOfPhotos);
    return setOfPhotos.map((pic) => {
      return (
        <IMG
          key={pic.url}
          src={pic.thumbnail_url}
          onClick={() => this.handleClick(pic.url)}
          alt={pic.url}
        />
      );
    });
  }

  render() {
    console.log('Photos props in showcase', this.props.photos.length);
    console.log('current count', this.state.count);
    return (
      <div>
        {this.handleArrowClick('left') && (
          <button
            style={{margin: '40px'}}
            onClick={() => this.changePhoto(-1)}
            className='fa fa-arrow-left'
          />
        )}
        {this.handleArrowClick('right') && (
          <button
            style={{margin: '40px'}}
            onClick={() => this.changePhoto(1)}
            className='fa fa-arrow-right'
          />
        )}
        <PrimaryImage pic={this.state.currPhoto.url}/>
        {this.sliceThumbnails(this.state.min, this.state.max)}
        {this.handleArrowClick('up') && (
          <button
            style={{margin: '40px'}}
            onClick={() => this.previousThumbnails()}
            className='fa fa-angle-up'
          />
        )}
        {this.handleArrowClick('down') && (
          <button
            style={{margin: '40px'}}
            onClick={() => this.nextThumbnails()}
            className='fa fa-angle-down'
          />
        )}
        {/* {this.props.photos.map((pic) => (
          <IMG
            key={pic.url}
            src={pic.thumbnail_url}
            onClick={() => this.handleClick(pic.url)}
            alt={pic.url}
          />
        ))} */}
      </div>
    );
  }
}

export default Showcase;