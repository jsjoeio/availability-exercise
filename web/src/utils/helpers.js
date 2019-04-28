export const dateSortDesc = function (date1, date2) {
  // Credit: https://gist.github.com/onpubcom/1772996
  // This is a comparison function that will result in dates being sorted in
  // ASCENDING order. As you can see, JavaScript's native comparison operators
  // can be used to compare dates. This was news to me.
  if (date1 > date2) return 1
  if (date1 < date2) return -1
  return 0
}

export function createBooking (booking) {
  /**
   * @description - send a POST request to the /bookings endpoint to book appointment with advisor
   * @param booking object - should contain a bookingId, advisorId, dateTime, and studentName
   */
  return fetch('https://floating-reaches-66025.herokuapp.com/bookings', {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(booking)
  })
}

export function updateAvailability (optimisticBookings, availability) {
  /**
   * @description - update availability using bookings made on client so that you don't have to make another GET request to update availability
   * @param optimisticBookings array - array of bookings
   * @param availability object - advisor availability data which is returned from /advisors endpoint
   */
  if (optimisticBookings.length === 0) return availability
  for (let i = 0; i < optimisticBookings.length; i++) {
    const advisorId = optimisticBookings[i].advisorId
    const bookedDatetime = optimisticBookings[i].dateTime
    // Remove bookedDatetime from availability
    availability[advisorId] = availability[advisorId].filter(dateTime => dateTime !== bookedDatetime)
  }
  return availability
}
