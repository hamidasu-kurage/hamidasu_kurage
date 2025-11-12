document.addEventListener('DOMContentLoaded', () => {
  const yesInput = document.getElementById('choice_yes');
  const noInput = document.getElementById('choice_no');
  const yesLabel = document.querySelector('label[for="choice_yes"]');
  const noLabel = document.querySelector('label[for="choice_no"]');
  const message = document.getElementById('message');
  const audio = document.getElementById('audio');
  const controls = document.getElementById('controls');

  // helper to set aria-pressed on labels for screen readers
  function setPressed(label, pressed){
    label.setAttribute('aria-pressed', pressed ? 'true' : 'false');
  }

  yesInput.addEventListener('change', async (e) => {
    if(!yesInput.checked) return;
    // mark states
    setPressed(yesLabel, true);
    setPressed(noLabel, false);

    message.textContent = '読み込み中…';
    try {
      await audio.play();
    } catch(err) {
      console.error('play failed', err);
      message.textContent = '再生に失敗しました（タップで許可が必要な場合があります）';
      return;
    }
  });

  noInput.addEventListener('change', (e) => {
    if(!noInput.checked) return;
    // stop audio if playing
    try{
      audio.pause();
      audio.currentTime = 0;
    }catch(e){}
    setPressed(noLabel, true);
    setPressed(yesLabel, false);

    // hide the radio controls and show "またね。"
    controls.style.display = 'none';
    message.textContent = 'またね。';
  });

  audio.addEventListener('playing', () => {
    document.documentElement.classList.add('playing');
    message.textContent = '再生中…';
  });
  audio.addEventListener('pause', () => {
    document.documentElement.classList.remove('playing');
  });
  audio.addEventListener('ended', () => {
    document.documentElement.classList.remove('playing');
    message.textContent = '再生が終わりました';
  });
  audio.addEventListener('error', (e) => {
    console.error('audio error', e);
    message.textContent = '音声を再生できませんでした';
  });

  // Ensure clicking label triggers behavior
  yesLabel.addEventListener('click', () => { yesInput.checked = true; yesInput.dispatchEvent(new Event('change')); });
  noLabel.addEventListener('click', () => { noInput.checked = true; noInput.dispatchEvent(new Event('change')); });
});
