/**
 * PageController
 *
 * @description :: Server-side logic for managing pages
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {

	showHomePage: function (req, res) {

    // If not logged in, show the public view.
    if (!req.session.me) {
      return res.view('homepage');
    }

    // Otherwise, look up the logged-in user and show the logged-in view,
    // bootstrapping basic user data in the HTML sent from the server
    User.findOne({id: req.session.me})
    .populate("farms")
    .exec(function (err, user){
      if (err) {
        return res.negotiate(err);
      }

      if (!user) {
        sails.log.verbose('Session refers to a user who no longer exists- did you delete a user, then try to refresh the page with an open tab logged-in as that user?');
        return res.view('homepage');
      }

      return res.view('dashboard', {
        me: {
          id: user.id,
          fname: user.fname,
          lname: user.lname,
          birthdate: user.birthdate,
          email: user.email,
          isAdmin: !!user.admin,
          gravatarUrl: user.gravatarUrl,
          farm: user.farms[0]
        },
        layout: "signedInLayout",
        title: "Harvest | Welcome back, " +user.fname + " " + user.lname + "!"
      });

    });
  },
  editFarmerInfo: function (req, res) {

    // If not logged in, show the public view.
    if (!req.session.me) {
      return res.redirect('/');
    }

    // Otherwise, look up the logged-in user and show the logged-in view,
    // bootstrapping basic user data in the HTML sent from the server
    User.findOne(req.session.me, function (err, user){
      if (err) {
        return res.negotiate(err);
      }

      if (!user) {
        sails.log.verbose('Session refers to a user who no longer exists- did you delete a user, then try to refresh the page with an open tab logged-in as that user?');
        return res.redirect('/');
      }

      return res.view('user/editFarmer', {
        me: {
          id: user.id,
          fname: user.fname,
          lname: user.lname,
          birthdate: user.birthdate,
          email: user.email,
          isAdmin: !!user.admin,
          gravatarUrl: user.gravatarUrl
        }
      });

    });
  },
  soon: function (req, res) {    
    res.view('MeetBarry', {layout: "signedInLayout", title: "Coming Soon"});
  },
  changePasswordInfo: function (req, res) {
    if (!req.session.me) {
      return res.redirect('/');
    }

    User.findOne(req.session.me, function (err, user){
      if (err) {
        return res.negotiate(err);
      }

      if (!user) {
        sails.log.verbose('Session refers to a user who no longer exists- did you delete a user, then try to refresh the page with an open tab logged-in as that user?');
        return res.redirect('/');
      }

      return res.view('user/changePassword', {
        me: {
          id: user.id,
          fname: user.fname,
          lname: user.lname,
          birthdate: user.birthdate,
          email: user.email,
          isAdmin: !!user.admin,
          gravatarUrl: user.gravatarUrl
        }
      });

    });
  },
  resetPasswordInfo: function (req, res) {

    var flash = require('express-flash');
    User.findOne({ resetPasswordToken: req.param('token'), resetPasswordExpires: { $gt: Date.now() } }, function(err, user) {
      if (!user) {
        console.log("Token in PC: " + String(req.param('token')));
        console.log("Token param in PC: " + req.param('token'));
        User.findOne({ resetPasswordToken: req.param('token')}, function(err, user) {
          if (user) 
          {
            console.log("User found token: " + user.resetPasswordToken);
            req.session.me = user.id;
            return res.view('user/resetPassword', {
            me: {
              id: user.id,
              fname: user.fname,
              lname: user.lname,
              birthdate: user.birthdate,
              email: user.email,
              isAdmin: !!user.admin,
              gravatarUrl: user.gravatarUrl
            }});
            return;
          }
          else
          {
            console.log("No user found");
            return res.redirect('/recoverPassword');
          }
        });
      }
    });
  }
};
