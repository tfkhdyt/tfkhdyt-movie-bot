const { Telegraf, Markup } = require('telegraf');
const { Composer } = require('micro-bot');
const axios = require('axios');
const { Keyboard, Key } = require('telegram-keyboard');
require('dotenv').config();

// Atur mode
let bot;
switch (process.env.NODE_ENV) {
  case 'development':
    bot = new Telegraf(process.env.BOT_TOKEN);
    break;
  case 'production':
    bot = new Composer();
    break;
}

const omdbAPI = `http://www.omdbapi.com/?apikey=${process.env.OMDB_API_KEY}`;

const sendDetail = (data) => {
  console.log(data);
  const detail = `${
    data.Title !== 'N/A' && data.Title !== undefined
      ? `*Judul* : \`${data.Title}\``
      : ''
  } ${
    data.Rated !== 'N/A' && data.Rated !== undefined
      ? `\n*Rated* : \`${data.Rated}\``
      : ''
  } ${
    data.Year !== 'N/A' && data.Year !== undefined
      ? `\n*Tahun* : \`${data.Year}\``
      : ''
  } ${
    data.totalSeasons !== 'N/A' && data.totalSeasons !== undefined
      ? `\n*Jumlah Musim* : \`${data.totalSeasons}\``
      : ''
  } ${
    data.Released !== 'N/A' && data.Released !== undefined
      ? `\n*Tgl. Rilis* : \`${data.Released}\``
      : ''
  } ${
    data.Runtime !== 'N/A' && data.Runtime !== undefined
      ? `\n*Durasi* : \`${data.Runtime}\``
      : ''
  } ${
    data.Genre !== 'N/A' && data.Genre !== undefined
      ? `\n*Genre* : \`${data.Genre}\``
      : ''
  } ${
    data.Director !== 'N/A' && data.Director !== undefined
      ? `\n*Sutradara* : \`${data.Director}\``
      : ''
  } ${
    data.Writer !== 'N/A' && data.Writer !== undefined
      ? `\n*Penulis* : \`${data.Writer}\``
      : ''
  } ${
    data.Actors !== 'N/A' && data.Actors !== undefined
      ? `\n*Aktor* : \`${data.Actors}\``
      : ''
  } ${
    data.Plot !== 'N/A' && data.Plot !== undefined
      ? `\n*Plot* :\n\`${data.Plot}\``
      : ''
  } ${
    data.Language !== 'N/A' && data.Language !== undefined
      ? `\n*Bahasa* : \`${data.Language}\``
      : ''
  } ${
    data.Country !== 'N/A' && data.Country !== undefined
      ? `\n*Negara* : \`${data.Country}\``
      : ''
  } ${
    data.Awards !== 'N/A' && data.Awards !== undefined
      ? `\n*Penghargaan* : \`${data.Awards}\``
      : ''
  } ${
    data.Production !== 'N/A' && data.Production !== undefined
      ? `\n*Produksi* : \`${data.Production}\``
      : ''
  } ${
    data.BoxOffice !== 'N/A' && data.BoxOffice !== undefined
      ? `\n*Box Office* : \`${data.BoxOffice}\``
      : ''
  } ${
    data.Metascore !== 'N/A' && data.Metascore !== undefined
      ? `\n*Metascore* : \`${data.Metascore}/100\``
      : ''
  } ${
    data.imdbRating !== 'N/A' && data.imdbRating !== undefined
      ? `\n*IMDB Rating* : \`${data.imdbRating}/10\``
      : ''
  }`;
  console.log(detail);
  return detail;
};

bot.start((ctx) =>
  ctx.reply(
    `Halo ${ctx.from.first_name}, selamat datang di @TFKHDYTMovieBot, ketikkan nama film/series yang ingin dicari untuk menampilkan detail dari film tersebut.`
  )
);

bot.command('help', (ctx) =>
  ctx.reply(`Pencarian Film:
    [Judul Film]
Contoh:
    WandaVision

Pencarian Film Berdasarkan Tahun Rilis:
    [Judul Film] (Tahun Rilis)
Contoh:
    What If (2021)`)
);

let movieQuery = '';
bot.on('text', (ctx) => {
  movieQuery = ctx.message.text;
  const args = ctx.update.message.text.split(' ');
  let year = '';
  let yearMentah = '';
  if (
    args[args.length - 1].includes('(') &&
    args[args.length - 1].includes(')')
  ) {
    yearMentah = args[args.length - 1];
    year = yearMentah.replace('(', '');
    year = year.replace(')', '');
    movieQuery = movieQuery.replace(` ${yearMentah}`, '');
  }
  //console.log(year);
  axios
    .get(omdbAPI + '&s=' + encodeURI(movieQuery) + '&y=' + year)
    .then((res) => {
      //console.log(res.data.Search);
      const error = res.data.Error;
      if (error == 'Too many results.') {
        axios
          .get(omdbAPI + '&t=' + encodeURI(movieQuery) + '&y=' + year)
          .then((res) => {
            const error = res.data.Error;
            if (error == 'Movie not found!') {
              return ctx.reply(
                'Hasil tidak ditemukan! Silakan masukkan judul film yang lain.'
              );
            }
            const hasilQuery = res.data;
            const keyCallback = Key.callback(
              `${hasilQuery.Title} (${hasilQuery.Year})`,
              hasilQuery.imdbID
            );
            const keyboard = Keyboard.make(keyCallback, {
              columns: 1,
            }).inline();
            //console.log(keyboard);
            ctx.reply(
              `Menampilkan film/series dengan judul "${ctx.message.text}":`,
              keyboard
            );
          });
      } else if (error == 'Movie not found!') {
        ctx.reply(
          'Hasil tidak ditemukan! Silakan masukkan judul film yang lebih spesifik.'
        );
      } else {
        const hasilQuery = res.data.Search;
        const keyCallback = hasilQuery.map((film) => {
          return Key.callback(`${film.Title} (${film.Year})`, film.imdbID);
        });
        const keyboard = Keyboard.make(keyCallback, {
          columns: 1,
        })
          .removeKeyboard()
          .inline();
        ctx.reply(
          `Menampilkan film/series dengan judul "${ctx.message.text}":`,
          keyboard
        );
        //console.log(ctx);
      }
    });
});

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
          Markup.button.url(
            '🔎 Cari di psarips',
            `https://psarips.top/?s=${data.Title}`
          ),
          Markup.button.url('🔎 Cari di pahe', `https://pahe.ph/?s=${imdbID}`),
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
          Markup.button.url(
            '🔎 Cari di psarips',
            `https://psarips.top/?s=${data.Title}`
          ),
          Markup.button.url('🔎 Cari di pahe', `https://pahe.ph/?s=${imdbID}`),
        ]),
      }
    );
  });
});

switch (process.env.NODE_ENV) {
  case 'development':
    bot.launch();
    break;
  case 'production':
    module.exports = bot;
    break;
}
