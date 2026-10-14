(() => {
  window.addEventListener("DOMContentLoaded", () => {
    const params = new URLSearchParams(window.location.search);

    if (params.get("clock") === "digital") {
      const timeZone = document.getElementById("timezone");
      const intlTimeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
      timeZone.textContent = intlTimeZone.match(/\/(.*)/)[1].toLowerCase();

      // ---------------------------------------------

      const btn24h = document.getElementById("24h-btn");
      const btn12h = document.getElementById("12h-btn");

      let hourFormat = localStorage.getItem("hour-format");
      hourFormat = hourFormat ?? "24h";
      localStorage.setItem("hour-format", hourFormat);

      const disableSelection = btn => btn.classList.add("bg-black", "border-black", "text-white", "cursor-not-allowed");

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

      // ---------------------------------------------

      const hourSegment = document.getElementById("hour-segment");
      const minuteSegment = document.getElementById("minute-segment");
      const secondSegment = document.getElementById("second-segment");

      /* default hover target width */
      
      const setDefaultWidths = () => {
        [hourSegment, minuteSegment, secondSegment].forEach(segment => {
          const hoverTarget = segment.querySelector("div.hover-target");
          const timeSegment = segment.querySelector("h1").textContent; // string
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

      const hours = hourSegment.querySelector("h1");
      const minutes = minuteSegment.querySelector("h1");
      const seconds = secondSegment.querySelector("h1");

      const updateClock = () => {
        const now = new Date();

        let hour = now.getHours(); // 24h
        if (hourFormat === "12h") hour = hour % 12 || 12;

        hours.textContent =
          String(hour).padStart(2, "0");

        minutes.textContent =
          String(now.getMinutes()).padStart(2, "0");

        seconds.textContent =
          String(now.getSeconds()).padStart(2, "0");
        
        setDefaultWidths();
      }

      updateClock();
      setInterval(updateClock, 1000);

    }
  });
})();
