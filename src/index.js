const { bot } = require('./config/config');

require('./utils/start')();
require('./utils/help')();
require('./utils/search')();
require('./utils/showData')();

switch (process.env.NODE_ENV) {
  case 'development':
    bot.launch();
    console.log('Bot is running...');
    break;
  case 'production':
    console.log('Bot is running...');
    module.exports = bot;
    break;
}
