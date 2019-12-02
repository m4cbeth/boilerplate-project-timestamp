// server.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});

app.get("/api/timestamp", function(req, res, next){
  res.json({ unix: Date.now(), utc: new Date().toUTCString() });
});

app.get("/api/timestamp/:time", function(req, res){
  const inputTime = req.params.time;
    
  if (/\d{5,}/.test(inputTime)) {
    var utc = new Date(parseInt(inputTime)).toUTCString();
    res.json({unix: parseInt(inputTime), utc: utc});
    
  } else if (/\d{4}-\d{1,2}-\d{1,2}/.test(inputTime)) {
    var utcTime = new Date(inputTime).toUTCString();
    var unixTest = Date.parse(inputTime);
    res.json({unix: unixTest, "utc": utcTime})
    
  } else {
    res.json({"error": "Invalid Date"})
  }
});


// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
