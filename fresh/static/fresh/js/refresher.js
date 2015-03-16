function checkRefresh() {
    var req = new XMLHttpRequest();

    req.open('GET', '/fresh/', true);
    req.onreadystatechange = function () {
        if (req.readyState == 4) { // done
            var fresh = JSON.parse(req.responseText).fresh;
            if (fresh) location.reload();
        }
    };

    req.send();
}

function doPoll() {
    setInterval(  checkRefresh , 1000);
}

doPoll();

