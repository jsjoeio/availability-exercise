import React from 'react'
import { render, fireEvent } from 'react-testing-library'
import Form from '../components/Form'

describe('Form component', () => {
  it('should let you type in your name', () => {
    const fakeFn = jest.fn()
    const { container, getByPlaceholderText, getByDisplayValue } = render(<Form getName={fakeFn} isValid shouldResetName={false} />)
    const input = getByPlaceholderText('Darrell Silver')
    // Simulate user adding name to input
    fireEvent.change(input, { target: { value: 'Dan Friedman' } })
    expect(getByDisplayValue('Dan Friedman')).toBeTruthy()

    // Update the props, re-render to the same container
    // This fakes our user clicking "Book"
    render(<Form getName={fakeFn} isValid shouldResetName />, { container })
    // Input value should now be empty
    expect(input.value).toEqual('')
  })

  it('should show an error message if isValid is false', () => {
    const fakeFn = jest.fn()
    const { container, getByPlaceholderText, getByText } = render(<Form getName={fakeFn} isValid shouldResetName={false} />)
    const input = getByPlaceholderText('Darrell Silver')
    // Input value should be empty to start
    expect(input.value).toEqual('')
    // Update the props, re-render to the same container
    // Pretend as if the user clicked book without filling out name
    render(<Form getName={fakeFn} isValid={false} shouldResetName={false} />, { container })
    // Input value should now be empty
    expect(getByText('Please provide your name before booking')).toBeTruthy()
  })
})
