import React from 'react';
import ReactDOM from 'react-dom/client';
import PhotoModal from './PhotoModal.jsx';
import userEvent from '@testing-library/user-event';

import {render, screen} from '@testing-library/react';
import '@testing-library/jest-dom';

describe('PhotoModal', ()=>{
  let temporarySandBox;
  beforeEach(() => {
    temporarySandBox = document.createElement('div');
    document.body.appendChild(temporarySandBox);
  });
  afterEach(() => {
    document.body.removeChild(temporarySandBox);
    temporarySandBox = null;
  });

  describe('PhotoModal Component', ()=>{
    const photo = {
      "id": 2454046,
      "url": "https://images.unsplash.com/photo-1517278322228-3fe7a86cf6f0?ixlib=rb-1.2.1&auto=format&fit=crop&w=1567&q=80"
    };

    it('should render the expanded image', async() => {
      render(<PhotoModal photo={photo} />);
      const imageEle = screen.getByRole('img');
      expect(imageEle).toBeInTheDocument();
    });

    it('should invoke "closeModalFunc" when the X button is clicked', async() => {
      const mockFunc = jest.fn();
      render(<PhotoModal closeModalFunc={mockFunc} photo={photo}/>);
      const XButton = screen.getByTestId('XButton');
      expect(XButton).toBeInTheDocument();
      await userEvent.click(XButton);
      expect(mockFunc).toHaveBeenCalled();
    })
  })
})



