import React from 'react';


class PrimaryImage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div>
        <div id="mainImg" style={{margin: '32px 16px 5px 5px', height: '540px', width: '570px', backgroundColor: 'powderblue'}}>
          <img
            src={this.props.pic}
            alt={this.props.pic}
          />
        </div>
      </div>
    );
  }
}

export default PrimaryImage;