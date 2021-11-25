const { Keyboard } = require('telegram-keyboard');

module.exports = (keyCallback, ctx) => {
  const keyboard = Keyboard.make(keyCallback, {
    columns: 1,
  }).inline();
  ctx.reply(
    `Menampilkan film/series dengan judul "${ctx.message.text}":`,
    keyboard
  );
};