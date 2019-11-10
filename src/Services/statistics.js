/**
 * @param {} values -
 *
 * http://mathworld.wolfram.com/LeastSquaresFitting.html
 */
export function leastSquarceEstimate(values) {
  // values = removeOutliers(values);
  const N = values.length;

  var mt = values.reduce((sum, item, n) => sum + n, 0) / N;
  var mx = values.reduce((sum, item, n) => sum + item, 0) / N;

  var sstt = values.reduce((sum, item, n) => sum + (n - mt) * (n - mt), 0);
  var ssxx = values.reduce((sum, item, n) => sum + (item - mx) * (item - mx), 0);
  var sstx = values.reduce((cov, item, n) => cov + n * item, 0) - N * mt * mx;

  var slope = sstx / sstt;
  // var variance = (ssxx - slope * sstx) / (N - 2);

  // if(N < 4) {
  //   return [mx, 0, Math.sqrt(variance)];
  // }

  // return [mx - slope*mt + (N-1)*slope, slope, Math.sqrt(ssxx), sstx * sstx / sstt / ssxx];
  return {
    biasStart: mx,
    biasEnd: mx - slope*mt + (N-1)*slope,
    slope,
    std: Math.sqrt(ssxx),
    fitt: sstx * sstx / sstt / ssxx,
  }
}

export function earningsEstimate(earningsLs, netBrowing, projectionTime, intrest=0) {
  const { biasEnd, slope } = earningsLs;

  return (biasEnd + projectionTime*slope/2 - Math.max(netBrowing, 0)*intrest);
}

export function dividendEstimate(company, projectionTime, intrest, type) {
  const companyJs = company.toJS();
  const { avgDividendRatio, netBrowing, earnings } = companyJs;
  const dividendRatio = Math.min(avgDividendRatio, 0.8);

  const estimationSeries = companyJs[type];

  if(estimationSeries === undefined || estimationSeries.length < projectionTime) {
    return NaN
  }

  const typeLs = leastSquarceEstimate(estimationSeries.slice(earnings.length-projectionTime, earnings.length))

  return {
    estimate: dividendRatio * earningsEstimate(typeLs, netBrowing, projectionTime, intrest),
    fitt: typeLs.fitt,
  }
}

export function yearsToPayOff(company) {
  const { earningsLs, avgDividendRatio, price } = company.toJS();
  const dividendRatio = Math.min(avgDividendRatio, 0.8);

  const [bias, slop, cov] = earningsLs;
  return price / dividendRatio / (bias + slop/2);
}

export function getProjection(company, projectionTime, type = 'earningCashFlowMergeLs') {
  const companyJs = company.toJS();
  const { avgDividendRatio, netBrowing } = companyJs;
  const dividendRatio = Math.min(avgDividendRatio, 0.8);

  const [bias, slop, cov] = companyJs[type];
  return Array.from(Array(projectionTime), (e,i) => ({
    year: 'Not Set',
    revenue: 0,
    freeCashFlow: 0,
    earnings: bias + (i+1)*slop,
    dividend: dividendRatio * (bias + (i+1)*slop)
  }));
}
