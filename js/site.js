(function () {
  'use strict';

  // Edit these if the redirect should go somewhere else
  var LATEST_DEVFEST_YEAR = 2026;
  var DEVFEST_URL = 'https://' + LATEST_DEVFEST_YEAR + '.devfest-berlin.de';
  var COUNTDOWN_SECONDS = 5;

  var displayHost = DEVFEST_URL.replace(/^https?:\/\//, '');
  var timerId = null;
  var stopped = false;

  function createLink() {
    var link = document.createElement('a');
    link.href = DEVFEST_URL;
    link.textContent = displayHost;
    return link;
  }

  function renderCountdownText(textEl, seconds) {
    var unit = seconds === 1 ? 'second' : 'seconds';
    textEl.replaceChildren(
      document.createTextNode("You'll be redirected to "),
      createLink(),
      document.createTextNode(' in ' + seconds + ' ' + unit + '...')
    );
  }

  function renderCancelledText(textEl) {
    textEl.replaceChildren(
      document.createTextNode('Redirect cancelled. You can still visit '),
      createLink(),
      document.createTextNode('.')
    );
  }

  document.addEventListener('DOMContentLoaded', function () {
    var textEl = document.querySelector('#redirect_text');
    var progressEl = document.querySelector('#redirect_progress');
    var controlsEl = document.querySelector('#redirect_controls');
    var cancelBtn = document.querySelector('#redirect_cancel');

    if (!textEl || !progressEl || !controlsEl || !cancelBtn) {
      return;
    }

    progressEl.hidden = false;
    controlsEl.hidden = false;

    function tick(remaining) {
      if (stopped) {
        return;
      }

      var progress = ((COUNTDOWN_SECONDS - remaining) / COUNTDOWN_SECONDS) * 100;
      progressEl.value = progress;

      if (remaining <= 0) {
        window.location.assign(DEVFEST_URL);
        return;
      }

      renderCountdownText(textEl, remaining);
      timerId = window.setTimeout(function () {
        tick(remaining - 1);
      }, 1000);
    }

    cancelBtn.addEventListener('click', function () {
      stopped = true;
      if (timerId !== null) {
        window.clearTimeout(timerId);
        timerId = null;
      }
      progressEl.hidden = true;
      controlsEl.hidden = true;
      renderCancelledText(textEl);
    });

    tick(COUNTDOWN_SECONDS);
  });
})();
