const { bot } = require('../config/config');

module.exports = () => {
  bot.command('help', (ctx) => {
    ctx.reply(`Pencarian Film:
    [Judul Film]
Contoh:
    WandaVision

Pencarian Film Berdasarkan Tahun Rilis:
    [Judul Film] (Tahun Rilis)
Contoh:
    What If (2021)`);
    console.log('a user accessed help command');
  });
};
