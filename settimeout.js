/*
const ingredienrs = ['olives', 'spinach'];
const pizzaTimer = setTimeout(
  (ing1, ing2) => console.log(`Here is your pizza with ${ing1} and ${ing2}`),
  3000,
  ...ingredienrs
);
console.log(`Waiting...`);
// in a settimeout function it is actually non that all easy to call arguments beacuse all arguments are being called by the orogram it self
// so when we set the paraters .. teh value of the parameters are called behind the millisecond number
if (ingredienrs.includes('spinach')) clearTimeout(pizzaTimer);
//claer timeout clears the timeout in the bracket
//ASYNCHRONOUS JAVASCRIPT

//set interval
//When we want to run a function over and over again
setInterval(function () {
  const now = new Date();
  console.log(now);
}, 1000);
*/

const hi = new Date();
console.log(hi);
console.log(hi.getFullYear());
console.log(hi.getDay());
const hour = hi.getHours();
const minutes = hi.getMinutes();
const seconds = hi.getSeconds();
ssetInterval(function () {
  console.log(`${hi.getHours()}: ${hi.getMinutes()} : ${hi.getSeconds()}`);
}, 1000);
