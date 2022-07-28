import React, { useState, useEffect, useRef } from 'react';
import styled, { css } from 'styled-components';

const Div = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  z-index: 15;
  background-size: cover;
  background-image: ${({ photoUrl }) => css`url(${photoUrl});`}
`;

export default function RenderZoom({ picture, container, zoomOut }) {
  const [pictureState, setPictureState] = useState(picture);
  const [containerState, setContainerState] = useState(container);
  const zoomEle = useRef(null);

  const calculatePosition = (val, inMin, inMax, outMin, outMax) => {
    return (((val - inMin) * (outMax - outMin)) / (inMax - inMin) + outMin);
  };

  useEffect(() => {
    const zoom = document.getElementById('zoomEle');

    const changeSize = () => {
      setContainerState(document.getElementById('bigImageContainer'));
    };

    containerState.addEventListener('resize', changeSize);
    return () => {
      containerState.removeEventListener('resize', changeSize);
    };
  }, []);

  const checkMouse = (e) => {
    const border = zoomEle.current.getBoundingClientRect();
    var xPosition = e.clientX - border.left;
    var yPosition = e.clientY - border.top;

    const zoomWidth = zoomEle.current.clientWidth;
    const backgroundSizeX = calculatePosition(xPosition, 0, zoomWidth, 0, zoomWidth * 2.5 - zoomWidth);

    const zoomHeight = zoomEle.current.clientHeight;
    const imageRatio = picture.width / picture.height;
    let imageHeight = (picture.height * zoomWidth) / picture.width;
    imageHeight *= 2.5;

    const backgroundSizeY = calculatePosition(yPosition, 0, zoomHeight, 0, imageHeight - zoomHeight);

    zoomEle.current.style.backgroundSize = `${zoomWidth * 2.5}px ${imageHeight}px`;
    zoomEle.current.style.backgroundPosition = `-${backgroundSizeX}px -${backgroundSizeY}px`;
    zoomEle.current.style.cursor = 'zoom-out';
  };

  return (
    <Div
      id='zoomEle'
      ref={zoomEle}
      photoUrl={pictureState.src}
      onMouseMove={(e) => checkMouse(e)}
      onClick={() => zoomOut()}
    />
  );
}


// import React from 'react';
// import styled, { css } from 'styled-components';

// const Div = styled.div`
//   position: absolute;
//   width: 100%;
//   height: 100%;
//   transform-origin: center center;
//   z-index: 15;
//   background-repeat: no-repeat;
//   background-image: ${({ photoUrl }) => css`url(${photoUrl});`}
// `;

// class RenderZoom extends React.Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       zoomEle: null
//     };
//     this.checkMouse = this.checkMouse.bind(this);
//     this.calculatePosition = this.calculatePosition.bind(this);
//   }

//   calculatePosition(val, inMin, inMax, outMin, outMax) {
//     return (((val - inMin) * (outMax - outMin)) / (inMax - inMin) + outMin);
//   }

//   checkMouse(e) {
//     var zoomStateHolder = this.state.zoomEle;
//     const border = this.state.zoomEle.current.getBoundingClientRect();
//     var xPosition = e.clientX - border.left;
//     var yPosition = e.clientY - border.top;

//     const zoomWidth = this.state.zoomEle.current.clientWidth;
//     const backgroundSizeX = this.calculatePosition(xPosition, 0, zoomWidth, 0, zoomWidth * 2.5 - zoomWidth);

//     const zoomHeight = this.state.zoomEle.current.clientHeight;
//     const imageRatio = this.props.picture.width / this.props.picture.height;
//     const imageHeight = (this.props.picture.height * zoomWidth) / this.props.picture.width;
//     imageHeight *= 2.5;

//     const backgroundSizeY = this.calculatePosition(yPosition, 0, zoomHeight, 0, imageHeight - zoomHeight);

//     zoomStateHolder.current.style.backgroundSize = `${zoomWidth * 2.5}px ${imageHeight}px`;
//     zoomStateHolder.current.style.backgroundPosition = `-${backgroundSizeX}px -${backgroundSizeY}px`;
//     zoomStateHolder.current.style.cursor = 'zoom-out';
//   }

//   render() {
//     return (
//       <Div
//         id='zoomEle'
//         ref={this.state.zoomEle}
//         photoUrl={this.props.picture.src}
//         onMouseMove={(e) => this.checkMouse(e)}
//         onClick={() => this.props.zoomOut()}
//       />
//     );
//   }
// }

// export default RenderZoom;