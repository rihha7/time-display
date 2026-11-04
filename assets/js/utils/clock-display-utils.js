export const toString = n => String(n).padStart(2, "0");

const localTime = () => {
  const now = new Date();
  const hours24 = now.getHours();

  return [
    hours24,
    hours24 % 12 || 12, // hours12
    now.getMinutes(),   // minutes
    now.getSeconds(),   // seconds
  ];
};


const hourSegment = document.getElementById("hour-segment");
const minuteSegment = document.getElementById("minute-segment");
const secondsSegment = document.getElementById("second-segment");

export const setHoverTargetWidths = () => {
  [hourSegment, minuteSegment, secondsSegment].forEach(segment => {
    const hoverTarget = segment.firstElementChild;
    const timeSegment = segment.lastElementChild.textContent;

    let targetWidth = 7.65, marginLeft = 3;

    for (const char of timeSegment) {
      if ("235689".includes(char)) targetWidth -= 0.22;
      else if (char == '7') targetWidth -= 0.4;
      else if (char == '1') targetWidth -= 1.17, marginLeft += 1;
    }

    targetWidth = targetWidth.toFixed(2);
    hoverTarget.style.width = `${targetWidth}rem`;
    hoverTarget.style.marginLeft = `-${marginLeft}px`;
  });
}

const timePeriod = document.getElementById("time-period");
const hoursDisplay = hourSegment.querySelector("h1");
const minutesDisplay = minuteSegment.querySelector("h1");
const secondsDisplay = secondsSegment.querySelector("h1");


export const updateDigitalClock = hourFormat => {
  [hours24, hours12, minutes, seconds] = localTime();

  // set time period
  if (hours24 === 0 && minutes === 0) timePeriod.textContent = "midnight";
  else if (hours24 < 12) timePeriod.textContent = "AM";
  else if (hours24 == 12 && minutes == 0) timePeriod.textContent = "noon";
  else timePeriod.textContent = "PM";

  hoursDisplay.textContent = hourFormat === "12h"
                             ? toString(hours12)
                             : toString(hours24);
  minutesDisplay.textContent = toString(minutes);
  secondsDisplay.textContent = toString(seconds);

  setHoverTargetWidths();
};


const digitalDisplay = document.getElementById("digital-display");
const hourHand = document.getElementById("hour-hand");
const minuteHand = document.getElementById("minute-hand");
const secondHand = document.getElementById("second-hand");

export const updateAnalogClock = () => {
  [hours24, hours12, minutes, seconds] = localTime();

  // update mini digital display
  digitalDisplay.textContent = `${toString(hours24)}:${toString(minutes)}`;

  // update analog clock
  hourHand.style.rotate = `${(hours12 * 30) + (0.5 * minutes)}deg`;
  minuteHand.style.rotate = `${minutes * 6}deg`;
  secondHand.style.rotate = `${seconds * 6}deg`;
};
