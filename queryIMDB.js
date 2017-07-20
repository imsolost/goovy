const cheerio = require('cheerio')
const rp = require('request-promise')

function queryIMDB(search) {

  const options = {
    uri: `http://www.imdb.com/find?ref_=nv_sr_fn&q=${search}&s=all`,
    transform: body => cheerio.load( body )
  }

  return rp(options)
    .then( $ => {
      const moviesArray = $('.findSection')
        .first()
        .find('.result_text a')
        .map( (index, element) => $(element).text() )
        .toArray()
      const yearsArray = $('.findSection')
        .first()
        .find('.result_text')
        .map( (index, element) => $(element).text().slice(moviesArray[index].length + 2, moviesArray[index].length + 8) )
        .toArray()

      let output = {'movies': []}
      for (let i = 0; i < moviesArray.length; i++) {
        let movieObject = {}
        movieObject.name = moviesArray[i]
        movieObject.year = yearsArray[i]
        output.movies.push(movieObject)
      }
      // console.log(output)
      return output
    })
    .catch( error => { throw error } )
}

module.exports = queryIMDB
