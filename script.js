'use strict';

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP

/////////////////////////////////////////////////
// Data

// DIFFERENT DATA! Contains movement dates, currency and locale

const account1 = {
  owner: 'Jonas Schmedtmann',
  movements: [200, 455.23, -306.5, 25000, -642.21, -133.9, 79.97, 1300],
  interestRate: 1.2, // %
  pin: 1111,

  movementsDates: [
    '2019-11-18T21:31:17.178Z',
    '2019-12-23T07:42:02.383Z',
    '2020-01-28T09:15:04.904Z',
    '2020-04-01T10:17:24.185Z',
    '2020-05-08T14:11:59.604Z',
    '2020-05-27T17:01:17.194Z',
    '2020-07-11T23:36:17.929Z',
    '2020-07-12T10:51:36.790Z',
  ],
  currency: 'EUR',
  locale: 'pt-PT', // de-DE
};

const account2 = {
  owner: 'Jessica Davis',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,

  movementsDates: [
    '2019-11-01T13:15:33.035Z',
    '2019-11-30T09:48:16.867Z',
    '2019-12-25T06:04:23.907Z',
    '2020-01-25T14:18:46.235Z',
    '2020-02-05T16:33:06.386Z',
    '2020-04-10T14:43:26.374Z',
    '2020-06-25T18:49:59.371Z',
    '2020-07-26T12:01:20.894Z',
    '2020-08-26T12:01:20.894Z',
  ],
  currency: 'USD',
  locale: 'en-US',
};

const accounts = [account1, account2];

/////////////////////////////////////////////////
// Elements
const labelWelcome = document.querySelector('.welcome');
const labelDate = document.querySelector('.date');
const labelBalance = document.querySelector('.balance__value');
const labelSumIn = document.querySelector('.summary__value--in');
const labelSumOut = document.querySelector('.summary__value--out');
const labelSumInterest = document.querySelector('.summary__value--interest');
const labelTimer = document.querySelector('.timer');

const containerApp = document.querySelector('.app');
const containerMovements = document.querySelector('.movements');

const btnLogin = document.querySelector('.login__btn');
const btnTransfer = document.querySelector('.form__btn--transfer');
const btnLoan = document.querySelector('.form__btn--loan');
const btnClose = document.querySelector('.form__btn--close');
const btnSort = document.querySelector('.btn--sort');
const datebutton = document.querySelector('.movements__date');

const inputLoginUsername = document.querySelector('.login__input--user');
const inputLoginPin = document.querySelector('.login__input--pin');
const inputTransferTo = document.querySelector('.form__input--to');
const inputTransferAmount = document.querySelector('.form__input--amount');
const inputLoanAmount = document.querySelector('.form__input--loan-amount');
const inputCloseUsername = document.querySelector('.form__input--user');
const inputClosePin = document.querySelector('.form__input--pin');

/////////////////////////////////////////////////
// Functions
const formatMovementDate = function (date, locale) {
  const calcPassed = (date1, date2) =>
    Math.round(Math.abs(date2 - date1) / (1000 * 60 * 60 * 24));
  const dayspassed = calcPassed(new Date(), date);
  console.log(dayspassed);

  if (dayspassed === 0) return 'Today';
  if (dayspassed === 1) return 'Yesterday';
  if (dayspassed <= 1) return `${dayspassed} days ago`;
  else {
    //const day = `${date.getDate()}`.padStart(2, 0);
    //const month = `${date.getMonth() + 1}`.padStart(2, 0);
    //const year = date.getFullYear();
    return Intl.DateTimeFormat(locale).format(date);
  }
};

const formatCur = function (value, locale, currency) {
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency: currency,
  }).format(value);
};

const displayMovements = function (acc, sort = false) {
  containerMovements.innerHTML = '';

  const movs = sort ? movements.slice().sort((a, b) => a - b) : acc.movements;

  movs.forEach(function (mov, i) {
    const type = mov > 0 ? 'deposit' : 'withdrawal';
    const date = new Date(acc.movementsDates[i]);
    const displayDate = formatMovementDate(date, acc.locale);
    const formattedMov = formatCur(mov, acc.locale, acc.currency);

    const html = `
      <div class="movements__row">
        <div class="movements__type movements__type--${type}">${
      i + 1
    } ${type}</div>
      <div class="movements__date">${displayDate}</div>
        <div class="movements__value">${formattedMov}</div>
      </div>
    `;

    containerMovements.insertAdjacentHTML('afterbegin', html);
  });
};

