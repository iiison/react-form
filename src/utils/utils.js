/**
 * Debounce input function
 *
 * @param   {Function} func function to be debounced
 * @param   {Number}   time time to wait
 *
 * @returns {Function}      debounced function
 */
export function debounce(func, time) {
  let timeout

  return function(...args) {
    const ref = this

    clearTimeout(timeout)
    timeout = setTimeout(() => func.apply(ref, args), time)
  }
}

