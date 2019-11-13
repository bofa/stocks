import React, { memo } from 'react';
import { immutableMemo } from 'react-immutable-pure-component'
// import { Cell, Column, Table } from "@blueprintjs/table";
import { AnchorButton, Button, Popover, RangeSlider } from "@blueprintjs/core"
// import { AppContext } from '../AppContext';

import PopupSlider from './PopupSlider'
 
function openLink(target) {
  var win = window.open(target.get('borsdataLink')) // , '_blank');
  // win.focus();
}

function component (props) {

  // static contextType = AppContext

  // console.log('table state', this.state, this.props, this.context)

  const { companies, onChange, fittRange, dividendRatioRange, peRange, yieldRange } = props;

  // console.log('companies', companies)

  const renderData = companies
    .filter(c => c.get('estimate'))
    .sortBy(c => -c.get('estimate'))
    // .filter((c, i) => c.get('yield') > 0)
    .filter((c, i) => i < 50)
    // .filter((c, i) => c.get('Name') === 'EVRY')
    
  // const columnValues = renderData.map(company => [
  //     company.get('Name'),
  //     (100*company.getIn(['estimate'])).toFixed(2) + '%',
  //     company.getIn(['fitt']).toFixed(2),
  //     (100*company.getIn(['yield'])).toFixed(1) + '%',
  //     company.getIn(['pe']).toFixed(2),
  //     (100*company.getIn(['avgDividendRatio'])).toFixed(1) + '%',
  //     Math.round(100 * 365  * company.getIn(['stockPriceMomentum'])) + '%',
  //   ])

  // console.log('companies', renderData.toJS())

  const sortToggler = (range, stateName) => (
    <Popover content={
      <div width={200} style={{ padding: 10 }}>
        <RangeSlider
          min={0}
          max={1}
          stepSize={0.1}
          labelStepSize={0.1}
          onChange={range => onChange({ [stateName]: range })}
          value={range}
          vertical
          />
      </div>}
    >
      <Button icon="filter" minimal />
    </Popover>
  )

  return (
    <table class="bp3-html-table .modifier">
      <thead>
        <tr>
          <th>Name</th>
          <th>Estimate</th>
          <th>
            Yield
            <PopupSlider
              value={yieldRange}
              onChange={yieldRange => onChange({ yieldRange })} 
              min={0}
              max={2}
              stepSize={0.01}
              labelStepSize={0.5}
              vertical
            />
          </th>
          <th>
            P/E
            <PopupSlider
              value={peRange}
              onChange={peRange => onChange({ peRange })} 
              min={-100}
              max={100}
              stepSize={1}
              labelStepSize={20}
              vertical
            />
          </th>
          <th>
            Avg Div Ratio
            <PopupSlider
              value={dividendRatioRange}
              onChange={dividendRatioRange => onChange({ dividendRatioRange })} 
              min={0}
              max={2}
              stepSize={0.1}
              labelStepSize={0.1}
              vertical
            />
          </th>
          <th>
            Model fitt
            <PopupSlider
              value={fittRange}
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

  // const columnMap = ['Name', 'estimate', 'yield', 'pe', 'avgDividendRatio', 'fitt', 'stockPriceMomentum']
  // const cellRenderer = (rowIndex, columnIndex) => <Cell>{columnValues.getIn([rowIndex, columnIndex])} </Cell>

  // return [
  //   <Table numRows={renderData.size} bodyContextMenuRenderer={(a) => openLink(renderData.get(a.target.cols[0]))}>
  //     {/* <Column name="Borsdata" cellRenderer={(rowIndex, columnIndex) =>
  //       <Cell>
  //         <AnchorButton
  //           href={renderData.get('borsdataLink')}
  //           rightIcon="share"
  //           target="_blank"
  //           text={"Duplicate this page"}
  //         />
  //       </Cell>
  //     } /> */}
  //     <Column name="Name" cellRenderer={cellRenderer} />
  //     <Column name="Estimate" cellRenderer={cellRenderer} />
  //     <Column name="Model fitt" cellRenderer={cellRenderer} />
  //     <Column name="Yield" cellRenderer={cellRenderer} />
  //     <Column name="P/E" cellRenderer={cellRenderer} />
  //     <Column name="Avg Dividend Ratio" cellRenderer={cellRenderer} />
  //     <Column name="Momentum 90" cellRenderer={cellRenderer} />
  //   </Table>
  // ]
}

// function arePropsEqual(prevProps, nextProps) {
//   return prevProps.companies.size === nextProps.companies.size; 
// }

export default immutableMemo(component)