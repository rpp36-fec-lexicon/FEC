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
      onMouseOver={(e) => checkMouse(e)}
      onMouseMove={(e) => checkMouse(e)}
      onClick={() => zoomOut()}
    />
  );
}