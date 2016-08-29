/**
 * Bootstrap
 * (sails.config.bootstrap)
 *
 * An asynchronous bootstrap function that runs before your Sails app gets lifted.
 * This gives you an opportunity to set up your data model, run jobs, or perform some special logic.
 *
 * For more information on bootstrapping your app, check out:
 * http://sailsjs.org/#!/documentation/reference/sails.config/sails.config.bootstrap.html
 */

module.exports.bootstrap = function(cb) {

  // It's very important to trigger this callback method when you are finished
  // with the bootstrap!  (otherwise your server will never lift, since it's waiting on the bootstrap)

  var mockOrchard = [
    {'name':'Field 1',
      'farm': '57b6b8c20ff721282b2e1fc7'},
    {'name':'Field 2',
      'farm': '57b6b8c20ff721282b2e1fc7'}
  ];

  OrchardBlock.count().exec(function(err, count) {
    //Count orchid block to see if data already exist
    if(err) {
      sails.log.error("An error occured creating mock data: " + error.data.message);
      return cb(error);
    }

    if(count > 0) return cb();

    OrchardBlock.create(mockOrchard).exec(cb);
  });
  //cb();
};
