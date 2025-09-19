// NOTE: Hamburger menu is handled by your global script.js.
// This file just handles the contact form + FAQ accordion + year.

(function () {
  // ---- Footer year
  var yearNow = document.getElementById('yearNow');
  if (yearNow) yearNow.textContent = new Date().getFullYear();

  // ---- Contact form validation + localStorage
  var form   = document.getElementById('contactForm');
  var msgBox = document.getElementById('contactMsg');

  function showMsg(text, ok) {
    if (!msgBox) return;
    msgBox.textContent = text;
    msgBox.style.color = ok ? '#1aa037' : '#c0392b';
  }

  function validEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }

  if (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();

      var name    = (document.getElementById('name').value || '').trim();
      var email   = (document.getElementById('email').value || '').trim();
      var message = (document.getElementById('message').value || '').trim();

      if (!name || !email || !message) {
        showMsg('Please fill out all fields.', false);
        return;
      }
      if (!validEmail(email)) {
        showMsg('Please enter a valid email address.', false);
        return;
      }
      if (message.length < 5) {
        showMsg('Message is too short.', false);
        return;
      }

      // Save to localStorage
      var key   = 'contactMessages';
      var store = JSON.parse(localStorage.getItem(key) || '[]');
      store.push({ name: name, email: email, message: message, at: new Date().toISOString() });
      localStorage.setItem(key, JSON.stringify(store));

      showMsg('Thanks! Your message has been sent.', true);
      form.reset();
    });
  }

  // ---- FAQ accordion
  var qs = document.querySelectorAll('.faq-q');
  qs.forEach(function (btn) {
    btn.addEventListener('click', function () {
      var answer = btn.nextElementSibling;
      var open   = btn.getAttribute('aria-expanded') === 'true';
      btn.setAttribute('aria-expanded', String(!open));
      if (answer) {
        if (answer.hasAttribute('hidden')) {
          answer.removeAttribute('hidden');
        } else {
          answer.setAttribute('hidden', '');
        }
      }
    });
  });
})();
