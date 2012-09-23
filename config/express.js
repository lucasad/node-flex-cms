module.exports = function(app) {
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
      res.render("error", {title: "HTTP 500: Looks like our server gnomes are on strike", error: err});
    });
  });

app.configure('development', function(){
  app.locals.pretty = true;
  app.use(express.errorHandler({ dumpExceptions: true, showStack: true })); 
});
}