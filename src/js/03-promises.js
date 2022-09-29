import { Notify } from 'notiflix/build/notiflix-notify-aio';

const buttonRef = document.querySelector('button');
const inputRefs = document.querySelectorAll('input');

const values = {};

inputRefs.forEach(element => {
  element.addEventListener('input', event => {
    if (element.name === event.target.name) {
      values[element.name] = Number(event.target.value);
      console.log(element.name, event.target.value);
      console.log(values);
    }
  });
});

function createPromise(position, delay) {
  const shouldResolve = Math.random() > 0.3;
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (shouldResolve) {
        resolve({ position, delay });
      } else {
        reject({ position, delay });
      }
    }, delay);
  });
}

buttonRef.addEventListener('click', event => {
  event.preventDefault();
  let amountPos = 0;
  let delayCount = 0;
  for (let i = 0; i < Number(values.amount); i += 1) {
    amountPos += 1;
    if (i === 0) {
      delayCount = Number(values.delay);
    }
    if (i > 0) {
      delayCount = Number(values.delay) + Number(values.step) * i;
    }
    createPromise(amountPos, delayCount)
      .then(({ position, delay }) => {
        Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
      })
      .catch(({ position, delay }) => {
        Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
      });
  }
});
