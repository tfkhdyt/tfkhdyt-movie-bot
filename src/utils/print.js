const moment = require('moment-timezone');

module.exports = (str, username) => {
  const timestamp = moment().locale('id').tz('Asia/Jakarta').format('hh:mm:ss ddd, DD MMM YY');   
  username ??= '';
  
  console.log(`[${timestamp}] ${username}${str}`);
};