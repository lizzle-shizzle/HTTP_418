/**
 * OrchidBlock.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {
  name: {
    type: 'string'
  }
  //And orchid block can only have one crop type
  attributes: {
    cropTypes: {
      model: 'cropType'
    },

    //And orchid clock can only belong to one farm
    farm: {
      model: 'farm'
    }
  }
};

