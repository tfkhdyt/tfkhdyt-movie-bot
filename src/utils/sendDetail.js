module.exports = (data) => {
  // console.log(data);
  const detail = `${
    data.Title !== 'N/A' && data.Title !== undefined
      ? `*Judul* : \`${data.Title}\``
      : ''
  } ${
    data.Rated !== 'N/A' && data.Rated !== undefined
      ? `\n*Rated* : \`${data.Rated}\``
      : ''
  } ${
    data.Year !== 'N/A' && data.Year !== undefined
      ? `\n*Tahun* : \`${data.Year}\``
      : ''
  } ${
    data.totalSeasons !== 'N/A' && data.totalSeasons !== undefined
      ? `\n*Jumlah Musim* : \`${data.totalSeasons}\``
      : ''
  } ${
    data.Released !== 'N/A' && data.Released !== undefined
      ? `\n*Tgl. Rilis* : \`${data.Released}\``
      : ''
  } ${
    data.Runtime !== 'N/A' && data.Runtime !== undefined
      ? `\n*Durasi* : \`${data.Runtime}\``
      : ''
  } ${
    data.Genre !== 'N/A' && data.Genre !== undefined
      ? `\n*Genre* : \`${data.Genre}\``
      : ''
  } ${
    data.Director !== 'N/A' && data.Director !== undefined
      ? `\n*Sutradara* : \`${data.Director}\``
      : ''
  } ${
    data.Writer !== 'N/A' && data.Writer !== undefined
      ? `\n*Penulis* : \`${data.Writer}\``
      : ''
  } ${
    data.Actors !== 'N/A' && data.Actors !== undefined
      ? `\n*Aktor* : \`${data.Actors}\``
      : ''
  } ${
    data.Plot !== 'N/A' && data.Plot !== undefined
      ? `\n*Plot* :\n\`${data.Plot}\``
      : ''
  } ${
    data.Language !== 'N/A' && data.Language !== undefined
      ? `\n*Bahasa* : \`${data.Language}\``
      : ''
  } ${
    data.Country !== 'N/A' && data.Country !== undefined
      ? `\n*Negara* : \`${data.Country}\``
      : ''
  } ${
    data.Awards !== 'N/A' && data.Awards !== undefined
      ? `\n*Penghargaan* : \`${data.Awards}\``
      : ''
  } ${
    data.Production !== 'N/A' && data.Production !== undefined
      ? `\n*Produksi* : \`${data.Production}\``
      : ''
  } ${
    data.BoxOffice !== 'N/A' && data.BoxOffice !== undefined
      ? `\n*Box Office* : \`${data.BoxOffice}\``
      : ''
  } ${
    data.Metascore !== 'N/A' && data.Metascore !== undefined
      ? `\n*Metascore* : \`${data.Metascore}/100\``
      : ''
  } ${
    data.imdbRating !== 'N/A' && data.imdbRating !== undefined
      ? `\n*IMDB Rating* : \`${data.imdbRating}/10\``
      : ''
  }`;
  console.log(`a user found: "${data.Title}"`);
  return detail;
};
