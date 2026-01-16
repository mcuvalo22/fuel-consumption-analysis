/**
 * @param {...Function} functions - Niz funkcija za kompoziciju
 * @returns {Function} - Kompozitna funkcija
 */
function pipe(...functions) {
  if (functions.some(fn => typeof fn !== 'function')) {
    throw new TypeError('Svi argumenti moraju biti funkcije');
  }

  return function(initialValue) {
    return reduce(functions, (value, fn) => {
      return fn(value);
    }, initialValue);
  };
}

export default pipe;