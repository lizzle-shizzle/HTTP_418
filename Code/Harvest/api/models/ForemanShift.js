/**
 * ForemanShift.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {
  	//The date of the foreman's shift
  	startDate: {
  		date: 'date',
  		required: true
  	},

  	//The time the shift starts
  	startTime: {
  		time: 'datetime',
  		required: true
  	},

  	//The time the shift ends
  	endTime: {
  		time: 'datetime',
  		required: true
  	},

  	//The shift belonging to a foreman
  	shift: {
  		model: 'foreman'
  	}
  }
};

