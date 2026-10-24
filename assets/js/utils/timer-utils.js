export const timerBtn = document.getElementById("timer-btn");
const parent = timerBtn.parentElement;

export const timerInput = parent.querySelector("div#timer-input");
const timerControls = parent.querySelector("div#controls");
export const submitBtn = parent.querySelector("button#submit-input");
export const timerComplete = document.querySelector("div#timer-complete");
const timerDisplay = parent.querySelector("div#display");

const minutes = timerInput.querySelector("input#minutes");
const seconds = timerInput.querySelector("input#seconds");

let timerMinutes = 0, timerSeconds = 0;

const pause = parent.querySelector("button#pause");
const resume = parent.querySelector("button#resume");
const stop = parent.querySelector("button#stop");


const toggleInput = () => {
  minutes.toggleAttribute("disabled");
  seconds.toggleAttribute("disabled");

  timerInput.classList.toggle("bg-green-400/30");

  minutes.classList.toggle("pointer-events-none");
  seconds.classList.toggle("pointer-events-none");

  submitBtn.classList.toggle("hidden");
};


let timer = false;
let intervalID;
let mode = null;


const endTimer = () => {
  mode = null;
  timerInput.classList.add("hidden");
  timerBtn.classList.remove("hidden", "pointer-events-none");

  pause.classList.remove("hidden");
  resume.classList.add("hidden");

  toggleInput();
  timerControls.classList.add("hidden");
  timerControls.classList.remove("flex");
  timerDisplay.classList.add("hidden");
  minutes.value = "";
  seconds.value = "";

  timer = false;
};


const startInterval = () => {
  timerControls.classList.add("flex");
  timerControls.classList.remove("hidden");
  timerDisplay.classList.remove("hidden");

  intervalID = setInterval(() => {
    if (timerMinutes === 0 && timerSeconds === 0) {
      clearInterval(intervalID);
      setTimeout(() => {
        endTimer();
        const now = new Date();
        const hourNow = String(now.getHours()).padStart(2, "0");
        const minutesNow = String(now.getMinutes()).padStart(2, "0");

        timerComplete.classList.remove("hidden");
        timerComplete.querySelector("span#time-completed").textContent = `${hourNow}:${minutesNow}`;
      }, 800);
    } else {
      timerSeconds--;
      if (timerSeconds < 0) timerMinutes--, timerSeconds = 59;

      timerDisplay.textContent = `${String(timerMinutes).padStart(2, "0")}:${String(timerSeconds).padStart(2, "0")}`;
    }
  }, 1000);
};


export const handleTimer = () => { 
  if (timer) return;
  timer = true;

  toggleInput();

  /* timer logic */
  timerMinutes = +minutes.value;
  timerSeconds = +seconds.value;

  timerDisplay.textContent = `${String(timerMinutes).padStart(2, "0")}:${String(timerSeconds).padStart(2, "0")}`;

  pause.addEventListener("click", () => {
    if (mode === "pause") {
      mode = "resume";
      clearInterval(intervalID);
      pause.classList.add("hidden");
      resume.classList.remove("hidden");
    }
  });

  resume.addEventListener("click", () => {
    if (mode === "resume") {
      timerSeconds--;
      if (timerSeconds < 0) timerMinutes--, timerSeconds = 59;

      timerDisplay.textContent = `${String(timerMinutes).padStart(2, "0")}:${String(timerSeconds).padStart(2, "0")}`;
      startInterval();
      pause.classList.remove("hidden");
      resume.classList.add("hidden");
      mode = "pause";
    } 
  });

  stop.addEventListener("click", () => {
    clearInterval(intervalID);
    endTimer();
  });

  mode = "pause";
  startInterval();
};


export const validateInput = () => {
  [minutes, seconds].forEach(input => {
    input.addEventListener("input", e => {
      let input = e.currentTarget.value;

      e.currentTarget.value = input.replace(/[^0-9]/g, "");

      if (input.length > 1 && (+input > 59 || +input < 0)) e.currentTarget.value = "";
      if (input.length > 1 && input.startsWith("0")) e.currentTarget.value = input[1];

      if (input == 0 && e.currentTarget.id.startsWith("second") && minutes.value == 0) {
        minutes.value = "";
        e.currentTarget.value = "";
      }
    });
  });

  seconds.addEventListener("keydown", e => {
    if (e.key === "Enter") handleTimer();
  })
};
