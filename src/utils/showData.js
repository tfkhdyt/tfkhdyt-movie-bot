const axios = require('axios')
const { Markup } = require('telegraf')

const { bot, omdbAPI } = require('../config/config')
const sendDetail = require('./sendDetail')
const showMarkup = require('./showMarkup')

module.exports = () => {
  bot.on('callback_query', (ctx) => {
    // console.log(movieQuery);
    ctx.deleteMessage(ctx.update.callback_query.message.message_id)
    const imdbID = ctx.callbackQuery.data
    axios.get(omdbAPI + '&i=' + imdbID).then((res) => {
      // console.log(res.data);
      const data = res.data
      // console.log(ctx);
      const username = ctx.update.callback_query.from.username
      if (res.data.Poster === 'N/A') {
        return ctx.replyWithMarkdown(sendDetail(data, username), {
          ...Markup.inlineKeyboard(showMarkup(data, imdbID))
        })
      }
      ctx.replyWithPhoto(
        {
          url: data.Poster
        },
        {
          caption: sendDetail(data, username),
          parse_mode: 'Markdown',
          ...Markup.inlineKeyboard(showMarkup(data, imdbID))
        }
      )
    })
  })
}
