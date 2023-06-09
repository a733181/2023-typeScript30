let countdown: number;
const timerDisplay = document.querySelector<HTMLElement>(
  '.display__time-left'
)!;
const endTime = document.querySelector<HTMLElement>('.display__end-time')!;
const buttons = document.querySelectorAll<HTMLButtonElement>('[data-time]')!;

function timer(seconds: number) {
  // clear any existing timers
  clearInterval(countdown);

  const now = Date.now();
  const then = now + seconds * 1000;
  displayTimeLeft(seconds);
  displayEndTime(then);

  countdown = setInterval(() => {
    const secondsLeft = Math.round((then - Date.now()) / 1000);
    // check if we should stop it!
    if (secondsLeft < 0) {
      clearInterval(countdown);
      return;
    }
    // display it
    displayTimeLeft(secondsLeft);
  }, 1000);
}

function displayTimeLeft(seconds: number) {
  const minutes = Math.floor(seconds / 60);
  const remainderSeconds = seconds % 60;
  const display = `${minutes}:${
    remainderSeconds < 10 ? '0' : ''
  }${remainderSeconds}`;
  document.title = display;
  timerDisplay.textContent = display;
}

function displayEndTime(timestamp: number) {
  const end = new Date(timestamp);
  const hour = end.getHours();
  const adjustedHour = hour > 12 ? hour - 12 : hour;
  const minutes = end.getMinutes();
  endTime.textContent = `Be Back At ${adjustedHour}:${
    minutes < 10 ? '0' : ''
  }${minutes}`;
}

function startTimer(this: HTMLButtonElement) {
  const seconds = parseInt(this.dataset.time!);
  timer(seconds);
}

buttons.forEach((button) => button.addEventListener('click', startTimer));

document
  .querySelector<HTMLFormElement>('#custom')!
  .addEventListener(
    'submit',
    function (this: HTMLFormElement, e: SubmitEvent): void {
      e.preventDefault();
      const mins = this.minutes.value;
      console.log(mins);
      timer(mins * 60);
      this.reset();
    }
  );
