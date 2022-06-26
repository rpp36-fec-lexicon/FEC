import React from 'react'
import SearchQuestion from '../components/SearchQuestion.jsx'
import { render, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'

describe('Input value', () => {
    it('updates on change', () => {
      const setSearch = jest.fn((value) => {})

      const { queryByPlaceholderText } = render(<SearchQuestion setSearch={setSearch}/>)

      const searchInput = queryByPlaceholderText('Search...')

      fireEvent.change(searchInput, { target: { value: 'test' } })

      expect(searchInput.value).toBe('test')
    })
  })