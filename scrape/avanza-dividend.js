const writeJsonFile = require('write-json-file');
const axiosRetry = require('axios-retry');

const cheerio = require('cheerio');
const axios = require('axios');
// const { TimeoutError } = require('puppeteer');
// const { exception } = require('console');

axiosRetry(axios, { retries: 3 });

function pipe(arg) {
  console.log('pipe', arg);
  return arg;
}

function sleeper(ms) {
  return (x) => new Promise(resolve => setTimeout(() => resolve(x), ms));
}

function fetchSheet() {
  const key = 'AIzaSyC8N3IAsa8l-D_bEQbEM1G8-ZVhkzWMpKM'

  return axios.get('https://sheets.googleapis.com/v4/spreadsheets/183-e_Hf_ZLD4D-91TtqpI35C6TQO_HanD-NKg-XjvAY/values/Companies?alt=json&key=' + key);
  // return axios.get('https://spreadsheets.google.com/feeds/list/183-e_Hf_ZLD4D-91TtqpI35C6TQO_HanD-NKg-XjvAY/od6/public/values?alt=json');
}

const startTime = Date.now();

fetchSheet()
  // .catch(err => {
  //   console.log('Error', err)
  //   return new Promise(resolve => setTimeout(() => resolve(fetchSheet()), 2000))
  // })
  // .then(response => response.data.feed.entry
  //   .map(row => ({
  //     pageAvanza: row['gsx$pageavanza']['$t'],
  //     key: row['gsx$key']['$t'],
  //     name: row['gsx$namn']['$t'],
  //   }))
  //   .filter(row => row.pageAvanza.length > 0))
  // .then(respone => {
  //   console.log(respone.data.values)
  //   return respone
  // })
  .then(response => response.data.values
      .slice(1)
      .map(row => ({
        pageAvanza: row[15],
        key: row[1],
        name: row[0],
      }))
      .filter(row => row.pageAvanza && row.pageAvanza.length > 0)
  ).then(rows => {
    // console.log('rows', rows);

    if (!rows || rows.length < 1) {
      throw new exception('Fetch data is empty');
    }

    const priceData$ = rows
      // Debug
      // .slice(0,1)
      .map((row, rowIndex) => sleeper(120 * rowIndex)()
      //                     https://www.avanza.se/aktier/gamla-aktiesidan.html/5465/axfood
        .then(() => axios.get(`https://www.avanza.se/_api/market-guide/stock/${row.pageAvanza.split('/')[1]}/details`))
        .then(response => [...response.data.dividends.pastEvents, ...response.data.dividends.events].map(dividend => ({
          ...row,
          type: dividend.dividendType,
          amount: dividend.amount,
          currency: dividend.currencyCode,
          xDate: dividend.exDate,
          payoutDate: dividend.paymentDate,
        })))
        .catch(error => [])
      )
      // .then(() => axios.get('https://www.avanza.se/aktier/gamla-aktiesidan.html' + row.pageAvanza))
      // .then(response => cheerio.load(response.data))
      // .then($ => {
      //   const input = []
      //   const output = []

      //   console.log(row.key)

      //   // $("aza-dividends")
      //   // $("aza-dividends > table > tbody > tr > td")
      //   $(".dividends > div.content > table > tbody > tr > td")
      //     .each((index, element) => {
      //       // console.log('element', element)
      //       input.push($(element).text())
      //     })

      //   // console.log('input', input)

      //   for (var i = 0; i < input.length; i += 4) {
      //     output.push({
      //       ...row,
      //       type: input[i],
      //       amount: input[i+1].split(' ')[0].replace(',', '.'),
      //       currency: input[i+1].split(' ')[1],
      //       xDate: input[i+2],
      //       payoutDate: input[i+3].trim(),
      //     })
      //   }
          
      //   return output
      // }))

    return Promise.all(priceData$);
  })
  .then(response => response.reduce((acc, v) => acc.concat(v), []))
  // .then(response => { console.log(response); return response; })
  .then(response => writeJsonFile('scrape/avanza-dividend.json', response))
  .then(() => console.log('Time', (Date.now() - startTime) / 1000))
  .catch(error => console.log('error', error))

