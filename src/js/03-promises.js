import { Notify } from 'notiflix/build/notiflix-notify-aio';

const form = document.querySelector('form');
form.addEventListener('submit', onSubmit);
console.log(form);

function onSubmit(e) {
  e.preventDefault();
  let delay = e.target[0].valueAsNumber;
  console.log(delay);
  const step = e.target[1].valueAsNumber;
  const amount = e.target[2].valueAsNumber;

  for (let position = 1; position <= amount; position++) {
    createPromise(position, delay);
    delay += step;
    console.log(delay);
  }
  e.currentTarget.reset();
}

function createPromise(position, delay) {
  const shouldResolve = Math.random() > 0.3;
  const promise = new Promise((resolve, reject) => {
    setTimeout(() => {
      if (shouldResolve) {
        resolve({ position, delay });
      } else {
        reject({ position, delay });
      }
    }, delay);
  });

  promise
    .then(({ position, delay }) => {
      Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
    })
    .catch(({ position, delay }) => {
      Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
    });
}
