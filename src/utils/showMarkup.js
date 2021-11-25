const { Markup } = require('telegraf');

module.exports = (data, imdbID) => {
  return [
    [
      Markup.button.url(
        '🔎 Cari di psarips',
        `https://psarips.top/?s=${data.Title}`
      ),
      Markup.button.url('🔎 Cari di pahe', `https://pahe.ph/?s=${imdbID}`),
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
  ];
};
