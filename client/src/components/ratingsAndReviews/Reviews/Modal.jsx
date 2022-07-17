import React from 'react';

class Modal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    };
  }



  render() {
    const expandStyle = {
      width: '700px',
      height: '473px'
    };

    if (!this.props.showModal) {
      return null;
    }

    return (
      <div className="modalPhoto">
        <div className="modalPhoto-content">
          <span className="close" onClick={() => { this.props.closeModalFunc(); }}>&times;</span>
          <img style={expandStyle} src={this.props.photo.url}/>
        </div>
      </div>
    );
  }
}

export default Modal;

