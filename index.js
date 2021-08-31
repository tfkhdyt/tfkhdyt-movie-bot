const { Telegraf } = require('telegraf');
const axios = require('axios');
const { Keyboard, Key } = require('telegram-keyboard');
require('dotenv').config();

const bot = new Telegraf(process.env.BOT_TOKEN);
const omdbAPI = `http://www.omdbapi.com/?apikey=${process.env.OMDB_API_KEY}`;
let keyboard;

bot.start((ctx) => ctx.reply(`Halo ${ctx.from.first_name}, selamat datang di @TFKHDYTMovieBot, ketikkan nama film/series yang ingin dicari untuk menampilkan detail dari film tersebut.`));

bot.hears('hi', (ctx) => ctx.reply('Hey there'));

bot.on('text', (ctx) => {
  const movieQuery = ctx.message.text;
  axios.get(omdbAPI + '&s=' + movieQuery)
  .then(res => {
    // console.log(res.data.Search);
    const hasilQuery = res.data.Search;
    const keyCallback = hasilQuery.map((film) => {
     return Key.callback(`${film.Title} (${film.Year})`, film.imdbID);
    });
    const keyboard = Keyboard.make(keyCallback, { columns : 1 }).inline();
    console.log(keyboard);
    bot.telegram.sendMessage(ctx.chat.id, `Menampilkan film/series dengan judul "${movieQuery}":`, keyboard);
  });
});

bot.on('callback_query', (ctx) => {
  console.log(ctx.callbackQuery.data)
})

bot.launch();