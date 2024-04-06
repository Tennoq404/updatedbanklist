//new lesson
const future = new Date(2037, 10, 19, 15, 23);

console.log(future);

const hi = new Intl.DateTimeFormat('en-US').format(future);
console.log(hi);
const h2 = new Intl.NumberFormat('en-US').format(future);
console.log(h2);
