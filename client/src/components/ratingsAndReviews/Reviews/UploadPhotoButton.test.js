import React from 'react';
import ReactDOM from 'react-dom/client';
import UploadPhotoButton from './UploadPhotoButton.jsx';
import {render, screen} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';

describe('UploadPhotoButton', ()=>{
  let temporarySandBox;
  beforeEach(() => {
    temporarySandBox = document.createElement('div');
    document.body.appendChild(temporarySandBox);
  });
  afterEach(() => {
    document.body.removeChild(temporarySandBox);
    temporarySandBox = null;
  });

  describe('UploadPhotoButton Component', () => {

    it('should render the ChooseFile button', async() => {
      render(<UploadPhotoButton />);
      const chooseFileButton = screen.getByTestId('chooseFileButton');
      expect(chooseFileButton).toBeInTheDocument();
    })

    it('should invoke "photoUploadedFunc" when an image is selected', async() => {
      const mockFunc = jest.fn();
      render(<UploadPhotoButton photoUploadedFunc={mockFunc}/>);
      const chooseFileButton = screen.getByTestId('chooseFileButton');
      await userEvent.change(chooseFileButton);
      expect(mockFunc).toHaveBeenCalled();
    })
  });
});


