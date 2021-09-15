const{Telegraf:Telegraf,Markup:Markup}=require("telegraf"),{Composer:Composer}=require("micro-bot"),axios=require("axios"),{Keyboard:Keyboard,Key:Key}=require("telegram-keyboard");switch(require("dotenv").config(),process.env.NODE_ENV){case"development":bot=new Telegraf(process.env.BOT_TOKEN);break;case"production":bot=new Composer}const omdbAPI=`http://www.omdbapi.com/?apikey=${process.env.OMDB_API_KEY}`;let data=[];const sendDetail=e=>{console.log(e);const a=`${"N/A"!==e.Title&&void 0!==e.Title?`*Judul* : \`${e.Title}\``:""} ${"N/A"!==e.Rated&&void 0!==e.Rated?`\n*Rated* : \`${e.Rated}\``:""} ${"N/A"!==e.Year&&void 0!==e.Year?`\n*Tahun* : \`${e.Year}\``:""} ${"N/A"!==e.totalSeasons&&void 0!==e.totalSeasons?`\n*Jumlah Musim* : \`${e.totalSeasons}\``:""} ${"N/A"!==e.Released&&void 0!==e.Released?`\n*Tgl. Rilis* : \`${e.Released}\``:""} ${"N/A"!==e.Runtime&&void 0!==e.Runtime?`\n*Durasi* : \`${e.Runtime}\``:""} ${"N/A"!==e.Genre&&void 0!==e.Genre?`\n*Genre* : \`${e.Genre}\``:""} ${"N/A"!==e.Director&&void 0!==e.Director?`\n*Sutradara* : \`${e.Director}\``:""} ${"N/A"!==e.Writer&&void 0!==e.Writer?`\n*Penulis* : \`${e.Writer}\``:""} ${"N/A"!==e.Actors&&void 0!==e.Actors?`\n*Aktor* : \`${e.Actors}\``:""} ${"N/A"!==e.Plot&&void 0!==e.Plot?`\n*Plot* :\n\`${e.Plot}\``:""} ${"N/A"!==e.Language&&void 0!==e.Language?`\n*Bahasa* : \`${e.Language}\``:""} ${"N/A"!==e.Country&&void 0!==e.Country?`\n*Negara* : \`${e.Country}\``:""} ${"N/A"!==e.Awards&&void 0!==e.Awards?`\n*Penghargaan* : \`${e.Awards}\``:""} ${"N/A"!==e.Production&&void 0!==e.Production?`\n*Produksi* : \`${e.Production}\``:""} ${"N/A"!==e.BoxOffice&&void 0!==e.BoxOffice?`\n*Box Office* : \`${e.BoxOffice}\``:""} ${"N/A"!==e.Metascore&&void 0!==e.Metascore?`\n*Metascore* : \`${e.Metascore}/100\``:""} ${"N/A"!==e.imdbRating&&void 0!==e.imdbRating?`\n*IMDB Rating* : \`${e.imdbRating}/10\``:""}`;return console.log(a),a};bot.start((e=>e.reply(`Halo ${e.from.first_name}, selamat datang di @TFKHDYTMovieBot, ketikkan nama film/series yang ingin dicari untuk menampilkan detail dari film tersebut.`))),bot.command("help",(e=>e.reply("Pencarian Film:\n    [Judul Film]\nContoh:\n    WandaVision\n\nPencarian Film Berdasarkan Tahun Rilis:\n    [Judul Film] (Tahun Rilis)\nContoh:\n    What If (2021)")));let movieQuery="";switch(bot.on("text",(e=>{movieQuery=e.message.text;const a=e.update.message.text.split(" ");let o="",n="";a[a.length-1].includes("(")&&a[a.length-1].includes(")")&&(n=a[a.length-1],o=n.replace("(",""),o=o.replace(")",""),movieQuery=movieQuery.replace(` ${n}`,"")),axios.get(omdbAPI+"&s="+encodeURI(movieQuery)+"&y="+o).then((a=>{const n=a.data.Error;if("Too many results."==n)axios.get(omdbAPI+"&t="+encodeURI(movieQuery)+"&y="+o).then((a=>{if("Movie not found!"==a.data.Error)return e.reply("Hasil tidak ditemukan! Silakan masukkan judul film yang lain.");const o=a.data,n=Key.callback(`${o.Title} (${o.Year})`,o.imdbID),t=Keyboard.make(n,{columns:1}).inline();e.reply(`Menampilkan film/series dengan judul "${e.message.text}":`,t)}));else if("Movie not found!"==n)e.reply("Hasil tidak ditemukan! Silakan masukkan judul film yang lebih spesifik.");else{const o=a.data.Search.map((e=>Key.callback(`${e.Title} (${e.Year})`,e.imdbID))),n=Keyboard.make(o,{columns:1}).removeKeyboard().inline();e.reply(`Menampilkan film/series dengan judul "${e.message.text}":`,n)}}))})),bot.on("callback_query",(e=>{e.deleteMessage(e.update.callback_query.message.message_id);const a=e.callbackQuery.data;axios.get(omdbAPI+"&i="+a).then((o=>{const n=o.data;if("N/A"==o.data.Poster)return e.replyWithMarkdown(sendDetail(n),{...Markup.inlineKeyboard([Markup.button.url("🔎 Cari di pahe.ph",`https://pahe.ph/?s=${a}`)])});e.replyWithPhoto({url:n.Poster},{caption:sendDetail(n),parse_mode:"Markdown",...Markup.inlineKeyboard([Markup.button.url("🔎 Cari di pahe.ph",`https://pahe.ph/?s=${a}`)])})}))})),process.env.NODE_ENV){case"development":bot.launch();break;case"production":module.exports=bot}
