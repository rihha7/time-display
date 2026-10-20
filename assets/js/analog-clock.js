(() => {
  window.addEventListener("DOMContentLoaded", () => {
    const params = new URLSearchParams(window.location.search);

    if (params.get("clock") === "analog") {
      const digitalClock = document.getElementById("digital-display");
      const hourHand = document.getElementById("hour-hand");
      const minuteHand = document.getElementById("minute-hand");
      const secondHand = document.getElementById("second-hand");


      const updateClock = () => {
        // 90 deg = 15min, 90/15 = multiplier = 6
        const now = new Date();
        const hours = String(now.getHours()).padStart(2, "0");
        const minutes = String(now.getMinutes()).padStart(2, "0");

        // update digital display
        digitalClock.textContent = `${hours}:${minutes}`;

        // update analog clock
        const hour12 = now.getHours() % 12 || 12;
        hourHand.style.rotate = `${(hour12 * 30) + (0.5 * now.getMinutes())}deg`;
        minuteHand.style.rotate = `${now.getMinutes() * 6}deg`;
        secondHand.style.rotate = `${now.getSeconds() * 6}deg`;
      };

      updateClock();
      setInterval(updateClock, 1000);
    };
  });
})();
