import { pauseTimer, resumeTimer, stopTimer, startInterval, tPause, tResume, tStop } from './timer-utils.js';

export const timerBtn = document.getElementById("timer-btn");
export const tParent = timerBtn.parentElement;
const tDisplay = tParent.querySelector("div#display"); 
const tControls = tParent.querySelector("div#controls");
const timerInput = tParent.querySelector("div#timer-input");
const submitBtn = tParent.querySelector("button#submit-input");

export const timerComplete = document.querySelector("div#timer-complete");

export const minutes = timerInput.querySelector("input#minutes");
export const seconds = timerInput.querySelector("input#seconds");


let timer = false;

const handleTimer = () => {
  if (timer) return;
  timer = true;

  pauseTimer("timer", tPause, tResume);
  resumeTimer("timer", tResume, tPause, tDisplay, tControls);
  stopTimer("timer", tStop, tPause, tResume, timerBtn, tDisplay, tControls);

  startInterval("timer", tDisplay, tControls);
};



export const handleInput = () => { 
  timer = false;
  timerInput.classList.remove("hidden");
  timerInput.classList.add("flex");

  validateInput(); 

  timerBtn.classList.add("hidden", "pointer-events-none");

  timerComplete.classList.add("hidden");
  timerComplete.querySelector("span#time-completed").textContent = "00:00";
};



export const toggleInput = (mode, toggle) => {
  if (mode === "stop") {
    timerInput.classList.add("hidden");
    minutes.value = "";
    seconds.value = "";
  }

  minutes.toggleAttribute("disabled", toggle);
  seconds.toggleAttribute("disabled", toggle);

  timerInput.classList.toggle("bg-green-400/30", toggle);

  minutes.classList.toggle("pointer-events-none", toggle);
  seconds.classList.toggle("pointer-events-none", toggle);

  submitBtn.classList.toggle("hidden", toggle);
};



export const validateInput = () => {
  [minutes, seconds].forEach(input => {
    input.addEventListener("input", e => {
      let input = e.currentTarget.value;

      e.currentTarget.value = input.replace(/[^0-9]/g, "");

      if (input.length > 1 && (+input > 59 || +input < 0)) e.currentTarget.value = ""; // checks if valid
      if (input.length > 1 && input.startsWith("0")) e.currentTarget.value = input[1]; // checks if leading zero

      if (minutes.value == 0 && e.currentTarget.id === "seconds" && input == 0) {
        minutes.value = "", e.currentTarget.value = ""; // if minutes = 0 and seconds = 0
        minutes.focus();
      }
    });
  });

  submitBtn.addEventListener("click", () => {
    if (minutes.value && seconds.value) handleTimer();
  }); // just not empty strings

  seconds.addEventListener("keydown", e => {
    if (e.key === 'Enter' && minutes.value && seconds.value) handleTimer();
    if (e.key === 'ArrowLeft' && e.currentTarget.value && e.currentTarget.selectionStart === 0) minutes.focus(); // as long as its not empty
  });

  minutes.addEventListener("keydown", e => {
    if (e.key === 'ArrowRight' && (val = e.currentTarget.value) && e.currentTarget.selectionStart === val.length) seconds.focus(); // as long as its not empty
  });
};
