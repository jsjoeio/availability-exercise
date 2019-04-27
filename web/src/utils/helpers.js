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
  return fetch('http://localhost:4433/bookings', {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(booking)
  })
}
