const axios = require('axios')
const { Key } = require('telegram-keyboard')

const { bot, omdbAPI } = require('../config/config')
const notFound = require('./notFound')
const notSpecific = require('./notSpecific')
const showList = require('./showList')

module.exports = () => {
  bot.on('text', (ctx) => {
    let movieQuery = ctx.message.text
    const args = ctx.update.message.text.split(' ')
    let year = ''
    let yearMentah = ''
    if (
      args[args.length - 1].includes('(') &&
      args[args.length - 1].includes(')')
    ) {
      yearMentah = args[args.length - 1]
      year = yearMentah.replace('(', '')
      year = year.replace(')', '')
      movieQuery = movieQuery.replace(` ${yearMentah}`, '')
    }
    // console.log(year);
    axios
      .get(omdbAPI + '&s=' + encodeURI(movieQuery) + '&y=' + year)
      .then((res) => {
        // console.log(res.data.Search);
        const error = res.data.Error
        if (error === 'Too many results.') {
          axios
            .get(omdbAPI + '&t=' + encodeURI(movieQuery) + '&y=' + year)
            .then((res) => {
              const error = res.data.Error
              if (error === 'Movie not found!') {
                notFound(ctx)
              }
              const hasilQuery = res.data
              const keyCallback = Key.callback(
                `${hasilQuery.Title} (${hasilQuery.Year})`,
                hasilQuery.imdbID
              )
              showList(keyCallback, ctx)
            })
        } else if (error === 'Movie not found!') {
          notSpecific(ctx)
        } else {
          const hasilQuery = res.data.Search
          const keyCallback = hasilQuery.map((film) => {
            return Key.callback(`${film.Title} (${film.Year})`, film.imdbID)
          })
          showList(keyCallback, ctx)
        }
      })
  })
}
