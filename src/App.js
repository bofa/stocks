import React from 'react'
import { Route } from 'react-router'
import axios from 'axios'
import { fromJS, Map } from 'immutable'
import { Slider, Checkbox, Button, Popover, Navbar } from "@blueprintjs/core";

import StockTable from "./Components/StockTable"
import GraphInteractive from './Components/GraphInteractive'
import { dividendEstimate, leastSquarceEstimate } from './Services/statistics'

// TODO https://reacttraining.com/react-router/web/guides/scroll-restoration

class Routes extends React.Component {

  constructor() {
    super()

    const localStorageFilterSettings = localStorage.getItem('filterSettings')
    const localStorageCompaniesInternal = localStorage.getItem('companiesInternal')

    this.state = {
      selected: 'avanza',
      estimateType: 'earnings',
      revenueGrowth: true,
      earningsGrowth: true,
      netBrowingDecline: true,

      fittRange: [0, 1],
      dividendRatioRange: [0, 1],
      peRange: [0, 20],
      yieldRange: [0, 0.2],
      projectionTime: 5,
      estimationTime: 4,

      ...JSON.parse(localStorageFilterSettings),

      companiesExternal: Map(),
      companiesInternal: localStorageCompaniesInternal
        ? fromJS(JSON.parse(localStorageCompaniesInternal))
        : Map(),
      companiesSheets: Map()
    }

  }

  componentDidMount() {
    const getEarnings$ = axios.get('https://bofa.github.io/stocks/earnings.json')
    // axios.get('/earnings.json')
      .then(response => fromJS(response.data
          .reduce((acc, cur, i) => {
            acc[cur.ShortName] = cur;
            return acc;
          }, {})))

    getEarnings$.then(companies => this.setState({ companiesExternal: companies }))

    const getAmazingSheets$ = axios.get('https://spreadsheets.google.com/feeds/list/183-e_Hf_ZLD4D-91TtqpI35C6TQO_HanD-NKg-XjvAY/od6/public/values?alt=json')
      .then(response => response.data.feed.entry
        .map(row => [row['gsx$keyborsdata']['$t'], row['gsx$price']['$t']])
        .filter(row => row[0].length > 0))

    Promise.all([getEarnings$, getAmazingSheets$])
      .then(([companies, sheets]) => sheets
        .map(([sheetUrlName, sheetsPrice]) => [
          companies.find(company => company.get('CountryUrlName') === sheetUrlName),
          sheetsPrice,
        ])
        .filter(d => d[0])
        .map(([company, sheetsPrice]) => [company.get('ShortName'), { price: sheetsPrice }])
      )
      .then(d => new Map(d))
      .then(companiesSheets => this.setState({ companiesSheets }))
  }

