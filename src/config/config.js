const { Telegraf } = require('telegraf');
const { Composer } = require('micro-bot');
require('dotenv').config();

const ENV = process.env.NODE_ENV;
const TOKEN = process.env.BOT_TOKEN;
const API_KEY = process.env.OMDB_API_KEY;

let bot;
const omdbAPI = `http://www.omdbapi.com/?apikey=${API_KEY}`;

// mode
switch (ENV) {
  case 'development':
    bot = new Telegraf(TOKEN);
    break;
  case 'production':
    bot = new Composer();
    break;
}

module.exports = {
  bot,
  omdbAPI,
};
