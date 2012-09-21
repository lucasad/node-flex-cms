
/**
 * Module dependencies.
 */

 var express = require('express')
 , page = require('./routes/page')
 , edit = require('./routes/edit')
 , auth = require("./middleware/auth")
 , http = require('http')
 , cons = require('consolidate')
 , path = require('path');

 mongo = require('mongodb'),
 db = new mongo.Db('saintstorch',
  new mongo.Server("127.0.0.1", 27017),
  {native_parser:true});
 db.open(function(){});
 pages = db.collection('pages');
 users = db.collection('users');

 templates = require('./templates.json')

 var app = express();
 var hbs = require('hbs')

 app.configure(function(){
  app.set('port', process.env.PORT || 3000);
  app.engine('jade', cons.jade);
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');
  app.use(express.favicon(__dirname + '/public/favicon.ico'));
  app.use(express.logger('dev'));
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(express.cookieParser('your secret here'));
  app.use(express.session({secret: "tqbf"}));
  app.use(auth.check);
  app.use(app.router);
  app.use(express.static(path.join(__dirname, 'public')));
  app.use(function(req, res, next){
    res.status(404);
    res.render("error", {title: "HTTP 404: The document you reqested could not be found", error: "<img style=\"display:block;margin:auto\" src=\"/images/404.png\" />"});
  });
  app.use(function(err, req, res, next){
    console.log(err);
    res.status(500);
    res.render("error", {title: "HTTP 500 Looks like our server gnomes are on strike", error: err});
  });
});

app.configure('development', function(){
  app.locals.pretty = true;
  app.use(express.errorHandler({ dumpExceptions: true, showStack: true })); 
});

app.get('/', page);
app.get('/login', auth.page);
app.post('/login', auth.login);
app.post('/logout', auth.logout);
app.get("/:page", page);
app.get("/edit/:page", edit.get);
app.post("/edit/:page", edit.post);

http.createServer(app).listen(app.get('port'), function(){
  console.log("Express server listening on port " + app.get('port'));
});
