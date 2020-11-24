import writeJsonFile from 'write-json-file';
const cheerio = require('cheerio');
const axios = require('axios');

function sleeper(ms) {
  return function(x) {
    return new Promise(resolve => setTimeout(() => resolve(x), ms));
  };
}

axios.get('https://spreadsheets.google.com/feeds/list/183-e_Hf_ZLD4D-91TtqpI35C6TQO_HanD-NKg-XjvAY/od6/public/values?alt=json')
  .then(response => response.data.feed.entry
    .map(row => ({
      pageAvanza: row['gsx$pageavanza']['$t'],
      key: row['gsx$key']['$t'],
      name: row['gsx$namn']['$t'],
    }))
    .filter(row => row.pageAvanza.length > 0))
  .then(rows => {
    const priceData$ = rows.map((row, rowIndex) => sleeper(350 * rowIndex)()
      .then(() => axios.get('https://www.avanza.se/aktier/om-aktien.html' + row.pageAvanza))
      .then(response => cheerio.load(response.data))
      .then($ => {
        const input = []
        const output = []

        $(".dividends > .content > table > tbody > tr > td")
          .each((index, element) => input.push($(element).text()))

        for (var i = 0; i < input.length; i += 4) {
          output.push({
            ...row,
            type: input[i],
            amount: input[i+1].split(' ')[0].replace(',', '.'),
            currency: input[i+1].split(' ')[1],
            xDate: input[i+2],
            payoutDate: input[i+3].trim(),
          })
        }
          
        return output
      }))

    return Promise.all(priceData$);
  })
  .then(response => response.reduce((acc, v) => acc.concat(v), []))
  .then(response => writeJsonFile('scrape/avanza-dividend.json', response))
  .catch(error => console.log('error', error))

