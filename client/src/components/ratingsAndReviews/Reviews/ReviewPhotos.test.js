import React from 'react';
import ReactDOM from 'react-dom/client';
import ReviewPhotos from './ReviewPhotos.jsx';
import {render, screen} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';

describe('ReviewPhotos', ()=>{
  let temporarySandBox;
  beforeEach(() => {
    temporarySandBox = document.createElement('div');
    document.body.appendChild(temporarySandBox);
  });
  afterEach(() => {
    document.body.removeChild(temporarySandBox);
    temporarySandBox = null;
  });

  describe('ReviewPhotos Component', () => {
    const photos = [
      {
        "id": 2454053,
        "url": "https://images.unsplash.com/photo-1521093470119-a3acdc43374a?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=668&q=80"
      },
      {
        "id": 2454054,
        "url": "https://images.unsplash.com/photo-1558191053-c03db2757e3d?ixlib=rb-1.2.1&auto=format&fit=crop&w=1650&q=80"
      },
      {
        "id": 2454055,
        "url": "https://images.unsplash.com/photo-1421941027568-40ab08ee5592?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1651&q=80"
      }
    ];

    it('should render the correct number of photos in a review tile', async() => {
      render(<ReviewPhotos photos={photos}/>);
      const images = screen.getAllByRole('img');
      expect(images.length).toEqual(photos.length);
    })

  });
});

