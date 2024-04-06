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
//ASYNCHRONOUS JAVASCRIPT
