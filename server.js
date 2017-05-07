var express = require('express')
var path = require("path");
var app = express();

var months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'Octobre', 'November', 'December'];

app.get('/timestamp', function (req, res) {
  res.sendFile('/home/ubuntu/workspace/timestamp/hello.html')
})

app.set('view engine', 'jade');
app.set('views', path.join(__dirname, 'templates'));

app.get('/timestamp/:date', function (req, res) {
  //
  if (!req.params.date.match(/[a-z]/i) && req.params.date.length == 10) {var date = new Date(parseInt(req.params.date + "000")); var dateResult = {"unix": parseInt(req.params.date + "000"), "natural": months[date.getMonth()] + " " + date.getDate() + ", " + date.getFullYear()}
res.render('index', {date: JSON.stringify(dateResult)});    
  }
  else {
    if (req.params.date.split(" ").length == 3) {var split = req.params.date.split(" ")};
  if (req.params.date.split("%20").length == 3) {var split = req.params.date.split("%20"); console.log("split")};
  if (split){
    if (months.indexOf(split[0]) > -1 && parseInt(split[1]) > 0 && parseInt(split[1]) < 32 && split[2].length == 4) 
    {var date = new Date(parseInt(split[2]), months.indexOf(split[0]), parseInt(split[1]))
    var dateResult = {"unix": date.getTime(), "natural": months[date.getMonth()] + " " + date.getDate() + ", " + date.getFullYear()}
     res.send(JSON.stringify(dateResult)) 
    }
  }
}
  //res.send(req.params.date)
})

app.listen(8080, function () {
  console.log('Example app listening on port 8080!')
})