const calcDisplayBalance = function (acc) {
  acc.balance = acc.movements.reduce((acc, mov) => acc + mov, 0);

  labelBalance.textContent = formatCur(acc.balance, acc.locale, acc.currency);
};

const calcDisplaySummary = function (acc) {
  const incomes = acc.movements
    .filter(mov => mov > 0)
    .reduce((acc, mov) => acc + mov, 0);
  labelSumIn.textContent = formatCur(acc.balance, acc.locale, acc.currency);

  const out = acc.movements
    .filter(mov => mov < 0)
    .reduce((acc, mov) => acc + mov, 0);
  labelSumOut.textContent = formatCur(Math.abs(out), acc.locale, acc.currency);

  const interest = acc.movements
    .filter(mov => mov > 0)
    .map(deposit => (deposit * acc.interestRate) / 100)
    .filter((int, i, arr) => {
      // console.log(arr);
      return int >= 1;
    })
    .reduce((acc, int) => acc + int, 0);
  labelSumInterest.textContent = formatCur(interest, acc.locale, acc.currency);
};

const createUsernames = function (accs) {
  accs.forEach(function (acc) {
    acc.username = acc.owner
      .toLowerCase()
      .split(' ')
      .map(name => name[0])
      .join('');
  });
};
createUsernames(accounts);

const updateUI = function (acc) {
  // Display movements
  displayMovements(acc);

  // Display balance
  calcDisplayBalance(acc);

  // Display summary
  calcDisplaySummary(acc);
};
const startLogOutTimer = function () {
  // Set time to 5 minutes
  let time = 120;

  //Call the timer every second

  const tick = function () {
    const min = String(Math.trunc(time / 60)).padStart(2, 0);
    const sec = String(time % 60).padStart(2, 0);

    // in each cell, print the remaining time to UI
    labelTimer.textContent = `${min} : ${sec}`;

    //DECREAE IS
    time--;
    if (time === 0) {
      clearInterval(timer);
      containerApp.style.opacity = 0;
      document.write('you have been logged out');
    }
  };

  tick();
  const timer = setInterval(tick, 1000);

  // WHEN 0 seconds, stop timer and log out user
  return timer;
};

/// creating dates

///////////////////////////////////////
// Event handlers
let currentAccount, timer;
//FAKE ALWAYS LOGGED IN
currentAccount = account1;
updateUI(currentAccount);
containerApp.style.opacity = 100;
//Experimenting API
const now = new Date();

//for formatting dates
//currenices and dates are reoresnted ina completely diffrent way using the internalixation api
// it formats dates automaticaly
//intl is the name space for the internalization api
// we pass  in a local string which is usually the language- the country
// and we call .format
// to get this different codes
// iso language Code Table.. google this to find your local string(en-us)
// we can give another argument to this api.. we can give an objects ..
//assuming we want to include hour,minute,day,month,year,weekday
//for example

// the numeric gives the value in numeric form while the long.. give the alphabetic value
//short or narrow or 2-digit

//const now = new Date();

//const day = `${now.getDay()}`.padStart(2, 0);
//const month = now.getMonth();
//const year = now.getFullYear();
//const hour = now.getHours();
//const min = now.getMinutes();
//labelDate.textContent = `${day}/${month}/${year},${hour}: ${min}`;

//day/month/year

btnLogin.addEventListener('click', function (e) {
  // Prevent form from submitting
  e.preventDefault();

  currentAccount = accounts.find(
    acc => acc.username === inputLoginUsername.value
  );
  console.log(currentAccount);

  if (currentAccount?.pin === Number(inputLoginPin.value)) {
    // Display UI and message
    labelWelcome.textContent = `Welcome back, ${
      currentAccount.owner.split(' ')[0]
    }`;
    containerApp.style.opacity = 100;

    //Create current date and time
    const maxwelltime = {
      hours: 'numeric',
      minute: 'numeric',
      day: 'numeric',
      month: 'long',
      year: 'numeric',
      weekday: 'long',
    };

    labelDate.textContent = new Intl.DateTimeFormat(
      currentAccount.locale,
      maxwelltime
    ).format(now);

    // Clear input fields
    inputLoginUsername.value = inputLoginPin.value = '';
    inputLoginPin.blur();

    startLogOutTimer();

    // Update UI
    updateUI(currentAccount);
  }
});

