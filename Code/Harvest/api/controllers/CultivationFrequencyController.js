/**
 * CultivationFrequencyController
 *
 * @description :: Server-side logic for managing cultivationFrequency
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
    view: function(req, res) {
        if (!req.session.me) {
        return res.view('homepage');
      }

    User.findOne({id: req.session.me})
    .populate("farms")
    .exec(function (err, user) {
      //If there is an error 
        //return appropiate error message
      if(err) return res.negotiate(err);

      if(user.farms[0] == null)
            return res.view('farm/new', {layout: "signedInLayout", title: "Create new farm"});
      CultivationFrequency.find()     
      .exec(function(err, cultivation) {
        if(err) return res.negotiate(err);        
        //send all orchard blocks linked to farm
        res.view({type: cultivation, 
        layout: "signedInLayout"});       
      });
    });        
    },

    new: function(req, res) {
    //return to homepage if not logged in
    //cannot create crop type if not logged in
    if (!req.session.me) {
        return res.view('homepage');
      }
    User.findOne({id: req.session.me})
    .populate("farms")
    .exec(function (err, user) {
      //If there is an error 
        //return appropiate error message
      if(err) return res.negotiate(err);

      res.view({layout: "signedInLayout", title: "Create cultivation frequency"});
    });       
  },

    create: function (req, res) {
    if (!req.session.me) {
        return res.view('homepage');
      }
      User.findOne({id: req.session.me})
      .populate("farms")
      .exec(function (err, user) {
        CultivationFrequency.create({name: req.param("newCultivationFrequency"), farm: user.farms[0]}, function(err, cultivation) {
        if(err) return res.negotiate(err);
        return res.redirect("/cultivationFrequency/view");            
        });
      });
  },

  edit: function(req, res) {    
    //return to homepage if not logged in
    //cannot edit crop type if not logged in
    if (!req.session.me) {
        return res.view('homepage');
      }
    User.findOne({id: req.session.me}) 
    .populate("farms")
    .exec(function (err, user) {
      //If there is an error 
        //return appropiate error message
      if(err) return res.negotiate(err);

      //find all crop types
      CultivationFrequency.findOne({id: req.param("id")}).exec(function(err, cultivationFrequency) {
          if(err) return res.negotiate(err);          
          //send all orchard blocks linked to farm and croptypes that exist
          res.view({data: {
            type: cultivationFrequency,
            id: req.param("id")}, 
          layout: "signedInLayout", title: "Edit Cultivation Frequency"});
        });
    });
  },

  update: function(req, res) {    
    //return to homepage if not logged in
    //cannot edit crop type if not logged in
    if (!req.session.me) {
        return res.view('homepage');
      }
    CultivationFrequency.update({id: req.param("id")}, {name: req.param("cultivationFrequency")},
    function(err) {
      //If there is an error 
      //return appropiate error message
      if(err) return res.negotiate(err);

      //if successfull send 200 response
      return res.redirect("/cultivationFrequency/view");
    });
  }
};