(function () {
  // Track only the production tour website.
 if (window.location.hostname !== 'tour.queuemetrics.com') {
   return;
  }
  
  var _paq = window._paq = window._paq || [];

  _paq.push(['trackPageView']);
  _paq.push(['enableLinkTracking']);

  var trackerUrl = 'https://matomo.loway.ch/';

  _paq.push(['setTrackerUrl', trackerUrl + 'matomo.php']);
  _paq.push(['setSiteId', '13']);

  var documentRef = document;
  var script = documentRef.createElement('script');
  var firstScript = documentRef.getElementsByTagName('script')[0];

  script.type = 'text/javascript';
  script.async = true;
  script.src = trackerUrl + 'matomo.js';

  firstScript.parentNode.insertBefore(script, firstScript);
})();