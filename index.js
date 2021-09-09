const { Telegraf, Markup } = require('telegraf');
const { Composer } = require('micro-bot');
const axios = require('axios');
const { Keyboard, Key } = require('telegram-keyboard');
require('dotenv').config();

// Development
//const bot = new Telegraf(process.env.BOT_TOKEN);

// Production
const bot = new Composer();

const omdbAPI = `http://www.omdbapi.com/?apikey=${process.env.OMDB_API_KEY}`;

const sendDetail = (data) => {
  return `*Judul* : ${data.Title}
*Tahun* : ${data.Year}
*Rated* : ${data.Rated}
*Tgl. Rilis* : ${data.Released}
*Durasi* : ${data.Runtime}
*Genre* : ${data.Genre}
*Sutradara* : ${data.Director}
*Penulis* : ${data.Writer}
*Aktor* : ${data.Actors}
*Plot* :
${data.Plot}
*Bahasa* : ${data.Language}
*Negara* : ${data.Country}
*Awards* : ${data.Awards}
*Produksi* : ${data.Production}
*Box Office* : ${data.BoxOffice}
*Metascore* : ${data.Metascore}
*IMDB Rating* : ${data.imdbRating}`;
};

bot.start((ctx) => ctx.reply(`Halo ${ctx.from.first_name}, selamat datang di @TFKHDYTMovieBot, ketikkan nama film/series yang ingin dicari untuk menampilkan detail dari film tersebut.`));

bot.command('help', (ctx) => ctx.reply(`Pencarian Film:
    [Judul Film]
Contoh:
    WandaVision

Pencarian Film Berdasarkan Tahun Rilis:
    [Judul Film] (Tahun Rilis)
Contoh:
    What If (2021)`));

let movieQuery = '';
bot.on('text', (ctx) => {
  movieQuery = ctx.message.text;
  const args = ctx.update.message.text.split(' ');
  let year = '';
  let yearMentah = '';
  if (args[args.length - 1].includes('(') && args[args.length - 1].includes(')')) {
    yearMentah = args[args.length - 1];
    year = yearMentah.replace('(', '');
    year = year.replace(')', '');
    movieQuery = movieQuery.replace(` ${yearMentah}`, '');
  }
  //console.log(year);
  axios.get(omdbAPI + '&s=' + encodeURI(movieQuery) + '&y=' + year)
  .then(res => {
    //console.log(res.data.Search);
    const error = res.data.Error;
    if (error == 'Too many results.') {
      axios.get(omdbAPI + '&t=' + encodeURI(movieQuery) + '&y=' + year)
      .then(res => {
        const error = res.data.Error;
        if (error == 'Movie not found!') {
          return ctx.reply('Hasil tidak ditemukan! Silakan masukkan judul film yang lain.');
        }
        const hasilQuery = res.data;
        const keyCallback = Key.callback(`${hasilQuery.Title} (${hasilQuery.Year})`, hasilQuery.imdbID);
        const keyboard = Keyboard.make(keyCallback, {
          columns: 1
        }).inline();
        //console.log(keyboard);
        ctx.reply(`Menampilkan film/series dengan judul "${ctx.message.text}":`, keyboard);
      });
    } else if (error == 'Movie not found!') {
      ctx.reply('Hasil tidak ditemukan! Silakan masukkan judul film yang lebih spesifik.');
    } else {
      const hasilQuery = res.data.Search;
      const keyCallback = hasilQuery.map((film) => {
        return Key.callback(`${film.Title} (${film.Year})`, film.imdbID);
      });
      const keyboard = Keyboard.make(keyCallback, {
        columns: 1
      }).removeKeyboard().inline();
      ctx.reply(`Menampilkan film/series dengan judul "${ctx.message.text}":`, keyboard);
      //console.log(ctx);
    }
  });
});

bot.on('callback_query', (ctx) => {
  //console.log(movieQuery);
  ctx.deleteMessage(ctx.update.callback_query.message.message_id);
  const imdbID = ctx.callbackQuery.data;
  axios.get(omdbAPI + '&i=' + imdbID)
  .then(res => {
    //console.log(res.data);
    const data = res.data;
    if (res.data.Poster == 'N/A') {
      return ctx.replyWithMarkdown(sendDetail(data), {
        ...Markup.inlineKeyboard([ 
          Markup.button.url('🔎 Cari di pahe.ph', `https://pahe.ph/?s=${imdbID}`)
        ]) 
      })
    }
    const sendPhoto = ctx.replyWithPhoto({
      url: data.Poster
    }, {
      caption: sendDetail(data),
      parse_mode: 'Markdown',
      ...Markup.inlineKeyboard([ 
        Markup.button.url('🔎 Cari di pahe.ph', `https://pahe.ph/?s=${imdbID}`)
      ]) 
    });
  });
});

// Development
// bot.launch();

// Production
module.exports = bot;
