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

    it('should render image as thumbnail style', async () => {
      const photo =  {
        "id": 2454046,
        "url": "https://images.unsplash.com/photo-1517278322228-3fe7a86cf6f0?ixlib=rb-1.2.1&auto=format&fit=crop&w=1567&q=80"
      };

      render(<ReviewPhoto photo={photo}/>);
      const buttonEle = screen.getByRole('button', {name: 'ADD A REVIEW  +'});
      expect(buttonEle).toBeInTheDocument();
    });
  })
})