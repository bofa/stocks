import axios from 'axios';
import { fromJS, List, Map } from 'immutable';
import writeJsonFile from 'write-json-file';
import { leastSquarceEstimate } from '../src/Services/statistics';
import axiosRetry from 'axios-retry';

axiosRetry(axios, { retries: 3 });

const startTime = new Date();

axios.post('https://borsdata.se/api/terminal/screener/kpis/data', {
  "page": 0,
  "rowsInPage": 5000,
  "nameFilter": "",
  "kpiFilter": [
    {
      "kpiId": 7,
      "calculation": 0,
      "calcTime": 0,
      "categoryId": 11,
      "calculationType": 3,
      "lowPrice": null,
      "highPrice": null
    },
    {
      "kpiId": 151,
      "calculation": 20,
      "calcTime": 1,
      "categoryId": 9,
      "calculationType": 2,
      "lowPrice": null,
      "highPrice": null
    },
    {
      "kpiId": 151,
      "calculation": 20,
      "calcTime": 6,
      "categoryId": 9,
      "calculationType": 2,
      "lowPrice": null,
      "highPrice": null
    },
    {
      "kpiId": 1,
      "calculation": 1,
      "calcTime": 0,
      "categoryId": 0,
      "calculationType": 2,
      "lowPrice": null,
      "highPrice": null
    },
    {
      "kpiId": 2,
      "calculation": 1,
      "calcTime": 0,
      "categoryId": 0,
      "calculationType": 2,
      "lowPrice": null,
      "highPrice": null
    },
    {
      "kpiId": 3,
      "calculation": 1,
      "calcTime": 0,
      "categoryId": 0,
      "calculationType": 2,
      "lowPrice": null,
      "highPrice": null
    },
    {
      "kpiId": 4,
      "calculation": 1,
      "calcTime": 0,
      "categoryId": 0,
      "calculationType": 2,
      "lowPrice": null,
      "highPrice": null
    },
    {
      "kpiId": 12,
      "calculation": 0,
      "calcTime": 0,
      "categoryId": 11,
      "calculationType": 3,
      "lowPrice": null,
      "highPrice": null
    },
    {
      "kpiId": 2,
      "calculation": 0,
      "calcTime": 0,
      "categoryId": 11,
      "calculationType": 3,
      "lowPrice": null,
      "highPrice": null
    },
    {
      "kpiId": 1,
      "calculation": 0,
      "calcTime": 0,
      "categoryId": 11,
      "calculationType": 3,
      "lowPrice": null,
      "highPrice": null
    },
    {
      "kpiId": 5,
      "calculation": 0,
      "calcTime": 0,
      "categoryId": 11,
      "calculationType": 3,
      "lowPrice": null,
      "highPrice": null
    }
  ],
  "watchlistId": null,
  "selectedCountries": [
    1,
    2,
    3,
    4
  ],
  "companyNameOrdering": 0
})
.then(response => response.data.data)
.then(companyNames => Promise.all(companyNames
  // .filter((v, index) => index < 1)
  // .filter((v, index) => index < 30)
  // .filter((v, index) => v.name === 'Hennes & Mauritz')
  .map((comp, index) => delayApiCall(comp, 365*index, index)
    .then(response => {
      // console.log('response', response);

      if(index % 10 === 0) {
        const currentTimeMin = (new Date() - startTime) / 1000 / 60;
        console.log(index, Math.round(100 * index/companyNames.length) + '%', Math.round(currentTimeMin) + 'min', comp.name);
      }
      return { comp, quaterly: response[0], price: response[1] };
    })
    .catch(error => {
      console.error('error', error)
      return { comp }
    })
  )
))
.then(response => writeJsonFile('scrape/quaterly.json', response, { indent: 2 }))
.then(() => console.log('done quaterly'))
.catch(error => console.error('error', error));

function delayApiCall(comp, delay = 20000) {
  return new Promise((resolve, reject) => {
    setTimeout(() => call(comp)
      .then(
        response => resolve(response),
        reason => reject(reason))
    , delay);
  });
}

function call(comp) {
  const id = comp.companyId;
  const quaterly$ =  axios.post(`https://borsdata.se/api/terminal/instruments/${id}/analysis/history`, 
  // return axios.post(`https://borsdata.se/api/terminal/instruments/${comp.companyId}/estimations/kpisHistory`, 
    {
      "periodType": 0,
      "years": 10,  
      "kpis": [1, 7, 53, 56, 60, 61, 63, 137].map(id => ({
        id,
        "priceType": 1,
        "growthCalcType": 0
      }))
    })
    .then(r => r.data);

  const priceHistory$ = axios.get(`https://borsdata.se/api/instrumentsbasic/instruments/${id}/ratios/widgets/spHistWd?interval=all&index=627`)
    .then(r => r.data.chartData.valuesStockPrice)
    .then(price => formatStockPriceData(price))

  return Promise.all([quaterly$, priceHistory$])
}

function formatStockPriceData (response) {
  const range = fromJS(response).slice(-90);
  const { slope } = leastSquarceEstimate(range.toJS());
  const relativeSlope = slope / range.get(-1);

  return {
    price: range.get(-1),
    stockPriceMomentum: relativeSlope
  };
}

function consolePipe (pipe, override) {
  console.log('pipe', pipe);

  if (override) {
    return override;
  }

  return pipe;
}