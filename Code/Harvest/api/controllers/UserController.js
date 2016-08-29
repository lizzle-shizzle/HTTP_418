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
  updateFarmer: function(req, res, next) {
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
      //Fetch farm linked to user after successfull update of datails
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
  },
  changePassword: function(req, res, next) {
    User.findOne(req.param('id'), function foundUser(err, user) {
      if (err) return next(err);
      if (!user) return next();
      res.view({
        user: user
      });
    });
  },
  updatePassword: function(req, res, next) {
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
        User.update({id: req.param("id")}, {encryptedPassword: encryptedPassword}, function userUpdated (err) {
          if (err) return res.redirect('/user/changePassword' + req.param('id'));
         // alert("Success");
          /*toastr['success']('Invalid email/password combination.', 'Success', {
              closeButton: true
            });*/
          //res.redirect('/user/show' + req.param('id'));
          //return res.redirect('/user/editFarmer' + req.param('id'));
          /*if (req.param('email').rule !== 'unique') {
            return res.emailAddressInUse();
          }*/
        
          
        });
        User.findOne(req.param('id'), function foundUser(err, user) {
          if (err) return next(err);
          if (!user) return next();
          return res.view('user/editFarmer', {
            me: {
              id: user.id,
              fname: user.fname,
              lname: user.lname,
              birthdate: user.birthdate,
              email: user.email,
              isAdmin: !!user.admin,
              gravatarUrl: user.gravatarUrl
            }});/*
          res.view({
            user: user
          });*/
        });
      //return res.redirect('/user/editFarmer' + req.param('id'));
      /*return res.view('dashboard', {
        me: {
          id: req.param('id'),
          fname: req.param('fname'),
          lname: req.param('lname'),
          birthdate: req.param('birthdate'),
          email: req.param('email'),
          encryptedPassword: encryptedPassword,
          isAdmin: !!req.param('admin'),
          gravatarUrl: req.param('gravatarUrl')
        }});*//*
        require('machinepack-gravatar').getImageUrl({
          emailAddress: req.session.me.email//req.param('email')
        }).exec({
          error: function(err) {
            return res.negotiate(err);
          },
          success: function(gravatarUrl) {
            return res.view('editFarmer', {
              me: {
                id: req.param('id'),
                fname: req.param('fname'),
                lname: req.param('lname'),
                birthdate: req.param('birthdate'),
                email: req.param('email'),
                encryptedPassword: encryptedPassword,
                gravatarUrl: gravatarUrl
              }
            });
          }
        });
      }*/
    }});
    
  },/*
  recoverPassword: function(req, res, next) {
    var mongoose = require('mongoose');
    var ObjectID = require('sails-mongo/node_modules/mongodb').ObjectID;
    var nodemailer = require('nodemailer');
    var bcrypt = require('bcryptjs');
    var async = require('async');
    var crypto = require('crypto');
    var flash = require('express-flash');

    var token;
    crypto.randomBytes(20, function(err, buf) {
      token = buf.toString('hex');
      console.log("Gen: " + token);
      //done(err, token);
    }); 

    User.findOne({ email: req.param('email')}, function(err, user) {
      if (!user) {            
        req.flash('error', 'No account with that email address exists.');//fix error handling
        return res.redirect('user/recoverPassword');
      }
      user.resetPasswordToken = token;
      user.resetPasswordExpires = Date.now() + 3600000; // 1 hour

      user.save(function(err) {
        //done(err, token, user);
      });
    });*/
    /*var userID = "";
    var userObj;
    User.findOne({email: req.param('email')}, function foundUser(err, user) {
      if (err) return next(err);
      if (!user) return res.redirect('/');
      userID = user.id;
      userObj = user;
      console.log(userID);
    });*/
    //var expDate = Date.now() + 3600000;
    //console.log("expDate: " + expDate + " token: " + token);
    /*User.native(function (err, collection) {
      collection.update({id: userID}, {$push:{resetPasswordToken: token, resetPasswordExpires: expDate}}, function userUpdated (err) {
        if (err) return res.redirect('/recoverPassword');
        done(err, token, userObj);
      });
    });*/
    //User.update({email: req.param('email')}, {resetPasswordToken: token, resetPasswordExpires: expDate}, function userUpdated (err) {
      /*if (err) return res.redirect('/recoverPassword');
      done(err, token, userObj);*/
    //});
    /*User.findOne({email: req.param('email')}, function foundUser(err, user) {
      console.log("User in db resetPasswordToken: " + user.resetPasswordToken);
      console.log("User in db resetPasswordExpires: " + user.resetPasswordExpires);
      console.log("Token after update " + token);
     // console.log("userID: " + userID);
      //done(err, token, userObj);
    });
  },*/
  recoverPassword: function(req, res, next) {
  var mongoose = require('mongoose');
  var ObjectID = require('sails-mongo/node_modules/mongodb').ObjectID;
  var nodemailer = require('nodemailer');
  var bcrypt = require('bcryptjs');
  var async = require('async');
  var crypto = require('crypto');
  var flash = require('express-flash');
  async.waterfall([
        function(done) {
          crypto.randomBytes(20, function(err, buf) {
                var token = buf.toString('hex');                
                done(err, token);
              });
        },
        function(token, done) {
          var userObj;
          User.findOne({ email: req.param('email')}, function(err, user) {
            if (!user) {            
              req.flash('error', 'No account with that email address exists.');//fix error handling
              return res.redirect('/recoverPassword');
            }
            user.resetPasswordToken = token;
            user.resetPasswordExpires = Date.now() + 3600000; // 1 hour

            user.save(function(err) {
              
              console.log("User in save: " + JSON.stringify(user));
              done(err, token, user);
              //userObj = user;
              //User.update({email: req.param('email')}, {resetPasswordToken: token, resetPasswordExpires: user.resetPasswordExpires}, function userUpdated (err) {

              //});
            });
          });/*
          User.findOne({email: req.param('email')}, function foundUser(err, user) {
            if (err) return next(err);
            if (!user) return res.redirect('/');
            console.log("User in db resetPasswordToken: " + user.resetPasswordToken);
            console.log("User in db resetPasswordExpires: " + user.resetPasswordExpires);
            console.log("Token after update: " + token);
            console.log("userID: " + user.id);
            done(err, token, user);
          });*/
          
          
      },
      function(token, user, done) {
        console.log("Mail function");
        var smtpTransport = nodemailer.createTransport('SMTP', {
          service: 'Gmail',
          auth: {
            user: 'subtropharvest@gmail.com',
            pass: 'MeetBarry'
          }
        });
        var mailOptions = {
          to: user.email,
          from: 'password-reset@subtropharvest.co.za',
          subject: 'Node.js Password Reset',
          text: 'You are receiving this because you (or someone else) have requested the reset of the password for your account.\n\n' +
            'Please click on the following link, or paste this into your browser to complete the process:\n\n' +
            'http://' + req.headers.host + '/resetPassword/' + user.resetPasswordToken + '\n\n' +
            'If you did not request this, please ignore this email and your password will remain unchanged.\n'
        };
        smtpTransport.sendMail(mailOptions, function(err) {
          req.flash('info', 'An e-mail has been sent to ' + user.email + ' with further instructions.');
          done(err, 'done');
        });
      }
    ], function(err) {
      if (err) return next(err);
      res.redirect('/');//add info message here
    });
},
resetPassword: function(req, res) {
  var mongoose = require('mongoose');
  var nodemailer = require('nodemailer');
  var async = require('async');
  var crypto = require('crypto');
  var flash = require('express-flash');
  var Passwords = require('machinepack-passwords');

  async.waterfall([
    function(done) {
      /*User.findOne({ resetPasswordToken: req.params.token, resetPasswordExpires: { $gt: Date.now() } }, function(err, user) {
        if (err) return res.redirect('/');
        if (!user) {
          req.flash('error', 'Password reset token is invalid or has expired.');//add proper message handling
          return res.redirect('/');
        }*/
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
            var userID = "";
            var userObj;
            User.findOne({resetPasswordToken: req.params.token}, function foundUser(err, user) {
              if (err) return next(err);
              if (!user) return res.redirect('/');
              req.session.me = user.id;
              userID = user.id;
              userObj = user;
            });
            User.update({resetPasswordToken: req.params.token}, {encryptedPassword: encryptedPassword, resetPasswordToken: null, resetPasswordExpires: null}, function userUpdated (err) {
              if (err) return res.redirect('/');
              done(err, userObj);
            });
          }
        /*user.password = req.body.password;
        user.resetPasswordToken = undefined;
        user.resetPasswordExpires = undefined;
        user.save(function(err) {
          req.logIn(user, function(err) {
            done(err, user);
          });
        });*/
      });
    },
    function(user, done) {
      var smtpTransport = nodemailer.createTransport('SMTP', {
        service: 'Gmail',
        auth: {
          user: 'subtropharvest@gmail.com',
          pass: 'MeetBarry'
        }
      });
      var mailOptions = {
        to: user.email,
        from: 'password-reset@subtropharvest.com',
        subject: 'Your password has been changed',
        text: 'Hello,\n\n' +
          'This is a confirmation that the password for your account ' + user.email + ' has just been changed.\n'
      };
      smtpTransport.sendMail(mailOptions, function(err) {
        req.flash('success', 'Success! Your password has been changed.');
        done(err);
      });
    }
  ], function(err) {
    res.redirect('/');
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
