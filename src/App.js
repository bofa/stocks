import React from 'react'
import { Route } from 'react-router'
import axios from 'axios'
import { fromJS } from 'immutable'
import { Slider, Checkbox, Button, Popover, Navbar } from "@blueprintjs/core";

// import { AppContext } from './AppContext'
import StockTable from "./Components/StockTable"
import GraphInteractive from './Components/GraphInteractive'
import { dividendEstimate, leastSquarceEstimate } from './Services/statistics'

// import Index from './views/Index';
// import Company from './views/Company';
// import Return from './views/Return';
// import Validation from './views/Validation';

// TODO https://reacttraining.com/react-router/web/guides/scroll-restoration

class Routes extends React.Component {

  state = {
    selected: 'avanza',
    estimateType: 'earnings',
    revenueGrowth: true,
    earningsGrowth: true,
    fittRange: [0, 1],
    dividendRatioRange: [0, 1],
    peRange: [0, 100],
    yieldRange: [0, 0.2],
    projectionTime: 5,
    estimationTime: 4,

    companiesExternal: fromJS({}),
    companiesInternal: fromJS({
      // "NOVU": {
      //   yield: 2
      // },
    })
  }

  componentDidMount() {
    axios.get("https://bofa.github.io/stock-prediction/earnings.json")
      .then(response => {
        const companiesAsObject = response.data
          .reduce((acc, cur, i) => {
            acc[cur.ShortName] = cur;
            return acc;
          }, {});
        
        this.setState({
          companiesExternal: fromJS(companiesAsObject)
        })
      })
  }

  render() {
    const { projectionTime, estimationTime, companiesExternal, companiesInternal, estimateType, revenueGrowth, earningsGrowth, fittRange, dividendRatioRange, peRange, yieldRange } = this.state

    // const revenueGrowth = true
    // const earningsGrowth = true

    // console.log('state', this.state)
    // console.log('companiesInternal', companiesExternal.toJS(), companiesInternal.toJS())

    if(companiesExternal.size < 1) {
      return null
    }

    const mergedCompanies = companiesExternal
      .filter(company => company.has('earnings') && company.get('earnings').size >= estimationTime )
      // .filter(company => company.getIn([estimateType]) && company.getIn([estimateType]).size >= projectionTime)
      .map(company => {
        // const leverageType = ''
        // const [leverage, cost, type] = parseMargin(leverageType, company);
        
        const { estimate, fitt, estimateFunc } = dividendEstimate(company, projectionTime, 0, estimateType, estimationTime)

        const revenueLs  = leastSquarceEstimate(company.get('revenue').slice(-estimationTime).toJS())
        const earningsLs = leastSquarceEstimate(company.get('earnings').slice(-estimationTime).toJS())

        return company
          .set('estimate', estimate / company.get('price') / company.getIn(['numberOfStocks', -1]))
          .set('estimateFunc', estimateFunc)
          .set('fitt', fitt)
          .set('revenueLs', fromJS(revenueLs))
          .set('earningsLs', fromJS(earningsLs))
          // .set('estimate', dividendEstimate(company, projectionTime, 0) / company.get('price') / company.getIn(['numberOfStocks', -1]), 0)
          // .set('earningsEstimate', leverage*earningsEstimate(company, projectionTime) - cost)
          // .set('earningsEstimate', earningsEstimate(company, projectionTime))
          .set('yield', company.getIn(['dividend', -1]) / company.getIn(['price']) / company.getIn(['numberOfStocks', -1]))
          .set('pe', company.getIn(['price']) * company.getIn(['numberOfStocks', -1]) / company.getIn(['earnings', -1]))
          .set('borsdataLink', `https://borsdata.se/${company.get('CountryUrlName')}/nyckeltal`)
      })
      .filter(company => !revenueGrowth || company.getIn(['revenueLs', 'slope']) > 0)
      .filter(company => !earningsGrowth || company.getIn(['earningsLs', 'slope']) > 0)
      .mergeDeep(companiesInternal)
      .filter(company => company.get('fitt') >= fittRange[0] && company.get('fitt') <= fittRange[1])
      .filter(company => company.get('pe') >= peRange[0] && company.get('pe') <= peRange[1])
      .filter(company => company.get('yield') >= yieldRange[0] && company.get('yield') <= yieldRange[1])
      .filter(company => company.get('avgDividendRatio') >= dividendRatioRange[0] && company.get('avgDividendRatio') <= dividendRatioRange[1])
      .toList()

    console.log('mergedCompanies', mergedCompanies.toJS())

    const filterSettings = {
      fittRange, dividendRatioRange, peRange, yieldRange
    }

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

      <Route key="routeTable" path="/" exact render={props => <StockTable key="table" {...props} companies={mergedCompanies} {...filterSettings} onChange={param => this.setState(param)} />} />,
      <Route key="routeGraph" path="/:id" exact render={props => <GraphInteractive key="graph" {...props} estimationTime={estimationTime} projectionTime={projectionTime} companies={mergedCompanies} />} />
    ]
  }
}

export default Routes