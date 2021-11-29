const { bot } = require('../config/config')
const println = require('./print')

module.exports = () => {
  bot.start((ctx) => {
    ctx.reply(
      `Halo ${ctx.from.first_name}, selamat datang di @TFKHDYTMovieBot, ketikkan nama film/series yang ingin dicari untuk menampilkan detail dari film tersebut.`
    )
    const username = ctx.update.message.from.username
    println(' accessed start command', username)
  })
}
