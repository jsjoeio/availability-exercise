describe('Booking an appointment', () => {
  function clickFirstBooking () {
    const firstAvailable = cy.get('table.advisors tbody tr ul li').first()
    firstAvailable.children().then($element => {
      $element[1].click()
    })
  }
  it('lets me book the first available slot', () => {
    // 1. mock API response
    cy.visit('http://localhost:3000')
    cy.wait(2000)
    cy.get('input').type('Joe Previte')
    // Book an appointment with the first available slot
    clickFirstBooking()
  })

  // This should pass as long as it's right after the server starts
  // because we are saving them in the server memory so the length of bookings should
  // be greater than 0.
  it('and adds a booking to the Bookings table', () => {
    cy.get('table.bookings tbody').children().then($element => {
      expect($element.length).to.be.greaterThan(0)
    })
  })

  it('shows an error message if I try to book an appointment without filling out my name.', () => {
    // 1. Click the "Book" button
    clickFirstBooking()
    // 2. Look for error message
    cy.contains('Please provide your name before booking').should('be.visible')
  })
})
