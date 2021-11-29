const { Keyboard } = require('telegram-keyboard')
const println = require('./print')

module.exports = (keyCallback, ctx) => {
  const keyboard = Keyboard.make(keyCallback, {
    columns: 1
  }).inline()
  ctx.reply(
    `Menampilkan film/series dengan judul "${ctx.message.text}":`,
    keyboard
  )
  const username = ctx.update.message.from.username
  println(` tried to search for "${ctx.message.text}"`, username)
}
