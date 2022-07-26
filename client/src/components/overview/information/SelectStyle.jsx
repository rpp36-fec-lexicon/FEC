import React from 'react';
import styled from 'styled-components';
import { IoMdCheckmarkCircleOutline } from 'react-icons/io';
import { BsArrowRightShort } from 'react-icons/bs';

const Img = styled.img`
  margin: 5px;
  border: 2px solid;
  border-radius: 50%;
  height: 80px;
  width: 80px;
  object-fit: cover;
  cursor: pointer;
`;

const StyledCheckmark = styled(IoMdCheckmarkCircleOutline)`
  position: absolute;
  top: 5px;
  right: 5px;
  color: green;
  width: 30px;
  height: 30px;
  filter: drop-shadow(0 0 0.2rem black);
`;

const FlexDiv = styled.div`
  display: grid;
  grid-template-columns: min-content min-content min-content min-content;
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
        <h3 style={{display: 'inline-block'}}> {'Selected Style  ~  '}</h3>
        {/* <BsArrowRightShort size={24}/> */}
        <p style={{display: 'inline-block', paddingLeft: '5px'}}> {this.props.selectedStyle.name} </p>
        <FlexDiv>
          {this.props.styles.map((style, i) => {
            if (style.style_id === this.props.selectedStyle.style_id) {
              return (
                <div style={{position: 'relative', display: 'inline-block'}}>
                  <Img
                    key={style.style_id}
                    src={style.photos[0].thumbnail_url}
                    name={style.name}
                    onClick={() => this.handleClick(style.style_id)}
                    a=""
                  />
                  <StyledCheckmark />
                </div>
              );
            }
            return (
              <div style={{position: 'relative', display: 'inline-block'}}>
                <Img
                  key={style.style_id}
                  src={style.photos[0].thumbnail_url}
                  name={style.name}
                  onClick={() => this.handleClick(style.style_id)}
                  a=""
                />
              </div>
            );
          })}
        </FlexDiv>
      </div>
    );
  }
}

export default SelectStyle;