/**
 * Route Mappings
 * (sails.config.routes)
 *
 * Your routes map URLs to views and controllers.
 *
 * If Sails receives a URL that doesn't match any of the routes below,
 * it will check for matching files (images, scripts, stylesheets, etc.)
 * in your assets directory.  e.g. `http://localhost:1337/images/foo.jpg`
 * might match an image file: `/assets/images/foo.jpg`
 *
 * Finally, if those don't match either, the default 404 handler is triggered.
 * See `api/responses/notFound.js` to adjust your app's 404 logic.
 *
 * Note: Sails doesn't ACTUALLY serve stuff from `assets`-- the default Gruntfile in Sails copies
 * flat files from `assets` to `.tmp/public`.  This allows you to do things like compile LESS or
 * CoffeeScript for the front-end.
 *
 * For more information on configuring custom routes, check out:
 * http://sailsjs.org/#/documentation/concepts/Routes/RouteTargetSyntax.html
 */

module.exports.routes = {

  /***************************************************************************
  *                                                                          *
  * Make the view located at `views/homepage.ejs` (or `views/homepage.jade`, *
  * etc. depending on your default view engine) your home page.              *
  *                                                                          *
  * (Alternatively, remove this and add an `index.html` file in your         *
  * `assets` directory)                                                      *
  *                                                                          *
  ***************************************************************************/

  ////////////////////////////////////////////////////////////
  // Server-rendered HTML webpages
  ////////////////////////////////////////////////////////////

  'GET /signup': {view: 'signup'},
  'GET /': 'PageController.showHomePage',
  'GET /soon': 'PageController.soon',
  'GET /about': {view: 'public/about'},
  'GET /contact': {view: 'public/contact'},

  ////////////////////////////////////////////////////////////
  // JSON API
  ////////////////////////////////////////////////////////////

  // User enrollment + authentication
  'POST /signup': 'UserController.signup',
  'PUT /login': 'UserController.login',
  'GET /logout': 'UserController.logout',
  'GET /recoverPassword': {view: 'user/recoverPassword'},
  'POST /recoverPassword': 'UserController.recoverPassword',
  //'GET /resetPassword/:token': {view: 'user/resetPassword'},
  'GET /resetPassword/:token': {controller: 'PageController', action: 'resetPasswordInfo', skipAssets: true},
  'POST /resetPassword/:token': 'UserController.resetPassword',

  'GET /viewOrchardBlock': 'orchardBlockController.viewOrchardBlock',
  'GET /editOrchardBlock': 'orchardBlockController.editOrchardBlock',
  'GET /createOrchardBlock': 'orchardBlockController.createOrchardBlock',

  'GET /createForeman': 'ForemanController.create',

  'GET /editFarmer': {view: 'user/editFarmer'},
  'GET /editFarmer': 'PageController.editFarmerInfo',
  'GET /changePassword': {view: 'user/changePassword'},
  'GET /changePassword': 'PageController.changePasswordInfo'

  // '/': {
  //   view: 'homepage'
  // }

  /***************************************************************************
  *                                                                          *
  * Custom routes here...                                                    *
  *                                                                          *
  *  If a request to a URL doesn't match any of the custom routes above, it  *
  * is matched against Sails route blueprints. See `config/blueprints.js`    *
  * for configuration options and examples.                                  *
  *                                                                          *
  ***************************************************************************/

};
