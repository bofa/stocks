// const csv = require('csv-parser');
import moment, { Moment } from 'moment';
import * as Papa from 'papaparse';
const fs = require('fs').promises;

// interface Transaction {
//   date: Moment,
//   value: number,
// }

const currentValues = [
  23351,
  69300,
]

function cagr(transactions, currentValue) {
  const now = moment();
  let upperCagr =  1000;
  let lowerCagr = -1000;
  let cagr = 0;
  let value = 1;

  console.log('transactions', transactions)
  
  while(Math.abs(value) > 0.1) {
    cagr = (upperCagr + lowerCagr) / 2;
    value = transactions.reduce((s, t) => s + t.value * (1 + cagr) ** (now.diff(t.date, 'y')), 0) + currentValue;
    
    if(value > 0) {
      lowerCagr = cagr;
    } else {
      upperCagr = cagr;
    }
  }

  return cagr;
}

const basePath = './scrape/transactions';

Promise.all([
  fs.readFile(basePath + '/transaktioner_20100203_20210223.csv', { encoding: 'utf-8' })
    .then(csv => Papa.parse(csv, { delimiter: ';', skipEmptyLines: true }).data)
    .then(transactions => transactions.slice(1).map(row => ({
      date: moment(row[0], 'YYYY-MM-DD'),
      value: Number(row[6].replace(',', '.'))
    }))),
  fs.readFile(basePath + '/transaktioner_20100203_20210223_addvise.csv', { encoding: 'utf-8' })
    .then(csv => Papa.parse(csv, { delimiter: ';', skipEmptyLines: true }).data)
    .then(transactions => transactions.slice(1).map(row => ({
      date: moment(row[0], 'YYYY-MM-DD'),
      value: Number(row[6].replace(',', '.'))
    }))),
])
  .then((transatctions) => transatctions.map((trans, i) => cagr(trans, currentValues[i])))
  .then(c => console.log('csv', c))


// fs.createReadStream('data.csv')
//   .pipe(csv())
//   .on('data', (row) => {
//     console.log(row);
//   })
//   .on('end', () => {
//     console.log('CSV file successfully processed');
//   });