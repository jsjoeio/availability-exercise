import React from 'react'
import 'jest-dom/extend-expect'
import App from './App'
import { render } from 'react-testing-library'

describe('Availability app', () => {
  it('renders to the DOM', () => {
    const { getByText } = render(<App />)
    const title = getByText('Book Time with an Advisor')
    expect(title).toBeInTheDocument()
  })

  it('shows all the available times from the Thinkful API sorted and grouped by Advisor ID', () => {
    // 1. mock API response
    // 2. Look for each and every time within the Advisor ID table
  })

  it('lets me book a time I want, removes it from the availble list and adds it to the booked times', () => {
    // 1. mock API response
    // 2. Look for each and every time within the Advisor ID table
  })

  it('shows an error message if I try to book an appointment without filling out my name.', () => {
    // 1. Click the "Book" button
    // 2. Look for error message
  })
})
