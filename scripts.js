let scrollY = 0;

// scripts.js – gepflegt & funktionsbewahrend optimiert
// Funktionen: Tab-Wechsel, Popups, Mail-Erzeugung

window.showTab = function(id, el) {
  document.querySelectorAll('.tab-button').forEach(btn => btn.classList.remove('active'));
  el.classList.add('active');
  document.querySelectorAll('.tab-content').forEach(tab => tab.classList.remove('active'));
  document.getElementById(id).classList.add('active');
};

window.openPopup = function(type) {
  const popup = document.getElementById('popup-' + type);
  popup.style.display = 'flex';
  requestAnimationFrame(() => popup.classList.add('visible'));

  scrollY = window.scrollY;
  document.body.style.position = 'fixed';
  document.body.style.top = `-${scrollY}px`;
  document.body.style.left = '0';
  document.body.style.right = '0';
};

window.closePopup = function() {
  document.querySelectorAll('.popup-modal').forEach(p => {
    p.classList.remove('visible');
    setTimeout(() => p.style.display = 'none', 300);
  });

  document.body.style.position = '';
  document.body.style.top = '';
  document.body.style.left = '';
  document.body.style.right = '';
  window.scrollTo(0, scrollY);
};

document.addEventListener('keydown', function (event) {
  if (event.key === 'Escape') {
    closePopup();
  }
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
        el.innerHTML = `<a class="music-link" href="mailto:${decoded}">${decoded}</a>`;
      }
    });
  }
})();

document.addEventListener('DOMContentLoaded', () => {
  // Tab-Wechsel
  document.querySelectorAll('[data-tab]').forEach(btn => {
    btn.addEventListener('click', () => {
      showTab(btn.dataset.tab, btn);
    });
  });

  // Popups öffnen
  document.querySelectorAll('[data-popup]').forEach(el => {
    el.addEventListener('click', () => {
      openPopup(el.dataset.popup);
    });
  });

  // Popups schließen
  document.querySelectorAll('.close-popup').forEach(el => {
    el.addEventListener('click', closePopup);
  });
});
