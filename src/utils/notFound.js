const println = require('./print');

module.exports = (ctx) => {
  const username = ctx.update.message.from.username;
  println(' searched for something that is not found', username);
  return ctx.reply(
    'Hasil tidak ditemukan! Silakan masukkan judul film yang lain.'
  );
};
