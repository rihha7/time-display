(() => {
  window.addEventListener("DOMContentLoaded", () => {
    const params = new URLSearchParams(window.location.search);

    if (params.get("clock") === "digital") {
      const timeZone = document.getElementById("timezone");
      const intlTimeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
      timeZone.textContent = intlTimeZone.match(/\/(.*)/)[1].toLowerCase();
    }
    
  });
})();
