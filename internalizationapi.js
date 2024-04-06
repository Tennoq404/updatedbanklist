const num = 3884764.23;

const options = {
  style: 'unit',
  unit: 'mile-per-hour',
  currency: 'EUR',

  // the three options for the style are unit, percent and currency
  // you would also have to define the currency
  // we can also turn on and off the group
  // check out the intl documentation of MDN
};

console.log('US', new Intl.NumberFormat('en-US').format(num));
console.log('Germany', new Intl.NumberFormat('de-DE').format(num));
console.log('seria', new Intl.NumberFormat('ar-SY').format(num));
//if we want to use the one from the browser.. that would be
//console.log('browser', new Intl.NumberFormat(navigator.language).format(num));
//const now = new Date();
//onsole.log(new Intl.DateTimeFormat(now));
//console.log(
//navigate.language,
// new Intl.NumberFormat(navigator.language).format(num)
//);
