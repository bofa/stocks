import React from 'react';
import { Cell, Column, Table } from "@blueprintjs/table";
import { AnchorButton } from "@blueprintjs/core";
import { AppContext } from '../AppContext';
 
class Component extends React.Component {

  // static contextType = AppContext

  render() {
    // console.log('table state', this.state, this.props, this.context)

    const { companies } = this.props;

    var renderData = companies
      .filter(c => c.get('estimate'))
      .sortBy(c => -c.get('estimate'))
      // .filter((c, i) => c.get('yield') > 0)
      .filter((c, i) => i < 20)
      // .filter((c, i) => c.get('Name') === 'EVRY')

    // console.log('companies', renderData.toJS())

    // return (
    //   <table class="bp3-html-table .modifier">
    //     <thead>
    //       <tr>
    //         <th>Name</th>
    //         <th>Estimate</th>
    //         <th>Yield</th>
    //         <th>P/E</th>
    //         <th>Avg Dividend Ratio</th>
    //         <th>Model fitt</th>
    //         <th>Momentum 90</th>
    //       </tr>
    //     </thead>
    //     <tbody>
    //       {renderData.map(company => 
    //         <tr>
    //           <td>{company.getIn(['Name'])}</td>
    //           <td>{(100*company.getIn(['estimate'])).toFixed(2) + '%'}</td>
    //           <td>{(100*company.getIn(['yield'])).toFixed(1) + '%'}</td>
    //           <td>{company.getIn(['pe']).toFixed(2)}</td>
    //           <td>{(100*company.getIn(['avgDividendRatio'])).toFixed(1) + '%'}</td>
    //           <td>{company.getIn(['fitt']).toFixed(2)}</td>
    //           <td>{Math.round(100 * 365  * company.getIn(['stockPriceMomentum'])) + '%'}</td>
    //         </tr>
    //       )}
    //     </tbody>
    //   </table>
    // )

    return [
      <Table numRows={renderData.size} bodyContextMenuRenderer={(a) => this.openLink(renderData.get(a.target.cols[0]))}>
        {/* <Column name="Borsdata" cellRenderer={(rowIndex, columnIndex) =>
          <Cell>
            <AnchorButton
              href={renderData.get('borsdataLink')}
              rightIcon="share"
              target="_blank"
              text={"Duplicate this page"}
            />
          </Cell>
        } /> */}
        <Column name="Name" cellRenderer={(rowIndex, columnIndex) =>
          <Cell>{renderData.getIn([rowIndex, 'Name'])}</Cell>
        } />
        <Column name="Estimate" cellRenderer={(rowIndex, columnIndex) =>
          <Cell>{(100*renderData.getIn([rowIndex, 'estimate'])).toFixed(2) + '%'}</Cell>
        } />
        <Column name="Yield" cellRenderer={(rowIndex, columnIndex) =>
          <Cell>{(100*renderData.getIn([rowIndex, 'yield'])).toFixed(1) + '%'}</Cell>
        } />
        <Column name="P/E" cellRenderer={(rowIndex, columnIndex) =>
          <Cell>{renderData.getIn([rowIndex, 'pe']).toFixed(2)}</Cell>
        } />
        <Column name="Avg Dividend Ratio" cellRenderer={(rowIndex, columnIndex) =>
          <Cell>{(100*renderData.getIn([rowIndex, 'avgDividendRatio'])).toFixed(1) + '%'}</Cell>
        } />
        <Column name="Model fitt" cellRenderer={(rowIndex, columnIndex) =>
          <Cell>{renderData.getIn([rowIndex, 'fitt']).toFixed(2)}</Cell>
        } />
        <Column name="Momentum 90" cellRenderer={(rowIndex, columnIndex) =>
          <Cell>{Math.round(100 * 365  * renderData.getIn([rowIndex, 'stockPriceMomentum'])) + '%'}</Cell>
        } />
      </Table>
    ]
  }
    
  openLink(target) {
    var win = window.open(target.get('borsdataLink')) // , '_blank');
    // win.focus();
  }
}

export default Component;
