// Music page helpers. Works for every song automatically, so you never edit this file.

// 1) Rewind / forward buttons: <button data-skip="-10"> and <button data-skip="10">
document.querySelectorAll('[data-skip]').forEach(function (button) {
  button.addEventListener('click', function () {
    var media = button.closest('.song').querySelector('audio, video');
    var newTime = media.currentTime + Number(button.dataset.skip);
    var endTime = Number.isFinite(media.duration) ? media.duration : newTime;
    media.currentTime = Math.max(0, Math.min(endTime, newTime));
  });
});

// Preview buttons start or pause the media belonging to their song.
document.querySelectorAll('[data-preview]').forEach(function (button) {
  var song = button.closest('.song');
  var media = song.querySelector('audio, video');
  var status = song.querySelector('.preview-status');

  button.addEventListener('click', function () {
    if (media.paused) {
      status.textContent = '';
      media.play().catch(function () {
        status.textContent = 'Unable to play this song. Check that the audio file is available.';
      });
    } else {
      media.pause();
    }
  });

  media.addEventListener('play', function () {
    button.textContent = 'Pause preview';
  });
  media.addEventListener('pause', function () {
    button.textContent = 'Preview';
  });
  media.addEventListener('ended', function () {
    button.textContent = 'Preview';
  });
  media.addEventListener('error', function () {
    status.textContent = 'Unable to load this song. Check that the audio file is available.';
  });
});

// When one song starts, pause all the others.
document.querySelectorAll('audio, video').forEach(function (media) {
  media.addEventListener('play', function () {
    document.querySelectorAll('audio, video').forEach(function (other) {
      if (other !== media) other.pause();
    });
  });
});
