(function(){
  function doRefresh() {
    console.log('django-fresh: detected change')
    // rather than refresh right away, wait until the server is back to normal by pinging
    while (true) {
      try {
        var xmlHttp = new XMLHttpRequest();
        xmlHttp.open('GET', '__fresh__/', false); // false for synchronous request
        xmlHttp.send();
        console.log('django-fresh: reload')
        location.reload(true);
        return;
      } catch (e) {
        // ignore
      }
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

  setInterval(checkRefresh, 1000);
})();
