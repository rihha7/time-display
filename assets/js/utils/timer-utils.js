export const timerBtn = document.getElementById("timer-btn");

const parent = timerBtn.parentElement;

export const timerInput = parent.querySelector("div#timer-input");
export const submitBtn = parent.querySelector("button#submit-input");
export const timerComplete = document.querySelector("div#timer-complete");

const minutes = timerInput.querySelector("input#minute-input");
const seconds = timerInput.querySelector("input#second-input");


const disableInput = () => {
  minutes.setAttribute("disabled", true);
  seconds.setAttribute("disabled", true);

  timerInput.classList.add("bg-green-400/30");

  minutes.classList.add("pointer-events-none");
  seconds.classList.add("pointer-events-none");

  submitBtn.classList.add("hidden");
};

const enableInput = () => {
  minutes.removeAttribute("disabled", true);
  seconds.removeAttribute("disabled", true);

  timerInput.classList.remove("bg-green-400/30");

  minutes.classList.remove("pointer-events-none");
  seconds.classList.remove("pointer-events-none");

  submitBtn.classList.remove("hidden");

  minutes.value = "";
  seconds.value = "";
};



let timer = false;

export const startTimer = () => { 
  if (timer) return;
  parent.querySelector("div#timer-tooltip").classList.remove("hidden");
  disableInput();

  /* timer logic */
  let startMinute = +minutes.value;
  let startSecond = +seconds.value;

  parent.querySelector("div#timer-display").textContent = `${String(startMinute).padStart(2, "0")}:${String(startSecond).padStart(2, "0")}`;

  const interval = setInterval(() => {
    startSecond--;

    if (startSecond < 0) {
      startMinute--;
      startSecond = 59;
    }

    parent.querySelector("div#timer-display").textContent = `${String(startMinute).padStart(2, "0")}:${String(startSecond).padStart(2, "0")}`;

    if (startMinute === 0 && startSecond === 0) {
      clearInterval(interval);

      const now = new Date();
      const hourNow = String(now.getHours()).padStart(2, "0");
      const minutesNow = String(now.getMinutes()).padStart(2, "0");

      setTimeout(() => {
        parent.querySelector("div#timer-controls").classList.add("hidden");

        timerComplete.classList.remove("hidden");
        timerComplete.querySelector("span#time-completed").textContent = `${hourNow}:${minutesNow}`;
        parent.querySelector("div#timer-display").classList.add("hidden");
        timerInput.classList.add("hidden");
        submitBtn.classList.remove("hidden");
        timerBtn.classList.remove("hidden", "pointer-events-none");
        enableInput();
      }, 1100);
    }
  }, 1000);
  timer = true;
};


export const validateInput = () => {
  [minutes, seconds].forEach(input => {
    input.addEventListener("input", e => {
      let input = e.currentTarget.value;
      if (input.match(/[^0-9]/g)) {
        e.currentTarget.value = input.replace(/[^0-9]/g, "");
      }

      if (input.length == 2 && (+input > 59 || +input < 0)) e.currentTarget.value = "";

      if (input == 0 && e.currentTarget.id.startsWith("second") && minutes.value == 0) {
        minutes.value = "";
        e.currentTarget.value = "";
      }

      if (input.startsWith("0") && input.length > 1) e.currentTarget.value = input[1];
    });
  });

  seconds.addEventListener("keydown", e => {
    if (e.key === "Enter") startTimer();
  })
};
