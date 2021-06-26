const sell_1 = document.querySelector("#sell-1"); // Binance
const sell_2 = document.querySelector("#sell-2");
const buy_1 = document.querySelector("#buy-1"); // Bitkub
const buy_2 = document.querySelector("#buy-2");

function alertPhone() { // play sound
  document.getElementById('alert-sound').play();
}

let s1 = parseFloat(sell_1.innerText);
let s2 = parseFloat(sell_2.innerText);
let b1 = parseFloat(buy_1.innerText);
let b2 = parseFloat(buy_2.innerText);

if( Math.abs(s1 - s2) >= 0.10 || Math.abs(b1 - b2) >= 0.10) {
  alertPhone();
}

// Reload every 5 - 10 miniutes
const randNum = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;
const minute = (num) => num * 60000;
(function loopRandInterval() {
  let duration = randNum(minute(5), minute(10));
  setTimeout(() => {
    location.reload();
  }, duration);
})();