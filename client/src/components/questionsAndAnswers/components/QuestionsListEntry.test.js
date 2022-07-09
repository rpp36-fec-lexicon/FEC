import React from 'react';
import QuestionsListEntry from './QuestionsListEntry.jsx';
import {render, screen} from '@testing-library/react';
import '@testing-library/jest-dom';

test('renders questions', () => {
  render(<QuestionsListEntry />);
  const divElement = screen.getByText('Q:');
  expect(divElement).toBeInTheDocument();
});
