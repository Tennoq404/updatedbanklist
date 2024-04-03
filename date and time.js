//Create  a date
//there are actually four ways of creating dates in javascript

//Create a date
// there are four ways of creating dates in javascript
const now = new Date();
console.log(now);
//console.log(new Date('December 24, 2015'));

const future = new Date(2037, 10, 10, 15, 23);
// javascript script is quite smart.. according to thes parameters it will give you the adequate date
//
console.log(future);
//log the date to the console
console.log(future.getMonth());
//logs the month to the console
console.log(future.getMonth)();
console.log(future.getDate());
//logs the date to the console
console.log(future.getHours());
// logs the hours to the console
console.log(future.getMinutes());
//logs the present minutes to the console
console.log(future.getMinutes());
console.log(futures.getSeconds());
// logs the seconds to the console
console.log(future.toISOString());
// sets to iso string which follows an international standard
console.log(future.getTime());
// this will give you the amont of milliseconds that have been passed sice that date
//thet are called timestamps

console.log(new Date(2142256980000));
//

console.log(Date.now());
// this will give you the timestamp for the particular moment

future.setFullYear(2040);
// sets the fullyear to 2040
