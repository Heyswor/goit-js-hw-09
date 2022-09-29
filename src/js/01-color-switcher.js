function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

const startBtn = document.querySelector('[data-start]');
const stopBtn = document.querySelector('[data-stop]');
const docRef = document.querySelector('body');

const colorTimer = () => {
  docRef.style.backgroundColor = getRandomHexColor();
};
let timer = null;

const startColorChangeAdd = startBtn.addEventListener('click', () => {
  timer = setInterval(colorTimer, 1000);
  startBtn.disabled = true;
  if (stopBtn.disabled) {
    stopBtn.disabled = false;
  }
});

stopBtn.addEventListener('click', () => {
  stopBtn.disabled = true;
  if (startBtn.disabled) {
    startBtn.disabled = false;
  }
  clearInterval(timer);
  startColorChangeAdd;
});
