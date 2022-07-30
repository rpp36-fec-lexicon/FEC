import React from 'react';
import PhotoModal from './PhotoModal.jsx';

class ReviewPhoto extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showModal: false
    };
    this.showModalFunc = this.showModalFunc.bind(this);
    this.closeModalFunc = this.closeModalFunc.bind(this);
  }

  showModalFunc() {
    this.setState({showModal: true});
  }

  closeModalFunc() {
    this.setState({showModal: false});
  }

  render() {
    const thumbnailStyle = {
      width: '160px',
      height: '108px',
      borderRadius: '15%',
      objectFit: 'cover',
      border: '1px solid'
    };

    let modalComponent;

    if (this.state.showModal) {
      modalComponent = <div data-testid="photoModal">
        <PhotoModal showModal={this.state.showModal} photo={this.props.photo} closeModalFunc={this.closeModalFunc}/>
      </div>;

    }

    if (!this.state.showModal) {
      modalComponent = null;
    }

    return (
      <div>
        {modalComponent}

        <img onClick={() => { this.showModalFunc(); }} style={thumbnailStyle} src={this.props.photo.url} alt='image sent by reviewer'/>&nbsp;
      </div>
    );
  }
}

export default ReviewPhoto;
