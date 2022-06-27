import React from 'react'
import SearchQuestion from '../components/SearchQuestion.jsx'
import App from './../index.jsx'
import { render, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'

describe('Input value', () => {
    it('updates on change', () => {
      const inputHandler = jest.fn((value) => {})

      const { queryByPlaceholderText } = render(<App inputHandler={inputHandler}/>)

      const searchInput = queryByPlaceholderText('Search...')

      fireEvent.change(searchInput, { target: { value: 'test' } })

      expect(searchInput.value).toBe('test')
    })
  })