btnTransfer.addEventListener('click', function (e) {
  e.preventDefault();
  const amount = Number(inputTransferAmount.value);
  const receiverAcc = accounts.find(
    acc => acc.username === inputTransferTo.value
  );
  inputTransferAmount.value = inputTransferTo.value = '';

  if (
    amount > 0 &&
    receiverAcc &&
    currentAccount.balance >= amount &&
    receiverAcc?.username !== currentAccount.username
  ) {
    // Doing the transfer
    currentAccount.movements.push(-amount);
    receiverAcc.movements.push(amount);
    //Add
    currentAccount.movements.push(-amount);
    receiverAcc.movements.push(amount);

    //Add transfer Date
    currentAccount.movementsDates.push(new Date().toISOstring());
    receiverAcc.movementsDates.push(new Date().toISOString());

    // Update UI
    updateUI(currentAccount);
    clearInterval(timer);
    timer = startLogOutTimer();
  }
});

btnLoan.addEventListener('click', function (e) {
  e.preventDefault();

  const amount = Math.floor(inputLoanAmount.value);

  if (amount > 0 && currentAccount.movements.some(mov => mov >= amount * 0.1)) {
    // Add movement
    setTimeout(function () {
      currentAccount.movements.push(amount);

      //add loan Date
      currentAccount.movementsDates.push(new Date());

      // Update UI
      updateUI(currentAccount);
    }, 1500);
    inputLoanAmount.value = '';
  }
});

btnClose.addEventListener('click', function (e) {
  e.preventDefault();

  if (
    inputCloseUsername.value === currentAccount.username &&
    Number(inputClosePin.value) === currentAccount.pin
  ) {
    const index = accounts.findIndex(
      acc => acc.username === currentAccount.username
    );
    console.log(index);
    // .indexOf(23)

    // Delete account
    accounts.splice(index, 1);

    // Hide UI
    containerApp.style.opacity = 0;
  }

  inputCloseUsername.value = inputClosePin.value = '';
});

let sorted = false;
btnSort.addEventListener('click', function (e) {
  e.preventDefault();
  displayMovements(currentAccount.movements, !sorted);
  sorted = !sorted;
});

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// LECTURES

console.log(Number('23'));
console.log(+'23');

//parsing
console.log(Number.parseInt('30px'));
console.log(Number.parseInt('e23'));

console.log(Number.parseInt(' 2.5rem '));
console.log(Number.parseFloat('2.5rem'));
//console.log(parseFloat('2.5rem'))

console.log(Number.isNaN(20));
console.log(Number.isNaN('20'));
console.log(Number.isNaN(+'20x'));
console.log(Number.isNaN(23 / 0));

//Checking if value is number

console.log(Number.isFinite(20));
console.log(Number.isFinite('20'));
console.log(Number.isFinite('20x'));
console.log(Number.isFinite(23 / 0));

labelBalance.addEventListener('click', function () {
  [...document.querySelectorAll('.movements__row')].forEach(function (row, i) {
    if (i % 2 === 0) row.style.backgroundColor = 'orange';

    if (i % 3 === 0) row.style.backgroundColor = 'blue';
  });
});
//BIG INT?
/*
console.log(2 ** 53 - 1);
console.log(Number.MAX_SAFE_INTEGER);
console.log(2 ** 53 + 1);
console.log(2 ** 53 + 2);
console.log(2 ** 53 + 3);
console.log(2 ** 53 + 4);

console.log(48384383828809889289281889988234n);
console.log(Bigint(36478282981));

//operations

console.log(1000n + 1000n);
console.log(362863387278787297979777771797277127712771n + 10000000n);
const huge = 202898302388779880909099;
const num = 23;
console.log(huge * Bigint(num));

console.log(20n > 15);
console.log(20n === 20);
console.log(typeof 20n);
console.log(20n == '20');

//ALSO MATH FUNCIONS DO OT WORK ON BIGINT

//DIVISIONS
console.log(11n / 3n);
console.log(10 / 3);

//new lesson
const future = new Date(2037, 10, 19, 15, 23);
console.log(+future);

const calcPassed = (date1, date2) =>
  (Math.abs(date1 - date2) / 1000) * 60 * 60 * 24;
const days1 = calcPassed(new Date(2037, 3, 14), new Date(2037, 3, 14));
console.log(days1);
*/
