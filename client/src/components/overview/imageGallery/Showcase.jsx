import React from 'react';
import PrimaryImage from './PrimaryImage.jsx';
import styled from 'styled-components';
import Modal from 'react-bootstrap/Modal';

const IMG = styled.img`
  margin: 5px;
  border-radius: 35%;
  height: 100px;
  width: 100px;
  object-fit: cover;
  cursor: pointer;
`;

const Div = styled.div`
  background: rgba(0,0,0,0.75);
  margin: -96px -8px;
  height: 100%;
  width: 100%;
  position: fixed;
  z-index: 10;
  display: flex;
  justify-content: center;
  backdrop-filter: blur(8px) contrast(70%);
`;

const Big = styled.img`
  border: 1px solid;
  border-radius: 15%;
  height: 752px;
  width: 752px;
  object-fit: cover;
`;

const Thumbnails = styled.div`
  position: absolute;
  z-index: 2;
  padding-left: 20px;
`;

class Showcase extends React.Component {
  constructor(props) {
    super(props);
    const { photos } = props;
    this.state = {
      photos,
      currPhoto: photos[0],
      picList: [],
      modalSeen: false,
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
    this.expand = this.expand.bind(this);
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

  expand() {
    this.setState({ modalSeen: !this.state.modalSeen });
    console.log('WE EXPANDERINO!');
  }

  render() {
    console.log('Photos props in showcase', this.props.photos.length);
    console.log('current count', this.state.count);
    if (this.state.modalSeen) {
      return (
        <Div>
          <Big
            src={this.state.currPhoto.url}
            alt={this.state.currPhoto.url}
          />
          <i
            style={{cursor: 'pointer'}}
            class="fa-solid fa-xmark fa-xl"
            onClick={() => this.expand()}
          />
          {this.handleArrowClick('left') && (
            <i
              style={{cursor: 'pointer'}}
              onClick={() => this.changePhoto(-1)}
              class='fa fa-arrow-left fa-xl'
            />
          )}
          {this.handleArrowClick('right') && (
            <i
              style={{cursor: 'pointer'}}
              onClick={() => this.changePhoto(1)}
              className='fa fa-arrow-right fa-xl'
            />
          )}
          {this.sliceThumbnails(this.state.min, this.state.max)}
          {this.handleArrowClick('up') && (
            <i
              style={{cursor: 'pointer'}}
              onClick={() => this.previousThumbnails()}
              className='fa fa-angle-up fa-xl'
            />
          )}
          {this.handleArrowClick('down') && (
            <i
              style={{cursor: 'pointer'}}
              onClick={() => this.nextThumbnails()}
              className='fa fa-angle-down fa-xl'
            />
          )}
        </Div>
      );
    }
    return (
      <div style={{position: 'relative'}}>
        {this.handleArrowClick('left') && (
          <i
            style={{cursor: 'pointer'}}
            onClick={() => this.changePhoto(-1)}
            class='fa fa-arrow-left fa-xl'
          />
        )}
        {this.handleArrowClick('right') && (
          <i
            style={{cursor: 'pointer'}}
            onClick={() => this.changePhoto(1)}
            className='fa fa-arrow-right fa-xl'
          />
        )}
        <PrimaryImage pic={this.state.currPhoto.url} expand={this.expand}/>
        <Thumbnails style={{display: 'flex', flexDirection: 'column', position: 'absolute', top: '20px'}}>
          {this.sliceThumbnails(this.state.min, this.state.max)}
        </Thumbnails>
        {this.handleArrowClick('up') && (
          <i
            style={{cursor: 'pointer'}}
            onClick={() => this.previousThumbnails()}
            className='fa fa-angle-up fa-xl'
          />
        )}
        {this.handleArrowClick('down') && (
          <i
            style={{cursor: 'pointer'}}
            onClick={() => this.nextThumbnails()}
            className='fa fa-angle-down fa-xl'
          />
        )}
      </div>
    );
  }
}

export default Showcase;