  render() {
    const {
      projectionTime,
      estimationTime,
      companiesExternal,
      companiesInternal,
      companiesSheets,
      estimateType,
      revenueGrowth,
      earningsGrowth,
      netBrowingDecline,
      fittRange,
      dividendRatioRange,
      peRange,
      yieldRange,
    } = this.state

    if(companiesExternal.size < 1) {
      return null
    }

    // console.log('state', this.state)

    const mergedCompanies = companiesExternal
      // .filter(company => company.has('earnings') && company.get('earnings').size >= estimationTime )
      // .filter(company => company.getIn([estimateType]) && company.getIn([estimateType]).size >= projectionTime)
      .mergeDeep(companiesInternal)
      .mergeDeep(companiesSheets)
      .map(company => {
        // const leverageType = ''
        // const [leverage, cost, type] = parseMargin(leverageType, company);
        
        const { fitt, estimateFunc, dividendRatio } = dividendEstimate(company, projectionTime, 0, estimateType, estimationTime)

        // const dividendEstimateVector = new Array(projectionTime).fill(0).map((v, i) => dividendRatio*earningsEstimateFunc(i))
        // estimate: dividendEstimateVector.reduce((s, v) => s+v) / projectionTime,

        const estimate = new Array(projectionTime)
          .fill(0)
          .map((v, i) => company.getIn(['estimateAdjusted', '' + i]) || estimateFunc(i))
          .reduce((s, v) => s+v)
          / projectionTime

        const revenueLs  = leastSquarceEstimate(company.get('revenue').slice(-estimationTime).toJS())
        const earningsLs = leastSquarceEstimate(company.get('earnings').slice(-estimationTime).toJS())
        const netBrowingLs = leastSquarceEstimate(company.get('netBrowing').slice(-estimationTime).toJS())

        return company
          .set('estimate', estimate / company.get('price') / company.getIn(['numberOfStocks', -1]))
          .set('estimateFunc', estimateFunc)
          .set('fitt', fitt)
          .set('revenueLs', fromJS(revenueLs))
          .set('earningsLs', fromJS(earningsLs))
          .set('netBrowingLs', fromJS(netBrowingLs))
          .set('avgDividendRatio', dividendRatio)
          // .set('estimate', dividendEstimate(company, projectionTime, 0) / company.get('price') / company.getIn(['numberOfStocks', -1]), 0)
          // .set('earningsEstimate', leverage*earningsEstimate(company, projectionTime) - cost)
          // .set('earningsEstimate', earningsEstimate(company, projectionTime))
          .set('yield', company.getIn(['dividend', -1]) / company.getIn(['price']) / company.getIn(['numberOfStocks', -1]))
          .set('pe', company.getIn(['price']) * company.getIn(['numberOfStocks', -1]) / company.getIn(['earnings', -1]))
          .set('borsdataLink', `https://borsdata.se/${company.get('CountryUrlName')}/nyckeltal`)
      }).toList();

      const filterSettings = {
        projectionTime, estimationTime, estimateType, revenueGrowth,
        earningsGrowth, fittRange, dividendRatioRange, peRange,
        yieldRange, netBrowingDecline
      }
  
    const fittValues = mergedCompanies
      .map(c => c.get('fitt'))
      .filter(v => !isNaN(v))

    // const peValues = mergedCompanies
    //   .map(c => c.get('pe'))
    //   .filter(v => !isNaN(v))

    const yieldValues = mergedCompanies
      .map(c => c.get('yield'))
      .filter(v => !isNaN(v))

    const avgDividendRatioValues = mergedCompanies
      .map(c => c.get('avgDividendRatio'))
      .filter(v => !isNaN(v))
      .filter(v => v < 1000)

    const filterSettingsRanges = {
      projectionTime, estimationTime, estimateType, revenueGrowth, netBrowingDecline, earningsGrowth,
      fittRange: { value: fittRange, min: fittValues.min(), max: fittValues.max() },
      dividendRatioRange: { value: dividendRatioRange, min: avgDividendRatioValues.min(), max: avgDividendRatioValues.max() },
      peRange: { value: peRange, min: 0, max: 20 },
      yieldRange: { value: yieldRange, min: yieldValues.min(), max: yieldValues.max() },
    }

    const filteredCompanies = mergedCompanies
      .filter(company => company.has('earnings') && company.get('earnings').size >= estimationTime )
      .filter(company => !revenueGrowth || company.getIn(['revenueLs', 'slope']) > 0)
      .filter(company => !earningsGrowth || company.getIn(['earningsLs', 'slope']) > 0)
      .filter(company => !netBrowingDecline || company.getIn(['netBrowingLs', 'slope']) < 0)
      .filter(company => company.get('fitt') >= fittRange[0] && company.get('fitt') <= fittRange[1])
      .filter(company => (company.get('pe') >= peRange[0] || peRange[0] <= 0)
        && (company.get('pe') <= peRange[1] || peRange[1] === filterSettingsRanges.max))
      .filter(company => company.get('yield') >= yieldRange[0] && company.get('yield') <= yieldRange[1])
      .filter(company => company.get('avgDividendRatio') >= dividendRatioRange[0] && company.get('avgDividendRatio') <= dividendRatioRange[1])

    // console.log('mergedCompanies', mergedCompanies.toJS())

    localStorage.setItem('filterSettings', JSON.stringify(filterSettings))
    localStorage.setItem('companiesInternal', JSON.stringify(companiesInternal))

    return [
      <Navbar>
        <Navbar.Group align="left">
            <Navbar.Heading>Stock Prediction</Navbar.Heading>
            <Navbar.Divider />
            <select value={estimateType} onChange={event => this.setState({ estimateType: event.currentTarget.value })}>
              <option value="earnings">Earnings</option>
              <option value="revenue">Revenue</option>
              <option value="freeCashFlow">Free Cash Flow</option>
              <option value="combo">Combo</option>
            </select>

            <Checkbox checked={revenueGrowth} inline label="Revenue Growth" onChange={e => this.setState({ revenueGrowth: e.target.checked })} />
            <Checkbox checked={earningsGrowth} inline label="Earnings Growth" onChange={e => this.setState({ earningsGrowth: e.target.checked })} />
            <Checkbox checked={netBrowingDecline} inline label="Net Borow Decline" onChange={e => this.setState({ netBrowingDecline: e.target.checked })} />

            <Popover content={
              <div width={200} style={{ padding: 10 }}>
                <Slider
                  value={estimationTime}
                  onChange={estimationTime => this.setState({ estimationTime })} 
                  min={2}
                  max={10}
                  stepSize={1}
                  labelStepSize={2}
                  vertical
                  />
              </div>}
            >
              <Button icon="filter" minimal >
                {estimationTime} Est Time
              </Button>
            </Popover>

            <Popover content={
              <div width={200} style={{ padding: 10 }}>
                <Slider
                  value={projectionTime}
                  onChange={projectionTime => this.setState({ projectionTime })} 
                  min={2}
                  max={10}
                  stepSize={1}
                  labelStepSize={2}
                  vertical
                  />
              </div>}
            >
              <Button icon="filter" minimal>
                {projectionTime} Proj Time
              </Button>
            </Popover>

        </Navbar.Group>
      </Navbar>,

      <Route key="routeTable" path="/" exact render={props => <StockTable key="table" {...props} companies={filteredCompanies} {...filterSettingsRanges} onChange={param => this.setState(param)} />} />,
      <Route key="routeGraph" path="/:id" exact render={props =>
        <GraphInteractive key="graph" {...props}
          estimationTime={estimationTime}
          projectionTime={projectionTime}
          companies={mergedCompanies}
          setEstimateAdjusted={(shortName, index, value) => this.setState({
            companiesInternal: this.state.companiesInternal.setIn([shortName, 'estimateAdjusted', index], value)
          })}
        />}
      />
    ]
  }
}

export default Routes