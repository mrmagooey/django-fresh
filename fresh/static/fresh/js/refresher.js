(function(){
  var interval;

  function startRefresh() {
    window.clearInterval(interval);

    // rather than refresh right away, wait until the server is back to normal,
    // and then refresh
    var req = new XMLHttpRequest();
    req.open('GET', '__fresh__/', true);
    req.onreadystatechange = function () {
      if (req.readyState == 4) { // done
        location.reload(true);
      }
    }
    req.onerr = function() {
      window.setTimeout(startRefresh, 500);
    }
  }

  function checkRefresh() {
      var req = new XMLHttpRequest();

      req.open('GET', '/__fresh__/', true);
      req.onreadystatechange = function () {
          if (req.readyState == 4) { // done
              var fresh = JSON.parse(req.responseText).fresh;
              if (fresh) startRefresh()
          }
      };
      req.onerr = startRefresh;
      req.send();
  }

  // poll every 500ms
  interval = window.setInterval(checkRefresh, 500);
})();
