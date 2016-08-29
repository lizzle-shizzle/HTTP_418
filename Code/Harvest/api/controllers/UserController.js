/**
 * UserController
 *
 * @description :: Server-side logic for managing users
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {

  /**
   * Check the provided email address and password, and if they
   * match a real user in the database, sign in to Activity Overlord.
   */
  login: function (req, res) {

    // Try to look up user using the provided email address
    User.findOne({
      email: req.param('email')
    }, function foundUser(err, user) {
      if (err) return res.negotiate(err);
      if (!user) return res.notFound();

      // Compare password attempt from the form params to the encrypted password
      // from the database (`user.password`)
      require('machinepack-passwords').checkPassword({
        passwordAttempt: req.param('password'),
        encryptedPassword: user.encryptedPassword
      }).exec({

        error: function (err){
          return res.negotiate(err);
        },

        // If the password from the form params doesn't checkout w/ the encrypted
        // password from the database...
        incorrect: function (){
          return res.notFound();
        },

        success: function (){

          // Store user id in the user session
          req.session.me = user.id;

          // All done- let the client know that everything worked.
          return res.ok();
        }
      });
    });

  },

  /**
   * Sign up for a user account.
   */
  signup: function(req, res) {

    var Passwords = require('machinepack-passwords');

    // Encrypt a string using the BCrypt algorithm.
    Passwords.encryptPassword({
      password: req.param('password'),
      difficulty: 10,
    }).exec({
      // An unexpected error occurred.
      error: function(err) {
        return res.negotiate(err);
      },
      // OK.
      success: function(encryptedPassword) {
        require('machinepack-gravatar').getImageUrl({
          emailAddress: req.param('email')
        }).exec({
          error: function(err) {
            return res.negotiate(err);
          },
          success: function(gravatarUrl) {
          // Create a User with the params sent from
          // the sign-up form --> signup.ejs
            User.create({
              fname: req.param('fname'),
              lname: req.param('lname'),
              birthdate: req.param('birthdate'),
              email: req.param('email'),
              encryptedPassword: encryptedPassword,
              gravatarUrl: gravatarUrl
            }, function userCreated(err, newUser) {
              if (err) {

                console.log("err: ", err);
                console.log("err.invalidAttributes: ", err.invalidAttributes)

                // If this is a uniqueness error about the email attribute,
                // send back an easily parseable status code.
                if (err.invalidAttributes && err.invalidAttributes.email && err.invalidAttributes.email[0]
                  && err.invalidAttributes.email[0].rule === 'unique') {
                  return res.emailAddressInUse();
                }

                // Otherwise, send back something reasonable as our error response.
                return res.negotiate(err);
              }

              // Log user in
              req.session.me = newUser.id;

              // Send back the id of the new user
              return res.json({
                id: newUser.id
              });
            });
          }
        });
      }
    });
  },

  /**
   * Log out of Activity Overlord.
   * (wipes `me` from the sesion)
   */
  logout: function (req, res) {

    // Look up the user record from the database which is
    // referenced by the id in the user session (req.session.me)
    User.findOne(req.session.me, function foundUser(err, user) {
      if (err) return res.negotiate(err);

      // If session refers to a user who no longer exists, still allow logout.
      if (!user) {
        sails.log.verbose('Session refers to a user who no longer exists.');
        return res.backToHomePage();
      }

      // Wipe out the session (log out)
      req.session.me = null;

      // Either send a 200 OK or redirect to the home page
      return res.backToHomePage();

    });
  },
  show: function (req, res, next) {
    User.findOne(param('id'), function foundUser (err, user) {
      if (err) return next(err);
      if (!user) return next();
      res.view({
        user: user
      });
    });
  },
  editFarmer: function(req, res, next) {
    User.findOne(req.param('id'), function foundUser(err, user) {
      if (err) return next(err);
      if (!user) return next();
      res.view({
        user: user
      });
    });
  },
  update: function(req, res, next) {
    User.update(req.param('id'), req.params.all(), function userUpdated (err) {
      if (err) return res.redirect('/user/editFarmer' + req.param('id'));
     // alert("Success");
      /*toastr['success']('Invalid email/password combination.', 'Success', {
          closeButton: true
        });*/
      //res.redirect('/user/show' + req.param('id'));
      //return res.redirect('/user/editFarmer' + req.param('id'));
      /*if (req.param('email').rule !== 'unique') {
        return res.emailAddressInUse();
      }*/
      User.findOne({id: req.param('id')})
        .populate("farms")
        .exec(function (err, user){
          if (err) {
            return res.negotiate(err);
          }

          return res.view('dashboard', {
            me: {
              id: req.param('id'),
              fname: req.param('fname'),
              lname: req.param('lname'),
              birthdate: req.param('birthdate'),
              email: req.param('email'),
              isAdmin: !!req.param('admin'),
              gravatarUrl: req.param('gravatarUrl'),
              farm: user.farms[0]
            },
            layout: "signedInLayout",
        title: "Harvest | Welcome back, " +user.fname + " " + user.lname + "!"
          });
      });
    });
  }
/*
  index: function(req, res, next) {
    User.find(function foundUsers (err, users) {
      if (err) return next(err);
      res.view({
        users: users
      });
    });
  }*/
};
