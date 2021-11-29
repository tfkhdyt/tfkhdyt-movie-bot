const { bot } = require('../config/config')
const println = require('./print')

module.exports = () => {
  bot.command('help', (ctx) => {
    ctx.replyWithMarkdown(`Pencarian Film:
    *Judul Film*
Contoh:
    *WandaVision*

Pencarian Film Berdasarkan Tahun Rilis:
    *Judul Film* (*Tahun Rilis*)
Contoh:
    *What If (2021)*`)
    const username = ctx.update.message.from.username
    println(' accessed help command', username)
  })
}
