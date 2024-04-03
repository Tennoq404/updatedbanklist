console.log(Math.sqrt(25));
console.log(25 ** (1 / 3));
console.log(8 ** (1 / 3));

console.log(Math.max(5, 18, 23, 11, 2));
console.log(Math.max(5, 18, '23', 11, 2));
console.log(Math.max(5, 18, '23px', 11, 2));

console.log(Math.min(5, 18, 23, 11, 3));

console.log(Math.PI * Number.parseFloat('18px') ** 2);
console.log(Math.trunc(Math.random() * 6) + 1);

const randomint = (min, max) =>
  Math.trunc(Math.random() * (max - min) + 1) + min;

console.log(randomint(10, 20));

//Rounding integers
console.log(Math.trunc(23.3));
console.log(Math.round(23.0));
console.log(Math.ceil(23.3));
console.log(Math.ceil(23.9));

console.log(Math.floor(23.3));
console.log(Math.floor('23.9'));
console.log(Math.trunc('23.9'));
console.log(Math.trunc(-23.3));
console.log(Math.floor(-23.3));
//Rounding decimals

console.log((2.7).toFixed(0));
console.log((2.7).toFixed(3));
console.log(2.345).toFixed(2);
console.log(+(2.345).toFixed(2));
