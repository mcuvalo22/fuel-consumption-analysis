/**
 * @param {Array} array - Ulazni niz
 * @param {Function} reducerFn - Reducer funkcija (accumulator, currentValue, index) => newAccumulator
 * @param {*} initialValue - Početna vrijednost akumulatora
 * @returns {*} - Konačna reducirana vrijednost
 */
function reduce(array, reducerFn, initialValue) {
  if (!Array.isArray(array)) {
    throw new TypeError('Prvi argument mora biti niz');
  }
  
  if (typeof reducerFn !== 'function') {
    throw new TypeError('Drugi argument mora biti funkcija');
  }

  if (initialValue === undefined && array.length === 0) {
    throw new TypeError('Reduce praznog niza bez inicijalne vrijednosti');
  }

  let accumulator = initialValue;
  let startIndex = 0;

  if (initialValue === undefined) {
    accumulator = array[0];
    startIndex = 1;
  }

  for (let i = startIndex; i < array.length; i++) {
    accumulator = reducerFn(accumulator, array[i], i);
  }

  return accumulator;
}

export default reduce;