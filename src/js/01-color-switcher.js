const startBtn = document.querySelector('button[data-start]');
const stopBtn = document.querySelector('button[data-stop]');
const body = document.querySelector('body');
console.log(body);

let timerId = null;

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215)
    .toString(16)
    .padStart(6, 0)}`;
}

startBtn.addEventListener('click', e => {
  startBtn.disabled = true;
  stopBtn.disabled = false;
  timerId = setInterval(() => {
    body.style.backgroundColor = getRandomHexColor();
  }, 1000);
});

stopBtn.addEventListener('click', e => {
  clearInterval(timerId);
  stopBtn.disabled = true;
  startBtn.disabled = false;
});
