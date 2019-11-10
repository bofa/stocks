import React from 'react'
import { Route, Redirect } from 'react-router'
import axios from 'axios'
import { fromJS } from 'immutable'
import { Slider } from "@blueprintjs/core";

// import { AppContext } from './AppContext'
import StockTable from "./Components/StockTable"
import GraphInteractive from './Components/GraphInteractive'
import { dividendEstimate, earningsEstimate } from './Services/statistics'

// import Index from './views/Index';
// import Company from './views/Company';
// import Return from './views/Return';
// import Validation from './views/Validation';

// TODO https://reacttraining.com/react-router/web/guides/scroll-restoration

class Routes extends React.Component {

  state = {
    selected: 'avanza',
    estimateType: 'earnings',
    minimumFittDynamic: 0.2,
    minimumFitt: 0.2,
    companiesExternal: fromJS({}),
    companiesInternal: fromJS({
      // "NOVU": {
      //   yield: 2
      // },
    })
  }

  componentDidMount() {
    axios.get("https://bofa.github.io/stocks/earnings.json")
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
    const { companiesExternal, companiesInternal, estimateType, minimumFitt, minimumFittDynamic } = this.state

    const projectionTime = 5;

    // console.log('state', this.state)
    // console.log('companiesInternal', companiesExternal.toJS(), companiesInternal.toJS())

    if(companiesExternal.size < 1) {
      return null
    }

    const mergedCompanies = companiesExternal
      .filter(company => company.getIn([estimateType]) && company.getIn([estimateType]).size >= projectionTime)
      .map(company => {
        // const leverageType = ''
        // const [leverage, cost, type] = parseMargin(leverageType, company);
        
        const { estimate, fitt } = dividendEstimate(company, projectionTime, 0, estimateType)

        return company
          .set('estimate', estimate / company.get('price') / company.getIn(['numberOfStocks', -1]))
          .set('fitt', fitt)
          // .set('estimate', dividendEstimate(company, projectionTime, 0) / company.get('price') / company.getIn(['numberOfStocks', -1]), 0)
          // .set('earningsEstimate', leverage*earningsEstimate(company, projectionTime) - cost)
          // .set('earningsEstimate', earningsEstimate(company, projectionTime))
          .set('yield', company.getIn(['dividend', -1]) / company.getIn(['price']) / company.getIn(['numberOfStocks', -1]))
          .set('pe', company.getIn(['price']) * company.getIn(['numberOfStocks', -1]) / company.getIn(['earnings', -1]))
          .set('borsdataLink', `https://borsdata.se/${company.get('CountryUrlName')}/nyckeltal`)
      })
      .mergeDeep(companiesInternal)
      .filter(company => company.get('fitt') > minimumFitt)
      .toList()

    return [
      <nav class="bp3-navbar .modifier">
        <div class="bp3-navbar-group bp3-align-left">
          <div class="bp3-navbar-heading">Prediction</div>
          <div class="bp3-select .modifier">
            <select value={estimateType} onChange={event => this.setState({ estimateType: event.currentTarget.value })}>
              <option value="earnings">Earnings</option>
              <option value="revenue">Revenue</option>
              <option value="freeCashFlow">Free Cash Flow</option>
            </select>
          </div>
        </div>
        <div class="bp3-navbar-group bp3-align-right">
          <div>
            <Slider
              min={0}
              max={1.0}
              stepSize={0.01}
              labelStepSize={0.14}
              onChange={minimumFittDynamic => this.setState({ minimumFittDynamic })}
              onRelease={minimumFitt => this.setState({ minimumFitt })}
              labelRenderer={val => `${Math.round(val * 100)}%`}
              value={minimumFittDynamic}
            />
          </div>
        </div>
      </nav>,
      <Route path="/" exact render={props => <StockTable {...props} companies={mergedCompanies} />} />,
      <Route path="/:id" exact render={props => <GraphInteractive {...props} companies={mergedCompanies} />} />
    ]
  }
}

export default Routes