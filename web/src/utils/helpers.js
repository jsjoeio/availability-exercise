export function transformAvailabilityData (data) {
/**
 * @description - takes in advisor availability data and groups it by Advisor
 * @return - an object with keys corresponding to advisor ids and their availability
 */

  // initialize advisors
  const advisors = {}

  for (let day in data) {
  // Get the times and advisors like so [time, advisorId]
    let availableAdvisors = Object.entries(data[day])
    for (let i = 0; i < availableAdvisors.length; i++) {
      // Check if our advisors object already has the advisor id
      if (!advisors.hasOwnProperty(availableAdvisors[i][1])) {
        advisors[availableAdvisors[i][1]] = [availableAdvisors[i][0]]
      } else {
        advisors[availableAdvisors[i][1]].push(availableAdvisors[i][0])
      }
    }
  }
  return advisors
}

