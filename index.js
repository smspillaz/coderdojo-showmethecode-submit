var express = require('express');
var app = express();
var bodyParser = require('body-parser');

app.use(bodyParser.json());       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
}));

app.set('port', (process.env.PORT || 5000));

app.use(express.static(__dirname + '/public'));

// views is directory for all template files
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

app.get('/', function(request, response) {
  response.render('pages/index');
});

data = [];

app.get('/view-submissions', function(request, response) {
  response.render('pages/view-projects', { data: data });
});

app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});

app.get('/Post', function(req, res) {
    data.push({
        name: req.param('name'),
        project: req.param('project'),
        url: 'http://' + req.param('url')
    });
  console.log(JSON.stringify(data));
  res.redirect("/");
});
