import React from 'react';

class Modal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    };
  }



  render() {
    if (!this.props.showModal) {
      return null;
    }

    return (
      <div className="modalPhoto">
        <h1>Modal Message</h1>
        <img src={this.props.photo.url}/>
        <button onClick={() => { this.props.closeModalFunc(); }}>Close Modal</button>
      </div>
    );
  }
}

export default Modal;
