/**
 * Foreman.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {
  	//The foreman's full name
  	//e.g. Adolf Hitler

  	fname: {
  		type: 'string',
  		required: true
  	},

  	lname: {
  		type: 'string',
  		required: true
  	},

  	//The foreman's email address
  	//e.g. adolf@nazi.com
  	email: {
  		type: 'email',//'string',
  		email: true,
  		required: true,
  		unique: true
  	},

  	//The foreman's password encrypted
  	//e.g. asdgh8a249321e9dhgaslcbqn2913051#T(@GHASDGA
  	encryptedPassword: {
  		type: 'string',
  		required: true
  	},

  	//The foreman's multiple shifts
  	shifts: {
  		collection: 'foremanshift',
  		via: 'shift'
  	}
  }
};

