// main.js -- index page behavior
document.addEventListener('DOMContentLoaded', () => {
  const yesBtn = document.getElementById('yesBtn');
  const noBtn = document.getElementById('noBtn');
  const message = document.getElementById('message');
  const controls = document.getElementById('controls');

  yesBtn.addEventListener('click', () => {
    // navigate to yes.html (a separate page with the player)
    window.location.href = 'yes.html';
  });

  noBtn.addEventListener('click', () => {
    // show "またね。" and provide a simple way to go back (reset)
    controls.style.display = 'none';
    message.textContent = 'またね。';
    // add a small "戻る" button so the user can go back to choices
    const back = document.createElement('button');
    back.textContent = '戻る';
    back.className = 'btn';
    back.style.marginTop = '12px';
    back.addEventListener('click', () => {
      controls.style.display = '';
      message.textContent = '';
      back.remove();
    });
    message.appendChild(document.createElement('div')).appendChild(back);
  });
});
