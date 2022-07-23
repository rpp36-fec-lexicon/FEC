import React from 'react';
import styled from 'styled-components';
import { IoMdCheckmarkCircleOutline } from 'react-icons/io';

const Img = styled.img`
  margin: 5px;
  border: 2px solid;
  border-radius: 50%;
  height: 72px;
  width: 72px;
  object-fit: cover;
  cursor: pointer;
`;

class SelectStyle extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  handleClick(id, name) {
    this.props.changeStyle(id);
  }

  render() {
    console.log('Props in Styles ', this.props);
    console.log('current id', this.props.selectedStyle.style_id);
    return (
      <div>
        <h3> {`Style > ${this.props.selectedStyle.name}`}</h3>
        <div>
          {this.props.styles.map((style, i) => (
            // style.style_id === this.props.selectedStyle.style_id &&
            // <IoMdCheckmarkCircleOutline
            //   style={{
            //     position: 'absolute',
            //     borderRadius: '50%',
            //     left: '4%',
            //     height: '1.2em'
            //   }}/>,
            i % 4 === 0 ?
              <>
                <br/>
                <Img
                  key={style.style_id}
                  src={style.photos[0].thumbnail_url}
                  name={style.name}
                  onClick={() => this.handleClick(style.style_id)}
                  a=""
                /></> :
              <Img
                key={style.style_id}
                src={style.photos[0].thumbnail_url}
                name={style.name}
                onClick={() => this.handleClick(style.style_id)}
                a=""
              />
          ))}
        </div>
      </div>
    );
  }
}

export default SelectStyle;