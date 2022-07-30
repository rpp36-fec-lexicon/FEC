import React from 'react';
import ReactDOM from 'react-dom/client';
import ReviewPhoto from './ReviewPhoto.jsx';
import {render, screen} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';

describe('ReviewPhoto', ()=>{
  let temporarySandBox;
  beforeEach(() => {
    temporarySandBox = document.createElement('div');
    document.body.appendChild(temporarySandBox);
  });
  afterEach(() => {
    document.body.removeChild(temporarySandBox);
    temporarySandBox = null;
  });

  describe('ReviewPhoto Component', ()=>{
    const photo =  {
      "id": 2454046,
      "url": "https://images.unsplash.com/photo-1517278322228-3fe7a86cf6f0?ixlib=rb-1.2.1&auto=format&fit=crop&w=1567&q=80"
    };

    it('should render image as thumbnail style', async() => {
      render(<ReviewPhoto photo={photo}/>);
      const image = document.querySelector("img");
      expect(image.src).toContain("https://images.unsplash.com/photo-1517278322228-3fe7a86cf6f0?ixlib=rb-1.2.1&auto=format&fit=crop&w=1567&q=80");
    });

    it('should invoke showModalFunc when image is clicked', async() => {
      const ReviewPhotoComponent = render(<ReviewPhoto photo={photo}/>);
      const photoModalFalse = ReviewPhotoComponent.queryByTestId('photoModal');
      expect(photoModalFalse).toBeNull();
      const image = document.querySelector("img");
      await userEvent.click(image);
      const photoModalTrue = ReviewPhotoComponent.queryByTestId('photoModal');
      expect(photoModalTrue).toBeTruthy();
    });


  })
})
