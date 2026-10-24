import {
  timerBtn, timerInput, submitBtn, timerComplete,
  handleTimer, validateInput
} from './utils/timer-utils.js';

(() => {
  window.addEventListener("DOMContentLoaded", () => {

    // timer
    const handleInput = () => {
      timerInput.classList.remove("hidden");
      timerInput.classList.add("flex");
      validateInput();
      submitBtn.addEventListener("click", handleTimer);  
    };

    timerBtn.addEventListener("click", () => {
      handleInput();
      timerBtn.classList.add("hidden", "pointer-events-none");
      timerComplete.classList.add("hidden");
      timerComplete.querySelector("span#time-completed").textContent = "00:00";
      timer = false;
    });


    // stopwatch
    const stopwatchBtn = document.getElementById("stopwatch-btn");
    const parent = stopwatchBtn.parentElement;
    const display = parent.querySelector("div#display");
    let intervalID;
    let mode = null;
    let hours = 0, minutes = 0, seconds = 0;

    const startTimer = () => {
      intervalID = setInterval(() => {
        mode = "pause";

        seconds++;
        if (seconds === 60) seconds = 0, minutes++;
        if (minutes === 60) minutes = 0, hours++;

        display.textContent = `${String(hours).padStart(2, "0")}:${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;

        if (hours === 3) clearInterval(intervalID);
      }, 1000);
    };

    stopwatchBtn.addEventListener("click", () => {
      const controls = parent.querySelector("div#controls");
      const pause = parent.querySelector("button#pause");
      const resume = parent.querySelector("button#resume");
      const stop = parent.querySelector("button#stop");

      stopwatchBtn.classList.add("hidden");
      display.classList.remove("hidden");
      controls.classList.remove("hidden");
      controls.classList.add("flex");

      startTimer();

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
          mode = "pause";
          startTimer();
          resume.classList.add("hidden");
          pause.classList.remove("hidden");
        }
      });

      stop.addEventListener("click", () => {
        mode = null;
        resume.classList.add("hidden");
        pause.classList.remove("hidden");

        clearInterval(intervalID);
        stopwatchBtn.classList.remove("hidden");
        display.classList.add("hidden");
        controls.classList.add("hidden");
        controls.classList.remove("flex");

        hours = 0, minutes = 0, seconds = 0;
        display.textContent = "00:00:00";
      });
    });
  });
})();
