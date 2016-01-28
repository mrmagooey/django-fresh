(function(){
  function checkRefresh() {
      var req = new XMLHttpRequest();

      try {
        req.open('GET', '/__fresh__/', true);
        req.onreadystatechange = function () {
            if (req.readyState == 4) { // done
                var fresh = JSON.parse(req.responseText).fresh;
                if (fresh) location.reload();
            }
        };
        req.send();
      } catch (e) {
        console.log(e);
        location.reload();
      }
  }

  setInterval(checkRefresh, 1000);
})();
