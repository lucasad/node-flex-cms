module.exports = function(req, res, next) {
  if(!req.params.page)
    req.params.page = 'index';

  pages.findOne({name: req.params.page}, function(err, data) {
    if(err)
      return next(err);
    if(!data)
      return next();

    data.properties.title = data.title;
    res.render(data.template, data.properties);
  });
}
