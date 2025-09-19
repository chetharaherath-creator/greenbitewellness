// ===== Guided Breathing =====
const breathStartBtn = document.getElementById('breathStart');
const breathStopBtn  = document.getElementById('breathStop');
const breathCircle   = document.getElementById('breathCircle');
const breathPhase    = document.getElementById('breathPhase');

let breathingOn = false;
let breathTimeout;

function runBreathingCycle() {
  if (!breathingOn) return;

  // Inhale
  breathPhase.textContent = 'Inhale…';
  breathCircle.style.transform = 'scale(1.2)';

  breathTimeout = setTimeout(() => {
    if (!breathingOn) return;

    // Hold
    breathPhase.textContent = 'Hold…';

    breathTimeout = setTimeout(() => {
      if (!breathingOn) return;

      // Exhale
      breathPhase.textContent = 'Exhale…';
      breathCircle.style.transform = 'scale(1.0)';

      breathTimeout = setTimeout(() => {
        // Loop cycle again
        runBreathingCycle();
      }, 4000);

    }, 4000);
  }, 4000);
}

breathStartBtn.addEventListener('click', () => {
  if (breathingOn) return;
  breathingOn = true;
  runBreathingCycle();
});

breathStopBtn.addEventListener('click', () => {
  breathingOn = false;
  breathPhase.textContent = 'Ready?';
  breathCircle.style.transform = 'scale(1)';
  clearTimeout(breathTimeout);
});


// ===== Session Timer =====
const minsInput  = document.getElementById('mins');
const secsInput  = document.getElementById('secs');
const timerDisp  = document.getElementById('timerDisplay');

const startBtn   = document.getElementById('timerStart');
const pauseBtn   = document.getElementById('timerPause');
const resetBtn   = document.getElementById('timerReset');

const sessionCountEl = document.getElementById('sessionCount');
const clearCountBtn  = document.getElementById('clearCount');

let timer;
let remaining = 0;
let isRunning = false;

// Format time mm:ss
function format(t) {
  const m = Math.floor(t / 60);
  const s = t % 60;
  return `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
}

function setFromInputs() {
  const m = Math.max(0, parseInt(minsInput.value || '0', 10));
  const s = Math.max(0, parseInt(secsInput.value || '0', 10));
  remaining = m * 60 + s;
  timerDisp.textContent = format(remaining);
}
setFromInputs();

// Update display when user changes inputs
minsInput.addEventListener('input', setFromInputs);
secsInput.addEventListener('input', setFromInputs);

function tick() {
  if (remaining > 0) {
    remaining--;
    timerDisp.textContent = format(remaining);
  } else {
    clearInterval(timer);
    isRunning = false;
    pauseBtn.disabled = true;

    // Save completed session count
    const old = parseInt(localStorage.getItem('mind_sessions') || '0', 10);
    const now = old + 1;
    localStorage.setItem('mind_sessions', String(now));
    sessionCountEl.textContent = now;

    // Small flash effect
    timerDisp.style.background = '#e3f7ec';
    setTimeout(() => timerDisp.style.background = '', 500);
  }
}

startBtn.addEventListener('click', () => {
  if (isRunning) return;
  if (remaining <= 0) setFromInputs();
  timer = setInterval(tick, 1000);
  isRunning = true;
  pauseBtn.disabled = false;
});

pauseBtn.addEventListener('click', () => {
  if (!isRunning) return;
  clearInterval(timer);
  isRunning = false;
  pauseBtn.disabled = true;
});

resetBtn.addEventListener('click', () => {
  clearInterval(timer);
  isRunning = false;
  pauseBtn.disabled = true;
  setFromInputs();
});


// ===== Sessions Completed (localStorage) =====
function loadCount() {
  const c = parseInt(localStorage.getItem('mind_sessions') || '0', 10);
  sessionCountEl.textContent = c;
}
loadCount();

clearCountBtn.addEventListener('click', () => {
  localStorage.removeItem('mind_sessions');
  loadCount();
});
