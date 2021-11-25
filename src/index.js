const { bot } = require('./config/config');
const println = require('./utils/print');

require('./utils/start')();
require('./utils/help')();
require('./utils/search')();
require('./utils/showData')();

switch (process.env.NODE_ENV) {
  case 'development':
    bot.launch().then(() => {
      println('bot is running...');
    });
    break;
  case 'production':
    println('bot is running...');
    module.exports = bot;
    break;
}
