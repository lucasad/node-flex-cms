module.exports = function(settings) {
  var mongo = require('mongodb'),
  var server = new mongo.Server(settings.database.host, settings.database.port);


  db = new mongo.Db(settings.database.name,
   ,
   (settings.database.native ?  : {}));

  db.open(function(data, err){
    if(data) {
      if(settings.database.user) { /* Need to authorize */
        data.authorize(settings.database.user, settings.database.pass, function(data, err) {
          if(data) {
            module.exports.pages = db.collection('pages');
            module.exports.users = db.collection('users');
          } else
          throw err;
        })
      } else { /* Just return the collections */
        module.exports.pages = db.collection('pages');
        module.exports.users = db.collection('users');
      }
    } else {
      throw err;
    }
  });
  module.exports.db = db;
};