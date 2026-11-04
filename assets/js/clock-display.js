import { setHoverTargetWidths, updateDigitalClock, updateAnalogClock } from "./utils/clock-display-utils";

(() => {
  window.addEventListener("DOMContentLoaded", () => {
    const params = new URLSearchParams(window.location.search);

    if (params.get("clock") === "digital") {
      // timezone city
      const timeZone = document.getElementById("timezone");
      const intlTimeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
      timeZone.textContent = intlTimeZone.match(/\/(.*)/)[1].toLowerCase();
      
      const btn24h = document.getElementById("24h-btn");
      const btn12h = document.getElementById("12h-btn");

      // store/get hour format
      let hourFormat = localStorage.getItem("hour-format");
      hourFormat = hourFormat ?? "24h";
      localStorage.setItem("hour-format", hourFormat);

      const disableSelection = btn => {
        btn.style.cursor = "not-allowed";

        btn.classList.remove("hover:bg-white", "hover:shadow-[2px_2px_black]");
        btn.classList.add("bg-black", "text-white", "font-medium");
      }

      const enableSelection = (btn, newHrFormat) => {
        btn.classList.add("hover:bg-white", "hover:shadow-[2px_2px_black]");

        btn.addEventListener("click", () => {
          localStorage.setItem("hour-format", newHrFormat);
          window.location.replace("/");
        }, { once: true });
      }

      if (hourFormat === "24h") {
        disableSelection(btn24h), enableSelection(btn12h, "12h");
      } else {
        disableSelection(btn12h), enableSelection(btn24h, "24h");
      }

      setHoverTargetWidths();
      updateDigitalClock(hourFormat);
      setInterval(() => updateDigitalClock(hourFormat), 1000);
    }


    else if (params.get("clock") === "analog") {
      updateAnalogClock();
      setInterval(updateAnalogClock, 1000);
    }
  });
})();
