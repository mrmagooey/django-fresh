(function(){
  var interval;
  var attempts = 0;

  function startRefresh() {
    console.log('startRefresh')
    window.clearInterval(interval);
    attempts += 1;

    // rather than refresh right away, wait until the server is back to normal,
    // and then refresh
    var req = new XMLHttpRequest();
    req.open('GET', '__fresh__/', true);
    req.onload = function () {
      if (req.readyState == 4) { // done
        console.log('reload');
        location.reload(true);
      }
    }
    req.onerror = function(e) {
      console.log('startRefresh onerror', e);
      // retry for 10s, then give up
      if (attempts < 10) {
        window.setTimeout(startRefresh, 1000);
      }
    };
    req.send();
  }

  function checkRefresh() {
    console.log('checkRefresh')
      var req = new XMLHttpRequest();

      req.open('GET', '/__fresh__/', true);
      req.onload = function () {
        if (req.readyState == 4) { // done
          try {
            var fresh = JSON.parse(req.responseText).fresh;
            if (fresh) startRefresh();
          } catch (e) {
            startRefresh();
          }
        }
      };
      req.onerror = function(e) {
        console.log('checkRefresh onerror', e);
        startRefresh();
      };
      req.send();
  }

  interval = window.setInterval(checkRefresh, 1000);
})();
