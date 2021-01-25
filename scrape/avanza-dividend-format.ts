const fs = require('fs').promises;
const promise = require('promise');
const moment = require('moment');

const outputDir = 'scrape/output'

if (!require('fs').existsSync(outputDir)){
  require('fs').mkdirSync(outputDir);
}

const saveFiles = [
  {
    filename: outputDir + '/dividend2021.txt',
    year: 2021
  },
  {
    filename: outputDir + '/dividend2022.txt',
    year: 2022
  },
]

Promise.all([
  fs.readFile('./scrape/avanza-dividend.json', {encoding: 'utf-8'}).then(JSON.parse),
  fs.readFile('./scrape/manual-dividend.json', {encoding: 'utf-8'}).then(JSON.parse),
])
  .then(files => files.reduce((arr, file) => arr.concat(file), []))
  .then(dividends => {
    saveFiles.forEach(({filename, year}) => {
      const rows = dividends
        .filter(dividend => moment(dividend.xDate).year() === year)
        .sort((a, b) => moment(a.xDate) - moment(b.xDate) || a.name.localeCompare(b.name))
        .map(dividend => [dividend.name, dividend.key, dividend.amount, dividend.xDate])
        .map(dividend => dividend.join('\t'))

      fs.writeFile(filename, rows.join('\n'))
    })
  })
  .catch(error => console.log('error', error))

Promise.all([
  fs.readFile('./scrape/avanza-dividend.json', {encoding: 'utf-8'}).then(JSON.parse),
  fs.readFile('./scrape/manual-dividend.json', {encoding: 'utf-8'}).then(JSON.parse),
])
  .then(files => files.reduce((arr, file) => arr.concat(file), []))
  .then(rows => rows.map(row => ({ ...row, xDate: moment(row.xDate) })))
  .then((dividends) => {
    const filename = outputDir + '/dividend-latest.txt'
    const rows = dividends
      .sort((a, b) => b.xDate - a.xDate)

    const filteredDividends = rows.map(row => row.key)
      .filter((value, index, self) => self.indexOf(value) === index)
      .map(key => rows
        .filter(row => row.key === key)
        .filter((row, index, self) => row.xDate.isAfter(self[0].xDate.clone()
          .subtract(11, 'months')
          .subtract(3, 'days')))
      ).reduce((arr, rows) => arr.concat(rows), [])
      .sort((a, b) => a.xDate - b.xDate || a.name.localeCompare(b.name))

    const dividendsFormatted = filteredDividends.map(dividend => [dividend.name, dividend.key, dividend.amount, dividend.xDate.format('YYYY-MM-DD')])
      .map(dividend => dividend.join('\t'))

    fs.writeFile(filename, dividendsFormatted.join('\n'))
  })
  .catch(error => console.log('error', error))