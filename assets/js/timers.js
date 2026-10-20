import {
  timerBtn, timerInput, submitBtn, timerComplete,
  startTimer, validateInput
} from './utils/timer-utils.js';

(() => {
  window.addEventListener("DOMContentLoaded", () => {

    /* timer */
    const handleInput = () => {
      timerInput.classList.remove("hidden");
      timerInput.classList.add("flex");
      validateInput();
     
      submitBtn.addEventListener("click", startTimer);  
    };

    timerBtn.addEventListener("click", () => {
      handleInput();
      timerBtn.classList.add("hidden", "pointer-events-none");
      timerComplete.classList.add("hidden");
      timerComplete.querySelector("span#time-completed").textContent = "00:00";
      timer = false;
    });


    /* stopwatch */
  });
})();
