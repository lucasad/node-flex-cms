var bcrypt = require('bcrypt');

module.exports.check = function(req, res, next) {
  var path = req.path.replace(/^\/+/, '').replace(/\/+$/, '').split('/');

  if(req.session.user)
    return next();

  switch(path[0]) {
    case "edit":
      res.redirect("/login?referer=" + req.path)
      return;
      break;
    case "admin":
      res.redirect("/login?referer=" + req.path)
      return;
      break;
  }
  return next();
}

module.exports.page = function(req, res) {
  context = req.query;
  context.title = "Login"  
  res.render('login', req.query);
}

module.exports.login = function(req, res, next) {
  users.findOne({username: req.body.username}, function(err, user) {
  if(err)
    return next(err);

    bcrypt.compare(req.body.passwd, user.passwd, function(err, valid) {
      if(err)
        return next(err);

      if(!valid)
        res.render("login", {title: "Login", invalid:true, referer: req.body.referer});

      req.session.user = user.username;

      if(req.body.referer)
        res.redirect(req.body.referer);
      else
        res.redirect('/');
    });
  });
}

module.exports.logout = function(req, res) {
  
}
