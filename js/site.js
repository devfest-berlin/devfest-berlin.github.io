// Global variables

// edit this if the redirect should go somewhere else
var SITE_latestDevFestYear = 2015;
var SITE_devfestUrl = "https://" + SITE_latestDevFestYear + ".devfest-berlin.de";

var SITE_countdownSeconds = 5;
var SITE_countdownStopped = false;

// do countdown
function redirectToLatest() {
  window.location = SITE_devfestUrl;
}

function updateCountdownText(seconds) {

  text = 'You\'ll be redirected to <a href="{0}">{1}</a> in {2} seconds...';

  document
    .querySelector('#redirect_text')
    .innerHTML = text.format(
      SITE_devfestUrl,
      SITE_devfestUrl.replace(/https?:\/\//g, ''),
      seconds
  );
}

function countdown(countdownSeconds) {

  progress = (SITE_countdownSeconds - countdownSeconds) * (100 / SITE_countdownSeconds)

  if (SITE_countdownStopped) {
    console.log("Countdown stopped");
    return;
  }
  else if (progress > 100) {
    console.log("Redirecting now...");
    redirectToLatest();
    return;
  }

  updateCountdownText(countdownSeconds);

  document
    .querySelector('#redirect_progress')
    .MaterialProgress.setProgress(progress);


  setTimeout(function() {
    countdown(--countdownSeconds)
  }, 1000);
}

window.addEventListener('load', function() {
  countdown(SITE_countdownSeconds)
});



// cancel countdown
document
  .querySelector('#redirect_cancel')
  .addEventListener('click', function() {

    SITE_countdownStopped = true;

    document
      .querySelector('#redirect_wrap')
      .style.display = 'none';
  });


// First, checks if it isn't implemented yet.
if (!String.prototype.format) {
  String.prototype.format = function() {
    var args = arguments;
    return this.replace(/{(\d+)}/g, function(match, number) {
      return typeof args[number] != 'undefined' ? args[number] : match;
    });
  };
}
