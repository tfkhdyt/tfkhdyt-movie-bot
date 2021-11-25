module.exports = (ctx) => {
  console.log('a user searches for something that is not found');
  return ctx.reply(
    'Hasil tidak ditemukan! Silakan masukkan judul film yang lain.'
  );
};