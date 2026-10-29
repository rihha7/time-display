import { pauseTimer, resumeTimer, stopTimer, startInterval} from './utils/timer-utils.js';
import { timerBtn, handleInput } from './utils/timer-input-utils.js';

(() => {
  window.addEventListener("DOMContentLoaded", () => {
    // timer
    timerBtn.addEventListener("click", handleInput);

    // stopwatch
    const stopwatchBtn = document.getElementById("stopwatch-btn");
    const sParent = stopwatchBtn.parentElement;

    const sDisplay = sParent.querySelector("div#display"); 
    const sControls = sParent.querySelector("div#controls");

    const sPause = sParent.querySelector("button#pause");
    const sResume = sParent.querySelector("button#resume");
    const sStop = sParent.querySelector("button#stop");

    stopwatchBtn.addEventListener("click", () => {
      stopwatchBtn.classList.add("hidden");

      startInterval("stopwatch", sDisplay, sControls);

      pauseTimer("stopwatch", sPause, sResume);
      resumeTimer("stopwatch", sResume, sPause, sDisplay, sControls);
      stopTimer("stopwatch", sStop, sPause, sResume, stopwatchBtn, sDisplay, sControls);
    });
  });
})();
