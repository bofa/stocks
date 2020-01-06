import quaterly from './quaterly.json';
import { fromJS } from 'immutable';
import writeJsonFile from 'write-json-file';
import { leastSquarceEstimate } from '../src/Services/statistics';

function toNumber (string) {
  return Number(string
    .replace(',', '.')
    .replace(/\s/g, ''));
}

function formatAnalysisReport(response) {
  return fromJS(response).update('Rows', rows => rows.map(row => row.update('Data', data => data.map(toNumber))));
}

// function formatKpisResponseMain (response) {
//   return fromJS(response).map(item => item.update('Sparkline', lineString => lineString.split(',')
//     .map((value, index, array) => ({
//       year: currentYear + index - array.length,
//       yield: Number(value)
//     }))));
// }

function formatKpisResponseSingle (response) {
  const data = fromJS(response);

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

  return relativeSlope;
}

// 0: Allmän data
// 1: Fritt kassaflöde
// 2: Nettoskuld
// 3: Aktiepris
// 4: Antal Aktier

function reduceCompanyData(structure) {
  const metaData = structure.comp;
  const quaterly = structure.quaterly;

  try {
      // console.log('company', company.toJS());
      // const priceObj = priceArray
        // .find(screenerCompany => screenerCompany.ShortName === metaData.ShortName);

    // TODO fix!
    // const converstionFactor = response[0].getIn(['Headers', 0]) === 'MSEK' ? 1e6 : 1;
    const converstionFactor = 1e6;
    const numberOfStocks = quaterly[4].Data;

    const general = formatAnalysisReport(quaterly[0]);

    const dividend = general.getIn(['Rows', 8, 'Data'])
      .map((value, index) => value * numberOfStocks[index])
      .toJS();
    const earnings = general.getIn(['Rows', 1, 'Data']).toJS();
    const revenue = general.getIn(['Rows', 0, 'Data']).toJS();

    const freeCashFlow = formatKpisResponseSingle(quaterly[1]).getIn(['Data']).toJS();

    // const solidity = response[1].getIn(['Data', -1]);

    const netBrowing = formatKpisResponseSingle(quaterly[2]).getIn(['Data']).toJS();

    // const price = quaterly[3][quaterly[3].length-1].y;
    // const stockPriceMomentum = formatStockPriceData(quaterly[3]);
    const { price, stockPriceMomentum } = quaterly[3];

    const historyLength =  revenue.length;

    const avgDividendRatio = dividend
      .map((d, i) => d / earnings[i])
      .filter(dividendRatio => dividendRatio > 0 && dividendRatio < 2)
      .reduce((out, ratio, i, array) => out + ratio/array.length, 0);

    const avgEarnings = earnings
      .reduce((out, ratio, i, array) => out + ratio/array.length, 0);

    const avgRevenue = revenue
      .reduce((out, ratio, i, array) => out + ratio/array.length, 0);

    const earningsLs = leastSquarceEstimate(earnings
        // .filter(value => value !== 0)
      );

    const revenueLs = leastSquarceEstimate(revenue
      // .filter(value => value !== 0)
    );

    const freeCashFlowLs = leastSquarceEstimate(freeCashFlow);

    const earningCashFlowMergeLs = leastSquarceEstimate(earnings
      .map((earning, i) => (earning + freeCashFlow[i]) / 2)
    );

    return {
      ...metaData,
      historyLength,
      price,
      avgDividendRatio,
      dividend,
      earnings,
      avgEarnings,
      earningsLs,
      revenue,
      avgRevenue,
      revenueLs,
      freeCashFlow,
      freeCashFlowLs,
      earningCashFlowMergeLs,
      netBrowing,
      stockPriceMomentum,
      numberOfStocks,
      converstionFactor
    };
  } catch (exception) {
    console.warn('error' + metaData.ShortName, exception);
    return metaData;
  }
}

const formatted = quaterly.map(reduceCompanyData);

writeJsonFile('public/earnings.json', formatted, { indent: null })
  .then(() => console.log('Writing src/images/earnings.json done'));
