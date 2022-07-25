import React from 'react';


class ProductDescription extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div>
        <h2>{this.props.slogan}</h2>
        <p style={{borderBottom: '2px solid rgba(169,169,169,.5)', paddingBottom: '10px'}}>{this.props.description}</p>
        {this.props.features.map((element) =>
          <div>
            <p key={element.feature} style={{display: 'inline-block', fontWeight: '900'}}>{element.feature}</p>
            {element.value && (
              <p key={element.value} style={{display: 'inline-block'}}>: {element.value}</p>
            )}
          </div>
        )}
      </div>
    );
  }
}

export default ProductDescription;