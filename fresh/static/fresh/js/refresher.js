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
        window.location.reload(true);
      }
    }
    req.onerror = function(e) {
      console.log('startRefresh onerror', e);
      // retry, slower and slower
      if (attempts <= 100) {
        window.setTimeout(startRefresh, 1000 * attempts);
      } else {
        document.open('text/html');
        document.write('<!DOCTYPE HTML><html><head><meta http-equiv="Content-Type" content="text/html; charset=utf-8"><title>Timeout</title></head><body><h1>DJango Fresh Timeout</h1><p><a href="https://github.com/grokstyle/django-fresh">Django Fresh</a> detected a change, tried to restart, but could not reach the server after 100 attempts.</p><p>Manually refresh when the server is up again.</p></body></html>');
        document.close();
      }
    };
    req.send();
  }

  function checkRefresh() {
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
