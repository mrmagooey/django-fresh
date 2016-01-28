(function(){
  var interval;

  function startRefresh() {
    console.log('startRefresh')
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
    req.onerror = function(e) {
      console.log('startRefresh onerror', e);
      window.setTimeout(startRefresh, 500);
    };
  }

  function checkRefresh() {
    console.log('checkRefresh')
      var req = new XMLHttpRequest();

      req.open('GET', '/__fresh__/', true);
      req.onreadystatechange = function () {
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

  // poll every 500ms
  interval = window.setInterval(checkRefresh, 1000);
})();
