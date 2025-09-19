// ==============================
// Global: Hamburger menu toggle
// ==============================
document.addEventListener('DOMContentLoaded', function () {
  var menuBtn = document.getElementById('menuBtn');
  var mainNav = document.getElementById('mainNav');

  if (menuBtn && mainNav) {
    menuBtn.addEventListener('click', function () {
      var isOpen = mainNav.classList.toggle('open');
      menuBtn.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
    });

    // Optional: close menu when a link is tapped
    mainNav.addEventListener('click', function (e) {
      if (e.target.tagName === 'A' && mainNav.classList.contains('open')) {
        mainNav.classList.remove('open');
        menuBtn.setAttribute('aria-expanded', 'false');
      }
    });
  }
});

// ==============================
// Global: Footer year
// ==============================
document.addEventListener('DOMContentLoaded', function () {
  var yearNow = document.getElementById('yearNow');
  if (yearNow) yearNow.textContent = new Date().getFullYear();
});

// ==============================
// Home-only: Rotating hero quote
// (safe on other pages: guarded)
// ==============================
document.addEventListener('DOMContentLoaded', function () {
  var hero = document.getElementById('hero-quote');
  if (!hero) return;

  var quotes = [
    'Eat well, live well!',
    'Small steps, big changes.',
    'Healthy outside starts inside.',
    'Move daily, breathe deeply.',
    'Your health is your wealth.'
  ];

  var i = 0;
  setInterval(function () {
    i = (i + 1) % quotes.length;
    hero.textContent = quotes[i];
  }, 3000);
});

// =======================================
// Home-only: Health tips of the day (3x)
// (safe on other pages: guarded)
// =======================================
document.addEventListener('DOMContentLoaded', function () {
  var tipList   = document.getElementById('tipList');     // UL (3 tips)
  var tipOutput = document.getElementById('tipOutput');   // P (fallback 1 tip)
  if (!tipList && !tipOutput) return;

  var tips = [
    'Drink a glass of water right after you wake up.',
    'Add a handful of greens to one meal today.',
    'Stand up and stretch for 60 seconds each hour.',
    'Take a 10–15 minute walk after a meal.',
    'Swap one sugary drink for water or unsweetened tea.',
    'Practice deep breathing: 4s in • 4 hold • 4 out.',
    'Go to bed 30 minutes earlier tonight.',
    'Eat fruit instead of dessert once today.',
    'Check your posture—shoulders down and back.',
    'Write down three things you’re grateful for.',
    'Limit screen time before bed for better sleep.',
    'Add some nuts or seeds to your snack today.',
    'Smile more—it reduces stress hormones.',
    'Get at least 7–8 hours of quality sleep.'
  ];

  function dayOfYear(d) {
    var start = new Date(d.getFullYear(), 0, 0);
    var diff  = d - start;
    var oneDay = 1000 * 60 * 60 * 24;
    return Math.floor(diff / oneDay);
  }

  var idx = dayOfYear(new Date()) % tips.length;

  if (tipList) {
    tipList.innerHTML = '';
    for (var j = 0; j < 3; j++) {
      var li = document.createElement('li');
      li.textContent = tips[(idx + j) % tips.length];
      tipList.appendChild(li);
    }
  } else if (tipOutput) {
    tipOutput.textContent = tips[idx];
  }
});

// =======================================
// Global: Newsletter (localStorage demo)
// (safe on other pages: guarded)
// =======================================
document.addEventListener('DOMContentLoaded', function () {
  var FORM_KEY = 'newsletterEmails';

  function loadEmails() {
    try {
      var raw = localStorage.getItem(FORM_KEY);
      return raw ? JSON.parse(raw) : [];
    } catch (e) {
      console.warn('Could not read localStorage:', e);
      return [];
    }
  }

  function saveEmails(arr) {
    try {
      localStorage.setItem(FORM_KEY, JSON.stringify(arr));
    } catch (e) {
      console.warn('Could not write localStorage:', e);
    }
  }

  function isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }

  var form = document.getElementById('newsletterForm');
  var input = document.getElementById('newsletterEmail');
  var msg = document.getElementById('newsletterMsg');

  if (!form || !input) return;

  form.addEventListener('submit', function (e) {
    e.preventDefault();
    var email = (input.value || '').trim().toLowerCase();

    if (!email) {
      if (msg) msg.textContent = 'Please enter your email.';
      return;
    }
    if (!isValidEmail(email)) {
      if (msg) msg.textContent = 'Please enter a valid email address.';
      return;
    }

    var list = loadEmails();
    if (list.indexOf(email) !== -1) {
      if (msg) msg.textContent = 'You are already subscribed. Thank you!';
      return;
    }

    list.push(email);
    saveEmails(list);

    if (msg) msg.textContent = 'Subscribed!';
    input.value = '';

    form.classList.add('subscribed');
    setTimeout(function () { form.classList.remove('subscribed'); }, 1200);
  });

  // Debug helper to see saved emails in console
  console.log('Newsletter emails:', loadEmails());
});
