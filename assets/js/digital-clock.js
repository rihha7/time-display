(() => {
  window.addEventListener("DOMContentLoaded", () => {
    const params = new URLSearchParams(window.location.search);

    if (params.get("clock") === "digital") {

      // timezone city
      const timeZone = document.getElementById("timezone");
      const intlTimeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
      timeZone.textContent = intlTimeZone.match(/\/(.*)/)[1].toLowerCase();

      
      // switch between hour formats
      const btn24h = document.getElementById("24h-btn");
      const btn12h = document.getElementById("12h-btn");

      let hourFormat = localStorage.getItem("hour-format");
      hourFormat = hourFormat ?? "24h";
      localStorage.setItem("hour-format", hourFormat);

      const disableSelection = btn => btn.classList.add("bg-black", "border-black", "text-white", "cursor-not-allowed", "font-medium");

      const enableSelection = (btn, newHrFormat) => {
        btn.classList.add("cursor-pointer", "bg-[#F2E8D5]", "hover:bg-white", "hover:shadow-[2px_2px_black]");

        btn.addEventListener("click", () => {
          localStorage.setItem("hour-format", newHrFormat);
          window.location.replace("/");
        }, { once: true });
      }

      if (hourFormat === "24h") {
        disableSelection(btn24h);
        enableSelection(btn12h, "12h");
      } else {
        disableSelection(btn12h);
        enableSelection(btn24h, "24h");
      }


      // hover target widths for each digital clock segment
      const hourSegment = document.getElementById("hour-segment");
      const minuteSegment = document.getElementById("minute-segment");
      const secondSegment = document.getElementById("second-segment");

      const setDefaultWidths = () => {
        /* default hover target width */
        [hourSegment, minuteSegment, secondSegment].forEach(segment => {
          const hoverTarget = segment.querySelector("div.hover-target");
          const timeSegment = segment.querySelector("h1").textContent;
          let targetWidth = 7.65;
          let marginLeft = 3;

          for (const char of timeSegment) {
            if ("235689".includes(char)) {
              targetWidth -= 0.22;
            } else if (char == '7') {
              targetWidth -= 0.4;
            } else if (char == '1') {
              targetWidth -= 1.17;
              marginLeft += 1;
            }
          }

          targetWidth = targetWidth.toFixed(2);
          hoverTarget.style.width = `${targetWidth}rem`;
          hoverTarget.style.marginLeft = `-${marginLeft}px`;
        });
      }

      setDefaultWidths();


      // digital clock logic + update hover target widths
      // time period
      const timePeriod = document.getElementById("time-period");

      const hoursDisplay = hourSegment.querySelector("h1");
      const minutesDisplay = minuteSegment.querySelector("h1");
      const secondsDisplay = secondSegment.querySelector("h1");

      const updateClock = () => {
        const now = new Date();

        const minutes = now.getMinutes();
        const seconds = now.getSeconds();
        let hours = now.getHours(); // 24h

        // set time period
        if (hours == 0 && minutes == 0) timePeriod.textContent = "midnight";
        else if (hours < 12) timePeriod.textContent = "AM";
        else if (hours == 12 && minutes == 0) timePeriod.textContent = "noon";
        else timePeriod.textContent = "PM";


        if (hourFormat === "12h") hours = hours % 12 || 12;

        hoursDisplay.textContent = String(hours).padStart(2, "0");
        minutesDisplay.textContent = String(minutes).padStart(2, "0");
        secondsDisplay.textContent = String(seconds).padStart(2, "0");

        setDefaultWidths();
      }

      updateClock();
      setInterval(updateClock, 1000);
    }
  });
})();
