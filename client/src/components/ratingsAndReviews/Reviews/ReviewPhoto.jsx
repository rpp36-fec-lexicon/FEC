import React from 'react';
import Modal from './Modal.jsx';

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
    console.log('show clicked');
    this.setState({showModal: true});
  }

  closeModalFunc() {
    this.setState({showModal: false});
  }

  render() {
    const thumbnailStyle = {
      width: '160px',
      height: '108px'
    };

    let modalComponent;

    if (this.state.showModal) {
      modalComponent = <Modal showModal={this.state.showModal} photo={this.props.photo} closeModalFunc={this.closeModalFunc}/>;
    }

    if (!this.state.showModal) {
      modalComponent = null;
    }

    return (
      <div>
        <img onClick={() => { this.showModalFunc(); }} style={thumbnailStyle} src={this.props.photo.url}/>
        {modalComponent}
      </div>
    );
  }
}

export default ReviewPhoto;
