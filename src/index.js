// const { Composer } = require('micro-bot');
// const { Keyboard, Key } = require('telegram-keyboard');
const { /*Telegraf,*/ Markup } = require('telegraf');
const axios = require('axios');

const { bot, omdbAPI } = require('./config/config');
const sendDetail = require('./utils/sendDetail');

require('./utils/start')();
require('./utils/help')();
require('./utils/search')();

bot.on('callback_query', (ctx) => {
  //console.log(movieQuery);
  ctx.deleteMessage(ctx.update.callback_query.message.message_id);
  const imdbID = ctx.callbackQuery.data;
  axios.get(omdbAPI + '&i=' + imdbID).then((res) => {
    //console.log(res.data);
    const data = res.data;
    if (res.data.Poster == 'N/A') {
      return ctx.replyWithMarkdown(sendDetail(data), {
        ...Markup.inlineKeyboard([
          [
            Markup.button.url(
              '🔎 Cari di psarips',
              `https://psarips.top/?s=${data.Title}`
            ),
            Markup.button.url(
              '🔎 Cari di pahe',
              `https://pahe.ph/?s=${imdbID}`
            ),
          ],
          [
            Markup.button.url('💵 Donasi', 'https://donate.tfkhdyt.my.id/'),
            Markup.button.url(
              '💻 Source Code',
              'https://github.com/tfkhdyt/tfkhdyt-movie-bot'
            ),
          ],
          [
            Markup.button.url(
              '💠 Project saya yang lainnya',
              'https://tfkhdyt.my.id/#portfolio'
            ),
          ],
        ]),
      });
    }
    ctx.replyWithPhoto(
      {
        url: data.Poster,
      },
      {
        caption: sendDetail(data),
        parse_mode: 'Markdown',
        ...Markup.inlineKeyboard([
          [
            Markup.button.url(
              '🔎 Cari di psarips',
              `https://psarips.top/?s=${data.Title}`
            ),
            Markup.button.url(
              '🔎 Cari di pahe',
              `https://pahe.ph/?s=${imdbID}`
            ),
          ],
          [
            Markup.button.url('💵 Donasi', 'https://donate.tfkhdyt.my.id/'),
            Markup.button.url(
              '💻 Source Code',
              'https://github.com/tfkhdyt/tfkhdyt-movie-bot'
            ),
          ],
          [
            Markup.button.url(
              '💠 Project saya yang lainnya',
              'https://tfkhdyt.my.id/#portfolio'
            ),
          ],
        ]),
      }
    );
  });
});

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
