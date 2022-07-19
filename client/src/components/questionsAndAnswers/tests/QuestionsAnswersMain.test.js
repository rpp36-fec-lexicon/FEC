import React from 'react';
import SearchQuestion from '../components/SearchQuestion.jsx';
import QuestionList from '../components/QuestionList.jsx';
import sampleQuestions from '../sampleData/sampleQuestions.js';
import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';



describe('Questions and Answers Tests', () => {

  test('should render SearchQuestion component', () => {
    const placeholderText = 'HAVE A QUESTION? SEARCH FOR ANSWERS...';
    render(<SearchQuestion />);
    expect(screen.getByPlaceholderText(placeholderText)).toBeInTheDocument();
  });

  test('should render QuestionList Component and show a question', () => {
    render(<QuestionList questions={sampleQuestions.results} productInfo={sampleQuestions.product_id} />);
    expect(screen.getAllByText(/Q:/)).toHaveLength(1);
  });

  test('should render QuestionList Component and show Yes', () => {
    render(<QuestionList questions={sampleQuestions.results} productInfo={sampleQuestions.product_id} />);
    expect(screen.getAllByText(/Yes()/)).toHaveLength(1);
  });

  test('should display Add Answer button', () => {
    render(<QuestionList questions={sampleQuestions.results} productInfo={sampleQuestions.product_id} />);
    expect(screen.queryByRole('button', { name: /Add Answer/i })).toBeInTheDocument();
  });

  test('should display Helpful? button', () => {
    render(<QuestionList questions={sampleQuestions.results} productInfo={sampleQuestions.product_id} />);
    expect(screen.queryByRole('button', { name: /Helpful?/i })).toBeInTheDocument();
  });


});

