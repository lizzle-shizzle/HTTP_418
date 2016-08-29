module.exports = function emailDoesntExist (statusCode){

  var res = this.res;

  return res.send(409, 'No account with that email address exists.');
};