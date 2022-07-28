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



  });
});


