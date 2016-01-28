(function(){
  var interval;

  function doRefresh() {
    window.clearInterval(interval);

    // rather than refresh right away, wait until the server is back to normal,
    // and then refresh
    var xmlHttp = new XMLHttpRequest();
    try {
      xmlHttp.open('GET', '__fresh__/', true);
      req.onreadystatechange = function () {
        if (req.readyState == 4) { // done
          location.reload(true);
        }
      }
      xmlHttp.send();
    } catch (e) {
      window.setTimeout(doRefresh, 500);
    }
  }

  function checkRefresh() {
      var req = new XMLHttpRequest();

      try {
        req.open('GET', '/__fresh__/', true);
        req.onreadystatechange = function () {
            try {
              if (req.readyState == 4) { // done
                  var fresh = JSON.parse(req.responseText).fresh;
                  if (fresh) doRefresh()
              }
            } catch (e) {
              doRefresh();
            }
        };
        req.send();
      } catch (e) {
        doRefresh();
      }
  }

  // poll every 500ms
  interval = window.setInterval(checkRefresh, 500);
})();
