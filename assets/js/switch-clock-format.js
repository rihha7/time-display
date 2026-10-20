(() => {
  window.addEventListener("DOMContentLoaded", () => {
    // Set default clock format to analog
    let clockFormat = localStorage.getItem("clock-format");
    clockFormat = clockFormat ?? "analog";

    localStorage.setItem("clock-format", clockFormat);

    const url = new URL(window.location.href);
    url.searchParams.set("clock", clockFormat);
    window.history.replaceState({}, "", url);

    const analogBtn = document.getElementById("analog-btn");
    const digitalBtn = document.getElementById("digital-btn");

    const updateParam = e => {
      localStorage.setItem("clock-format", e.target.textContent);
    };

    if (clockFormat === "analog") {
      const analogClock = document.getElementById("analog-format");
      analogClock.classList.remove("hidden");
      digitalBtn.classList.remove("hidden");
      digitalBtn.addEventListener("click", updateParam, { once: true });

    } else if (clockFormat === "digital") {
      const digitalClock = document.getElementById("digital-format");
      digitalClock.classList.remove("hidden");
      analogBtn.classList.remove("hidden");
      analogBtn.addEventListener("click", updateParam, { once: true });
    }
  });
})();
