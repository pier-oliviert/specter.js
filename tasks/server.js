const Express = require('express');
const EJS     = require('ejs');

require('../node/assets.js');

var app = new Express();

app.use('/assets', Express.static('assets'));
app.get('/', function(req, res) {
  EJS.renderFile('../test/index.html', {}, function(err, str) {
    console.log(err);
    res.send(str);
  });
});

app.listen(8080, function () {
  console.log('Example app listening on port 3000!');
});
