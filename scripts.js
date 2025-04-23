// Tabs effizienter verwalten
let tabButtons, tabContents;

document.addEventListener('DOMContentLoaded', () => {
  const nav = document.querySelector('nav');
  if (nav) {
    nav.addEventListener('wheel', function(e) {
      if (e.deltaY !== 0) {
        e.preventDefault();
        nav.scrollLeft += e.deltaY;
      }
    });

    tabButtons = nav.querySelectorAll('.tab-button');
    tabContents = document.querySelectorAll('.tab-content');

    tabButtons.forEach((btn, index) => {
      btn.addEventListener('click', () => {
        const id = btn.getAttribute('data-tab');
        showTab(id, btn);
      });

      btn.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowRight') {
          e.preventDefault();
          const next = tabButtons[(index + 1) % tabButtons.length];
          next.focus();
        } else if (e.key === 'ArrowLeft') {
          e.preventDefault();
          const prev = tabButtons[(index - 1 + tabButtons.length) % tabButtons.length];
          prev.focus();
        } else if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          const id = btn.getAttribute('data-tab');
          showTab(id, btn);
        }
      });

      btn.addEventListener('focus', () => {
        btn.scrollIntoView({behavior: 'smooth', inline: 'nearest', block: 'nearest'});
      });
    });

    // Default-Tab aktivieren, falls einer vorausgewählt ist
    const defaultTab = document.querySelector('.tab-button.active');
    const defaultId = defaultTab?.getAttribute('data-tab');
    if (defaultTab && defaultId) showTab(defaultId, defaultTab);
  }

  // Popup-Trigger binden
  document.querySelectorAll('[data-popup]').forEach(link => {
    link.addEventListener('click', () => {
      const type = link.getAttribute('data-popup');
      openPopup(type);
    });
  });
});

window.showTab = function(id, clickedButton) {
  const currentActiveButton = document.querySelector('.tab-button.active');
  const currentActiveContent = document.querySelector('.tab-content.active');

  if (currentActiveButton) {
    currentActiveButton.classList.remove('active');
    currentActiveButton.setAttribute('aria-selected', 'false');
  }
  if (currentActiveContent) {
    currentActiveContent.classList.remove('active');
    currentActiveContent.setAttribute('aria-hidden', 'true');
  }

  clickedButton.classList.add('active');
  clickedButton.setAttribute('aria-selected', 'true');
  const targetContent = document.getElementById(id);
  if (targetContent) {
    targetContent.classList.add('active');
    targetContent.setAttribute('aria-hidden', 'false');
  }
};

window.openPopup = function(type) {
  const popup = document.getElementById('popup-' + type);
  popup.style.display = 'flex';
  requestAnimationFrame(() => popup.classList.add('visible'));
  document.documentElement.style.overflow = 'hidden';
  // statt body
};

window.closePopup = function() {
  document.querySelectorAll('.popup-modal').forEach(p => {
    p.classList.remove('visible');
    setTimeout(() => p.style.display = 'none', 300);
  });
  document.documentElement.style.overflow = 'auto';
  // statt body
};

document.addEventListener('keydown', function (event) {
  if (event.key === 'Escape') {
    closePopup();
  }
});

requestAnimationFrame(() => {
  const releaseDate = new Date("2025-04-21T01:00:00").getTime();
  const redirectURL = "https://open.spotify.com/intl-de/artist/3F4vfyQQDgEg3jF3qPdeDK";
  const wrapper = document.getElementById("countdown-wrapper");
  const presaveContent = document.getElementById("presave-content");
  const countdownElement = document.getElementById("countdown");
  const message = document.getElementById("countdown-message");

  const timer = setInterval(function() {
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
(function() {
  const coded = [112,115,121,99,104,51,100,51,108,105,99,120,64,103,109,97,105,108,46,99,111,109];
  const decoded = coded.map(c => String.fromCharCode(c)).join("");
  const ids = ["mail-link"];
  const isHuman = !/bot|crawl|spider|curl|wget|python|headless/i.test(navigator.userAgent);
  if (isHuman) {
    ids.forEach(id => {
      const el = document.getElementById(id);
      if (el) {
        el.innerHTML = `<a class=\"music-link\" href=\"mailto:${decoded}\">${decoded}</a>`;
      }
    });
  }
})();

