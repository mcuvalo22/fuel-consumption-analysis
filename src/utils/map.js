
 /**
 * @param {Array} array - Ulazni niz
 * @param {Function} transformFn - Funkcija transformacije (element, index) => noviElement
 * @returns {Array} - Novi transformirani niz
 */

function map(array, transformFn) {
  if (!Array.isArray(array)) {
    throw new TypeError('Prvi argument mora biti niz');
  }
  
  if (typeof transformFn !== 'function') {
    throw new TypeError('Drugi argument mora biti funkcija');
  }

  const result = [];
  
  for (let i = 0; i < array.length; i++) {
    result.push(transformFn(array[i], i));
  }
  
  return result;
}

export default map;