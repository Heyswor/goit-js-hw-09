import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const dataPickerRef = document.querySelector('#datetime-picker');
const timerBtnStart = document.querySelector('[data-start]');
const timerRef = document.querySelector('.timer');

let pickDate = null;

notifyOptions = {
  backOverlay: true,
  closeButton: true,
  clickToClose: true,
  position: 'center-center',
};

dataPickerRef.addEventListener('input', event => {
  pickDate = new Date(event.target.value);
  if (pickDate.getTime() - Date.now() < 0) {
    timerBtnStart.disabled = true;
    Notify.failure(
      'Вибраний час в минулому, виберіть дату в майбутньому',
      notifyOptions
    );
    return;
  }

  timerBtnStart.disabled = false;
});

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    console.log(selectedDates[0]);
  },
};

flatpickr(dataPickerRef, options);

const timer = {
  interval: null,
  refs: {},

  start(rootSelector, stop) {
    const delta = pickDate.getTime() - Date.now();

    Notify.success('Відлік почався', notifyOptions);

    this.getRefs(rootSelector);
    this.interval = setInterval(() => {
      const ms = pickDate.getTime() - Date.now();
      if (ms <= 1000) {
        clearInterval(this.interval);
        Notify.success('Відлік завершено!', notifyOptions);
      }

      const data = this.convertMs(ms);

      Object.entries(data).forEach(([name, value]) => {
        this.refs[name].textContent = this.addLeadingZero(value);
      });
    }, 1000);
  },

  getRefs(rootSelector) {
    const arr = [...rootSelector.children];
    arr.forEach(item => {
      const itemArr = [...item.children];
      Object.entries(itemArr[0].dataset).forEach(([name]) => {
        this.refs[name] = rootSelector.querySelector(`[data-${name}]`);
      });
    });
  },
  convertMs(ms) {
    const second = 1000;
    const minute = second * 60;
    const hour = minute * 60;
    const day = hour * 24;

    const days = Math.floor(ms / day);

    const hours = Math.floor((ms % day) / hour);

    const minutes = Math.floor(((ms % day) % hour) / minute);

    const seconds = Math.floor((((ms % day) % hour) % minute) / second);

    return { days, hours, minutes, seconds };
  },
  addLeadingZero(value) {
    return String(value).padStart(2, '0');
  },
};

timerBtnStart.addEventListener('click', () => {
  if (!pickDate) {
    Notify.failure('Виберіть час!', notifyOptions);
    return;
  }
  timer.start(timerRef, pickDate);
});
