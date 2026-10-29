import { timerBtn, toggleInput, timerComplete, minutes, seconds, tParent } from "./timer-input-utils";

let sMode = null;
let tMode = null;

// stopwatch
let sIntervalID;
let sHours = 0, sMinutes = 0, sSeconds = 0;
const stopwatchHrLimit = 3;

// timer
let tIntervalID;
let tMinutes = 0, tSeconds = 0;

export const tPause = tParent.querySelector("button#pause");
export const tResume = tParent.querySelector("button#resume");
export const tStop = tParent.querySelector("button#stop");

const clearTimerInterval = (timer) => {
  if (timer === "stopwatch") clearInterval(sIntervalID);
  if (timer === "timer") clearInterval(tIntervalID);
};


const setMode = (timer, value) => {
  if (timer === "stopwatch") sMode = value;
  if (timer === "timer") tMode = value;
};


const endTimer = (timer, pause, resume, button, display, controls) => {
  setMode(timer, null);

  clearTimerInterval(timer);
  pause.classList.remove("hidden");
  resume.classList.add("hidden");

  button.classList.remove("hidden", "pointer-events-none");
  display.classList.add("hidden");
  controls.classList.add("hidden");
  controls.classList.remove("flex");

  if (timer === "stopwatch") {
    sHours = 0, sMinutes = 0, sSeconds = 0;
    display.textContent = "00:00:00";
  } else {
    toggleInput("stop", false);
    tMinutes = 0, tSeconds = 0;
    display.textContent = "00:00";
  }
};


export const stopTimer = (timer, stop, pause, resume, button, display, controls) => {
  stop.addEventListener("click", () => {
    endTimer(timer, pause, resume, button, display, controls);
  });
};


export const startInterval = (timer, display, controls) => {
  display.classList.remove("hidden");
  controls.classList.remove("hidden");
  controls.classList.add("flex");

  if (timer === "stopwatch") {
    sIntervalID = setInterval(() => {
      setMode("stopwatch", "pause");
      
      sSeconds++;
      if (sSeconds === 60) sSeconds = 0, sMinutes++;
      if (sMinutes === 60) sMinutes = 0, sHours++;
      display.textContent = `${String(sHours).padStart(2, "0")}:${String(sMinutes).padStart(2, "0")}:${String(sSeconds).padStart(2, "0")}`;
      if (sHours === stopwatchHrLimit) clearInterval(sIntervalID);
    }, 1000);
  }

  if (timer === "timer") {
    if (tMode !== "resume") {
      toggleInput("resume", true);
      tSeconds = +seconds.value;
      tMinutes = +minutes.value;
      display.textContent = `${String(tMinutes).padStart(2, "0")}:${String(tSeconds).padStart(2, "0")}`;
    };

    tIntervalID = setInterval(() => {
      setMode("timer", "pause");

      if (tMinutes === 0 && tSeconds === 0) {
        setTimeout(() => {
          endTimer(timer, tPause, tResume, timerBtn, display, controls);

          const now = new Date();
          const localHour = String(now.getHours()).padStart(2, "0");
          const localMinutes = String(now.getMinutes()).padStart(2, "0");

          timerComplete.classList.remove("hidden");
          timerComplete.querySelector("span#time-completed").textContent = `${localHour}:${localMinutes}`;
        }, 300);
      } else {
        tSeconds--;
        if (tSeconds < 0) tMinutes--, tSeconds = 59;
        display.textContent = `${String(tMinutes).padStart(2, "0")}:${String(tSeconds).padStart(2, "0")}`;
      } 
    }, 1000);
  }
};


export const pauseTimer = (timer, pause, resume) => {
  pause.addEventListener("click", () => {
    if ((timer === "timer" && tMode === "pause") || (timer === "stopwatch" && sMode === "pause")) {
      setMode(timer, "resume");
      clearTimerInterval(timer); 
      pause.classList.add("hidden");
      resume.classList.remove("hidden");
    }
  });
};


export const resumeTimer = (timer, resume, pause, display, controls) => {
  resume.addEventListener("click", () => {
    if ((timer === "timer" && tMode === "resume") || (timer === "stopwatch" && sMode === "resume")) {
      if (timer === "timer") {
        if (tSeconds < 0) {
          if (tMinutes === 0) tSeconds = 0, tMinutes = 0;
          else tMinutes--, tSeconds = 59;
        }

        display.textContent = `${String(tMinutes).padStart(2, "0")}:${String(tSeconds).padStart(2, "0")}`;
      }
      
      startInterval(timer, display, controls);
      setMode(timer, "pause");
      pause.classList.remove("hidden");
      resume.classList.add("hidden");
    }
  });
};
