import React from 'react'
import 'jest-dom/extend-expect'
import App from './App'
import { render } from 'react-testing-library'

test('app can render', () => {
  const { getByText } = render(<App />)
  const title = getByText('Book Time with an Advisor')
  expect(title).toBeInTheDocument()
})
