// player.js -- yes.html behavior (play/pause/restart/seek)
document.addEventListener('DOMContentLoaded', () => {
  const audio = document.getElementById('audio');
  const playBtn = document.getElementById('playBtn');
  const pauseBtn = document.getElementById('pauseBtn');
  const restartBtn = document.getElementById('restartBtn');
  const seek = document.getElementById('seek');
  const currentTime = document.getElementById('currentTime');
  const durationEl = document.getElementById('duration');

  let rafId = null;

  function formatTime(sec) {
    if (isNaN(sec)) return '0:00';
    const s = Math.floor(sec % 60).toString().padStart(2,'0');
    const m = Math.floor(sec / 60);
    return m + ':' + s;
  }

  // update duration when metadata loaded
  audio.addEventListener('loadedmetadata', () => {
    durationEl.textContent = formatTime(audio.duration);
  });

  function updateSeek() {
    if (!isNaN(audio.duration) && audio.duration > 0) {
      const pct = (audio.currentTime / audio.duration) * 100;
      seek.value = pct;
      currentTime.textContent = formatTime(audio.currentTime);
    }
    rafId = requestAnimationFrame(updateSeek);
  }

  playBtn.addEventListener('click', async () => {
    try {
      await audio.play();
      // start updating seek
      if (!rafId) updateSeek();
    } catch (err) {
      console.error('play failed', err);
      alert('再生できませんでした。タップして許可する必要がある場合があります。');
    }
  });

  pauseBtn.addEventListener('click', () => {
    audio.pause();
    if (rafId) { cancelAnimationFrame(rafId); rafId = null; }
  });

  restartBtn.addEventListener('click', () => {
    audio.currentTime = 0;
    audio.play();
    if (!rafId) updateSeek();
  });

  // seek input (0-100)
  seek.addEventListener('input', (e) => {
    if (!isNaN(audio.duration) && audio.duration > 0) {
      const pct = Number(seek.value) / 100;
      audio.currentTime = pct * audio.duration;
      currentTime.textContent = formatTime(audio.currentTime);
    }
  });

  // stop loop when audio ends
  audio.addEventListener('ended', () => {
    if (rafId) { cancelAnimationFrame(rafId); rafId = null; }
    seek.value = 0;
    currentTime.textContent = formatTime(0);
  });

  // pause/cleanup on page hide
  window.addEventListener('pagehide', () => {
    audio.pause();
    if (rafId) { cancelAnimationFrame(rafId); rafId = null; }
  });
});
