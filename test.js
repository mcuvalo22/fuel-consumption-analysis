import map from './src/utils/map.js';
import reduce from './src/utils/reduce.js';
import pipe from './src/utils/pipe.js';

console.log('Testiranje map, reduce, pipe...\n');

const numbers = [1, 2, 3, 4, 5];
const doubled = map(numbers, x => x * 2);
console.log('Map test:', doubled);

const sum = reduce(numbers, (acc, num) => acc + num, 0);
console.log('Reduce test:', sum);

const addOne = x => x + 1;
const multiplyByTwo = x => x * 2;
const pipeline = pipe(addOne, multiplyByTwo);
console.log('Pipe test:', pipeline(5));