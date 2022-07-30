import React from 'react';
import ReactDOM from 'react-dom/client';
import UploadedPhotos from './UploadedPhotos.jsx';
import {render, screen} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';

describe('UploadedPhotos', ()=>{
  let temporarySandBox;
  beforeEach(() => {
    temporarySandBox = document.createElement('div');
    document.body.appendChild(temporarySandBox);
  });
  afterEach(() => {
    document.body.removeChild(temporarySandBox);
    temporarySandBox = null;
  });

  describe('UploadedPhotos Component', () => {
    const photos = [
      "https://images.unsplash.com/photo-1517278322228-3fe7a86cf6f0?ixlib=rb-1.2.1&auto=format&fit=crop&w=1567&q=80",
      "https://images.unsplash.com/photo-1517278322228-3fe7a86cf6f0?ixlib=rb-1.2.1&auto=format&fit=crop&w=1567&q=80",
      "https://images.unsplash.com/photo-1517278322228-3fe7a86cf6f0?ixlib=rb-1.2.1&auto=format&fit=crop&w=1567&q=80"
    ];

    it('should render the correct number of photos', async() => {
      render(<UploadedPhotos photos={photos}/>);
      const images = screen.getAllByRole('img');
      expect(images.length).toEqual(photos.length);
    })

  });
});

