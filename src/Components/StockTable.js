import React, { } from 'react';
import { immutableMemo } from 'react-immutable-pure-component'
// import { Cell, Column, Table } from "@blueprintjs/table";
import { AnchorButton } from "@blueprintjs/core"

import PopupSlider from './PopupSlider'

function component (props) {

  const history = props.history
  const { companies, onChange, fittRange, dividendRatioRange, peRange, yieldRange } = props;

  // console.log('props', props)

  const renderData = companies
    // .filter(c => c.get('estimate'))
    .sortBy(c => -c.get('estimate'))
    // .filter((c, i) => c.get('yield') > 0)
    // .filter((c, i) => i < 50)
    // .filter((c, i) => c.get('Name') === 'EVRY')

  return (
    <table className="bp3-html-table .modifier" key="insideTable">
      <thead>
        <tr>
          <th>Name</th>
          <th>Estimate</th>
          <th>
            Yield
            <PopupSlider
              onChange={yieldRange => onChange({ yieldRange })} 
              {...yieldRange}
              stepSize={0.01}
              labelStepSize={0.2}
              vertical
            />
          </th>
          <th>
            P/E
            <PopupSlider
              onChange={peRange => onChange({ peRange })} 
              {...peRange}
              stepSize={1}
              labelStepSize={10}
              vertical
            />
          </th>
          <th>
            Avg Div Ratio
            <PopupSlider
              value={dividendRatioRange}
              onChange={dividendRatioRange => onChange({ dividendRatioRange })} 
              {...dividendRatioRange}
              // min={0}
              // max={2}
              stepSize={0.1}
              labelStepSize={0.2}
              vertical
            />
          </th>
          <th>
            Model fitt
            <PopupSlider
              // {...fittRange}
              value={fittRange.value}
              onChange={fittRange => onChange({ fittRange })} 
              min={0}
              max={1}
              stepSize={0.1}
              labelStepSize={0.2}
              vertical
            />
          </th>
          <th>Momentum 90</th>
        </tr>
      </thead>
      <tbody>
        {renderData.map((company, i) => 
          <tr key={i}>
            <td>
              <AnchorButton
                href={company.get('borsdataLink')}
                rightIcon="share"
                target="_blank"
                minimal
              />
              <AnchorButton
                onClick={() => history.push(company.get('ShortName'))}
                // onClick={handleClick}
                // href={company.get('CountryShortName')}
                rightIcon="grouped-bar-chart"
                target="_blank"
                minimal
              >
                {/* <Link to={company.get('CountryShortName')}>Home</Link> */}
              </AnchorButton>
              
              {company.getIn(['Name'])}
            </td>
            <td>{(100*company.getIn(['estimate'])).toFixed(2) + '%'}</td>
            <td>{(100*company.getIn(['yield'])).toFixed(1) + '%'}</td>
            <td>{company.getIn(['pe']).toFixed(2)}</td>
            <td>{(100*company.getIn(['avgDividendRatio'])).toFixed(1) + '%'}</td>
            <td>{company.getIn(['fitt']).toFixed(2)}</td>
            <td>{Math.round(100 * 365  * company.getIn(['stockPriceMomentum'])) + '%'}</td>
          </tr>
        )}
      </tbody>
    </table>
  )
}

// function arePropsEqual(prevProps, nextProps) {
//   return prevProps.companies.size === nextProps.companies.size; 
// }

export default immutableMemo(component)
