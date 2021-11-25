module.exports = (ctx) => {
  console.log('a user searched for something with unspecific query');
  return ctx.reply(
    'Hasil tidak ditemukan! Silakan masukkan judul film yang lebih spesifik.'
  );
};
