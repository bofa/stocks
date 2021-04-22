import axios from 'axios';
import { fromJS, List, Map } from 'immutable';
import writeJsonFile from 'write-json-file';
import { leastSquarceEstimate } from '../src/Services/statistics';
import axiosRetry from 'axios-retry';
import { cookie as Cookie } from './keys';

axiosRetry(axios, { retries: 3 });

function toNumber (string) {
  return Number(string
    .replace(',', '.')
    .replace(/\s/g, ''));
}

function formatAnalysisReport(response) {
  return fromJS(response.data).update('Rows', rows => rows.map(row => row.update('Data', data => data.map(toNumber))));
}

function formatKpisResponseSingle (response) {
  const data = fromJS(response.data);

  // const Sparkline = data.get('Data').map((value, index, array) => new Map({
  //   year: currentYear + index - array.length,
  //   yield: Number(value)
  // }));

  // return data.set('Sparkline', Sparkline);
  return data;
}

function formatStockPriceData (response) {
  const range = fromJS(response).slice(-90).map(item => item.get('y'));
  const { slope } = leastSquarceEstimate(range.toJS());
  const relativeSlope = slope / range.get(-1);

  return {
    price: response[response.length-1].y,
    stockPriceMomentum: relativeSlope
  };
}

function consolePipe (pipe, override) {
  console.log('pipe', pipe);

  if(override) {
    return override;
  }
  return pipe;
}

function call(comp) {
  return Promise.all([axios.get(`https://borsdata.se/api/AnalysisReport?analysisTime=0&analysisType=1&companyUrl=${comp.CountryUrlName}`, { headers: { Cookie }})
      .then(r => r.data)
      .catch(() => consolePipe('Error1! ' + comp.CountryUrlName, [])),
    axios.get(`https://borsdata.se/api/AnalysisHighChartSeries?analysisTime=0&companyUrl=${comp.CountryUrlName}&kpiId=63`, {
        headers: { Cookie }})
      .then(r => r.data)
      .catch(error => consolePipe('Error2! ' + error + comp.CountryUrlName, {})),
    axios.get(`https://borsdata.se/api/AnalysisHighChartSeries?analysisTime=0&companyUrl=${comp.CountryUrlName}&kpiId=60`,{
        headers: { Cookie }})
      .then(r => r.data)
      .catch(error => consolePipe('Error3! ' + error + comp.CountryUrlName, {})),
    axios.get(`https://borsdata.se/api/highchart?companyUrlName=${comp.CountryUrlName}`)
      .then(r => r.data)
      .then(formatStockPriceData)
      .catch(() => consolePipe('Error4! ' + error + comp.CountryUrlName, {})),
    axios.get(`https://borsdata.se/api/AnalysisHighChartSeries?analysisTime=0&companyUrl=${comp.CountryUrlName}&kpiId=61`,{
        headers: { Cookie }})
      .then(r => r.data)
      .catch(error => consolePipe('Error5! ' + error + comp.CountryUrlName, {})),
    axios.get(`https://borsdata.se/api/AnalysisHighChartSeries?analysisTime=0&companyUrl=${comp.CountryUrlName}&kpiId=137`,{
        headers: { Cookie }})
      .then(r => r.data)
      .catch(error => consolePipe('Error6! ' + error + comp.CountryUrlName, {}))
  ]);
}

function delayApiCall(comp, delay = 20000) {
  return new Promise((resolve, reject) => {
    setTimeout(() => call(comp)
    .then(
      response => resolve(response),
      reason => reject(reason)),
      delay);
  });
}

axios.post('https://borsdata.se/complist/GetCompanies', {
  "filter":{
    "KpiFilter":[{
      "CategoryId": 9,
      "AdditionalId": 151,
      "KpiId": 151,
      "CalculationType": 2,
      "Calculation": 20,
      "CalcTime": 1
    }],
    "SelectedMarkets": [],
    "SelectedCountries": [1,2,3,4],
    "Page": 0,
    "RowsInPage": 10000,
    "ShowOnlySme": false,
    "ShowOnlyIntroduce": false,
    "CompanyNameOrdering": 0
  }})
  .then(response => response.data.data)
  .then(companyNames => Promise.all(companyNames
    // .filter((v, index) => index < 1)
    // .filter((v, index) => index < 15)
    // .filter((v, index) => v.Name === 'Amazon')
    .map((comp, index) => delayApiCall(comp, 4000*index, index)
      .then(response => {
        if(index % 10 === 0) {
          console.log(index, Math.round(100 * index/companyNames.length) + '%', comp.CountryUrlName);
        }
        return {comp, quaterly: response};
      }))))
  .then(response => writeJsonFile('scrape/quaterly.json', response))
  .then(() => console.log('done quaterly'));
