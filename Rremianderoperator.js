// the remainder operator returns the remainder of an operation

console.log(5 % 2);
console.log(5 / 2); // 5 = 2 * 2 + 1

console.log(8 % 2);
console.log(8 / 3); // 8 = 2 * 3 + 2

const checkingevenorodd = function (num) {
  if (num % 2 === 0) {
    console.log('   This is an even number');
  } else {
    console.log(`This is an odd number`);
  }
};
checkingevenorodd(2);
