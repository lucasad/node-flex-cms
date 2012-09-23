
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

 settings = require('./settings.json');
 templates = require('./templates.json');

 var app = express();
 require('./config/express')(app);
 require('./config/db')(settings);

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
