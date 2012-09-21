module.exports.get = function(req, res) {
	if(!req.params.page)
		req.params.page = 'index';
	
	pages.findOne({name: req.params.page}, function(err, data,next) {
		if(err)
     return next(err);

   if(!data)
     return next();

   data.properties.title = data.title;

   var property;
   for(property in data.properties) {
     if(templates[data.template]["properties"][property] == "html")
      data.properties[property] = '<textarea name="' + property +'" id="' + property +'">' + data.properties[property] + '</textarea>';
    else
      data.properties[property] = '<input type="text" name="' + property +'" value="' + data.properties[property] + '" />';
  }

  data.properties.head = "<link rel=\"stylesheet\" href=\"/stylesheets/redactor.css\" />\n<script src=\"/javascripts/redactor.js\"></script>\n<script type\"text/javascript\">$(document).ready(function(){$('textarea').redactor();});</script>";
  data.properties.edit = true;

  res.render(data.template, data.properties);
});
};

module.exports.post = function(req, res, next) {
  pages.findOne({name: req.params.page}, function(err, data) {
    if(err)
      return next(err);

    data.properties = req.body;

    pages.update({name: req.params.page}, data, {safe:true}, function(err, result) {
      if(err)
        return next(err);
    });
  });

  res.redirect('/' + req.params['page'])
};