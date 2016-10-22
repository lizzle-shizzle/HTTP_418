/**
 * Worker.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {
  	//The worker's full name
  	//e.g. Adolf Hitler

  	fname: {
  		type: 'string',
  		required: true
  	},

  	lname: {
  		type: 'string',
  		required: true
  	},

  	//The worker's username
  	//e.g. DerFührer
  	nname: {
  		type: 'string',
  		required: true,
  		unique: true
  	},

	foreman: {
		model: 'Foreman'
	}
  }
};

