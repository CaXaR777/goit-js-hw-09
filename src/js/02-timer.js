const timer = document.querySelector('.timer');
const fields = Array.from(document.querySelectorAll('.field'));

timer.style.fontFamily = 'Arial, sans-serif';
fields.forEach(field => {
  field.style.display = 'inline-block';
  field.style.marginRight = '15px';
  field.style.fontFamily = 'Arial, sans-serif';
  field.querySelector('.value').style.display = 'block';
  field.querySelector('.value').style.fontSize = '64px';
  field.querySelector('.label').style.fontSize = '32px';
  field.querySelector('.label').style.color = 'tomato';
});

import { Notify } from 'notiflix/build/notiflix-notify-aio';
// Описаний в документації
import flatpickr from 'flatpickr';
// Додатковий імпорт стилів
import 'flatpickr/dist/flatpickr.min.css';

const dateInput = document.querySelector('#datetime-picker');
const startBtn = document.querySelector('[data-start]');
const daysLeft = document.querySelector('.timer [data-days]');
const hoursLeft = document.querySelector('.timer [data-hours]');
const minutesLeft = document.querySelector('.timer [data-minutes]');
const secondsLeft = document.querySelector('.timer [data-seconds]');
// console.log(days, hours, minutes, seconds);

startBtn.disabled = true;
let setDate;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    setDate = selectedDates[0].getTime();
    const startTimer = Date.now();
    // console.log(startTimer)
    if (selectedDates[0] < startTimer) {
    //   startBtn.disabled = true;

      Notify.failure(`❌ Please choose a date in the future`);
      startBtn.disabled = true;
    }
    else {startBtn.disabled = false
    //   console.log(selectedDates[0]);
    // return setDate;
}
  },
};

flatpickr(dateInput, options);

startBtn.addEventListener('click', () => {
  let timeLeft;
  console.log(convertMs(setDate));
  dateInput.disabled = true;
  startBtn.disabled = true;
  const timeCount = setInterval(() => {
    timeLeft = setDate - Date.now();
    const { days, hours, minutes, seconds } = convertMs(timeLeft);
    daysLeft.innerHTML = pad(days);
    hoursLeft.innerHTML = pad(hours);
    minutesLeft.innerHTML = pad(minutes);
    secondsLeft.innerHTML = pad(seconds);

    if (timeLeft <= 0) {
      daysLeft.innerHTML = '00';
      hoursLeft.innerHTML = '00';
      minutesLeft.innerHTML = '00';
      secondsLeft.innerHTML = '00';
    }
  }, 1000);
});

function pad(value) {
  return String(value).padStart(2, '0');
}

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}
