const { bot } = require('../config/config');

module.exports = () => {
  bot.start((ctx) => {
    ctx.reply(
      `Halo ${ctx.from.first_name}, selamat datang di @TFKHDYTMovieBot, ketikkan nama film/series yang ingin dicari untuk menampilkan detail dari film tersebut.`
    );
    console.log('a user accessed start command');
  });
};
