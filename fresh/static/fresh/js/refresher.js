(function(){
  function doRefresh() {
    console.log('django-fresh: calling location.reload(true)...')
    setTimeout(function() { location.reload(true); }, 1000);
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
