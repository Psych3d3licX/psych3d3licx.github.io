window.showTab = function (id, el) {
  document.querySelectorAll('.tab-button').forEach(btn => btn.classList.remove('active'));
  el.classList.add('active');
  document.querySelectorAll('.tab-content').forEach(tab => tab.classList.remove('active'));
  document.getElementById(id).classList.add('active');
};

window.openPopup = function (type) {
  const popup = document.getElementById('popup-' + type);
  popup.style.display = 'flex';
  requestAnimationFrame(() => popup.classList.add('visible'));
  document.documentElement.style.overflow = 'hidden'; // nutzt <html> statt <body>
};

window.closePopup = function () {
  document.querySelectorAll('.popup-modal').forEach(p => {
    p.classList.remove('visible');
    setTimeout(() => p.style.display = 'none', 300);
  });
  document.documentElement.style.overflow = 'auto';
};

document.addEventListener('keydown', function (event) {
  if (event.key === 'Escape') {
    closePopup();
  }
});

// Verzögert ausgeführter Startcode
requestAnimationFrame(() => {
  const defaultTab = document.querySelector('.tab-button.active');
  const match = defaultTab?.getAttribute('onclick')?.match(/'([^']+)'/);
  const defaultId = match?.[1];
  if (defaultId) showTab(defaultId, defaultTab);

  const releaseDate = new Date("2025-04-21T01:00:00").getTime();
  const redirectURL = "https://open.spotify.com/intl-de/artist/3F4vfyQQDgEg3jF3qPdeDK";
  const wrapper = document.getElementById("countdown-wrapper");
  const presaveContent = document.getElementById("presave-content");
  const countdownElement = document.getElementById("countdown");
  const message = document.getElementById("countdown-message");

  const timer = setInterval(function () {
    if (!document.getElementById("presave").classList.contains("active")) return;

    const now = new Date().getTime();
    const distance = releaseDate - now;

    if (distance < 0) {
      message.textContent = "Jetzt auf Spotify streamen.";
      presaveContent.style.display = "none";
      countdownElement.innerHTML = "";
      wrapper.onclick = () => window.open(redirectURL, '_blank');
      wrapper.style.cursor = "pointer";
      clearInterval(timer);
      return;
    }

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    message.textContent = "Speichere jetzt vor – damit du's nicht verpasst!";
    presaveContent.style.display = "block";
    countdownElement.innerHTML = `${days}d ${hours}h ${minutes}m ${seconds}s`;
    wrapper.onclick = null;
    wrapper.style.cursor = "default";
  }, 1000);
});

// Mail-Dekodierung sofort
(function () {
  const coded = [112, 115, 121, 99, 104, 51, 100, 51, 108, 105, 99, 120, 64, 103, 109, 97, 105, 108, 46, 99, 111, 109];
  const decoded = coded.map(c => String.fromCharCode(c)).join("");
  const ids = ["mail-link"];
  const isHuman = !/bot|crawl|spider|curl|wget|python|headless/i.test(navigator.userAgent);
  if (isHuman) {
    ids.forEach(id => {
      const el = document.getElementById(id);
      if (el) {
        el.innerHTML = `<a class="music-link" href="mailto:${decoded}">${decoded}</a>`;
      }
    });
  }
})();
