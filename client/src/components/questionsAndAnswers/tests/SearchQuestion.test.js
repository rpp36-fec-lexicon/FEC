import React from 'react';
import SearchQuestion from '../components/SearchQuestion.jsx';
// import App from './../index.jsx'
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

test('Displays a heading', () => {
  render(<SearchQuestion />);
  const heading = screen.getByRole('heading', {
    name: /hello world/i
  });
  expect(heading).toBeInTheDocument();
});


/*

mocking out the server

simulate the res from api request

dotenv  - put in gitignore -> allows different values


aws->s3 bucket with permissions set ->you can client send image > server

*/