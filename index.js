var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var config = require('./oauth.js');
var passport = require('passport');
var expressSession = require('express-session');
var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
var Sequelize = require('sequelize');

var sql = new Sequelize(process.env.DATABASE_URL);

var User = sql.define('user', {
  id: {
    type: Sequelize.STRING,
    field: 'id',
    primaryKey: true
  }
}, { freezeTableName: true } );
User.sync();

passport.use(new GoogleStrategy(config.google, function(accessToken, refreshToken, profile, done) {
  User.findAll({
    where: {
      id: profile.id
    }
  }).then(function(result) {
    if (result.length > 0) {
      done(null, profile);
    } else {
      done(null, false);
    }
  });
}));
passport.serializeUser(function(user, done) {
  done(null, user);
});
passport.deserializeUser(function(user, done) {
  done(null, user);
});

app.use(bodyParser.json());       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
}));
app.use(expressSession({
  secret: "keyboard cat",
  resave: true,
  saveUninitialized: false
}));

app.set('port', (process.env.PORT || 5000));

app.use(express.static(__dirname + '/public'));
app.use(passport.initialize());
app.use(passport.session());

// views is directory for all template files
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

app.get('/', function(request, response) {
  response.render('pages/index');
});

data = [];

function whenAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect("/champion-login");
}

app.get('/dojo-champions', whenAuthenticated, function(request, response) {
  response.render('pages/dojo-champions', { data: data });
});

app.get('/champion-login', passport.authenticate('google', { scope: 'https://www.googleapis.com/auth/userinfo.email' }), function(req, res) {
});
app.get('/champion-login/callback', passport.authenticate('google', { failureRedirect: '/' }), function(req, res) {
  res.redirect('/dojo-champions');
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
  res.redirect("/");
});
