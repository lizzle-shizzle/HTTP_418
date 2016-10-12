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
    User.findOne(req.session.me, function (err, user){
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
          gravatarUrl: user.gravatarUrl
        }
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
  changePasswordInfo: function (req, res) {

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
    //var query_string = {};
    //var query = req.window.location.href.substring(1);
    //var vars = query.split("/");
    //alert(vars[2]);
    //exit;
    /*for (var i=0;i<vars.length;i++) {
      var pair = vars[i].split("=");
          // If first entry with this name
      if (typeof query_string[pair[0]] === "undefined") {
        query_string[pair[0]] = decodeURIComponent(pair[1]);
          // If second entry with this name
      } else if (typeof query_string[pair[0]] === "string") {
        var arr = [ query_string[pair[0]],decodeURIComponent(pair[1]) ];
        query_string[pair[0]] = arr;
          // If third or later entry with this name
      } else {
        query_string[pair[0]].push(decodeURIComponent(pair[1]));
      }
    }*/
    User.findOne({ resetPasswordToken: req.param('token'), resetPasswordExpires: { $gt: Date.now() } }, function(err, user) {
      if (!user) {
        //if (String(req.param('token')) == "") return res.redirect('/recoverPassword');
        console.log("Token in PC: " + String(req.param('token')));
        console.log("Token param in PC: " + req.param('token'));
        //console.log("User's expDate in PC: " + user.resetPasswordExpires);
        //req.flash('error', 'Password reset token is invalid or has expired.');//change flash
        //var string = String(req.param('token'));
        //console.log(string);
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
  },
  showGenerateCropYieldReport: function (req, res) {

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

      return res.view('report/generateCropYieldReport', {
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
  }

};
