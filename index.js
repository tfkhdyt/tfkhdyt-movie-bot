const Telegraf = require('telegraf') // import telegram lib

const bot = new Telegraf(process.env.BOT_TOKEN) // get the token from envirenment variable
bot.start((ctx) => ctx.reply('Welcome')) // display Welcome text when we start bot
bot.hears('hi', (ctx) => ctx.reply('Hey there')) // listen and handle when user type hi text
bot.launch() // start