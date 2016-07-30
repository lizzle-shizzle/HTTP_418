/**
* User.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {

  attributes: {

    // The user's full name
    // e.g. Nikola Tesla
    fname: {
      type: 'string',
      required: true
    },

    lname: {
      type: 'string',
      required: true
    },

    // The user's title at their job (or something)
    // e.g. Genius
    birthdate: {
      type: 'date',
      required: true,
      defaultsTo: new Date(0)
    },

    // The user's email address
    // e.g. nikola@tesla.com
    email: {
      type: 'string',
      email: true,
      required: true,
      unique: true
    },

    // The encrypted password for the user
    // e.g. asdgh8a249321e9dhgaslcbqn2913051#T(@GHASDGA
    encryptedPassword: {
      type: 'string',
      required: true
    },


    // url for gravatar
    gravatarUrl: {
      type: 'string'
    }

    //A user who is a farmer can have many farms
    /*farms :{
      collection: 'farm'
      via: 'farmer'
    }*/
  }
};
