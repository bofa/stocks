import React from 'react'
import { fromJS } from 'immutable'
import { AppContext } from '../AppContext'
import NavbarInteractiveGraph from './NavbarInteractiveGraph'

// https://codepen.io/nasrullahs/pen/QKYZdO

const paddingGroups = 40;
const viewBoxWidth = 1200;
const viewBoxHeigth = 1000;

class Sample extends React.Component {

  static contextType = AppContext

  constructor() {
    super();
    this.state = {
      // historic: [[100, 8, -10], [10, 8, -10], [30, -100, 15]],
      // projection: [[10, 18], [12, 10], [-10, 10], [10, 10*Math.random()]],

      estimateAdjusted: fromJS([40, 20, 100])
    };
  }

  render() {
    const { companies, match, projectionTime, estimationTime } = this.props
    // const { historic, projection } = this.state

    const company = companies
      .find(company => company.get('ShortName') === match.params.id)
      // .set('estimateAdjusted', this.state.estimateAdjusted)
   
    const estimateFunc = company.get('estimateFunc')

    // console.log('props', this.props, match.params.id)
    // console.log('state', this.state)
    // console.log('companies', companies.toJS())
    // console.log('company', company.toJS())
    // console.log('company.get(revenue)', company.get('revenue').toJS())

    const historic = company.get('revenue')
      .map((r, i) => fromJS([
        {
          value: r,
          fill: r > 0 ? '#123456' : 'red',
        }, {
          value: company.getIn(['freeCashFlow', i]),
          fill: company.getIn(['freeCashFlow', i]) > 0 ? '#0eefcd' : 'red',
        }, {
          value: company.getIn(['earnings', i]),
          fill: company.getIn(['earnings', i]) > 0 ? '#2d578b' : 'red',
        }, {
          value: company.getIn(['dividend', i]),
          fill: company.getIn(['dividend', i]) > 0 ? '#035C43' : 'red',
        }
      ]))
      .toJS()

    // TODO Diffrent color if modified
    const projection = new Array(projectionTime)
      .fill(0)
      .map((v, i) => isNaN(company.getIn(['estimateAdjusted', i]))
        ? { value: estimateFunc(i), fill: "#035C43" }
        : { value: company.getIn(['estimateAdjusted', i]), fill: "#145C23" }
      )
      .map((o, i) => [{
        ...o,
        onMouseDown: (e) => startDrag(e, i)
      }])

    const values = historic.concat(projection).flat().map(g => g.value)

    const maxValue = Math.max(0, ...values)
    const minValue = Math.min(0, ...values)

    const yScaleFactor = viewBoxHeigth/(maxValue - minValue)
    const zeroLevel = maxValue*yScaleFactor

    const groups = historic.length + projection.length
    const groupWidth = (viewBoxWidth - paddingGroups * groups) / groups

    const transform = (n, v) => ({
      x: paddingGroups*(n) + groupWidth*(n + 0.5),
      y: zeroLevel - v*yScaleFactor,
    })

    const historicBars = historic
      .concat(projection)
      .map((group, groupIndex) =>
        group.map((bar, barIndex) => ({
        x: paddingGroups*(groupIndex) + groupWidth*(groupIndex + barIndex/group.length),
        y: bar.value > 0 ? zeroLevel - bar.value*yScaleFactor : zeroLevel,
        width: 10,
        height: Math.abs(bar.value)*yScaleFactor,
        fill: bar.fill,
        onMouseDown: bar.onMouseDown,
      })))
      .flat()  

    const startLineN = historic.length - estimationTime
    const stopLineN = historic.length + projectionTime

    const startLine = transform(startLineN, estimateFunc(-estimationTime))
    const stopLine = transform(stopLineN, estimateFunc(projectionTime))

    const startDrag = (event, index) => {
      event.preventDefault();
  
      const mouseup = (event) => {
        let cursorPoint = this.svg.createSVGPoint();
        cursorPoint.x = event.clientX;
        cursorPoint.y = event.clientY;
        cursorPoint = cursorPoint.matrixTransform(this.svg.getScreenCTM().inverse());
        const y = cursorPoint.y
        const value = (zeroLevel - y) / yScaleFactor

        this.props.setEstimateAdjusted(company.get('ShortName'), index, value)
        
        document.removeEventListener("mouseup", mouseup);
      };
  
      document.addEventListener("mouseup", mouseup);
    };

    return (
      <div>
        <NavbarInteractiveGraph company={company} onHome={() => this.props.history.goBack()} />
        <div style={{ margin: 20}}>
          <svg width="100%" height="100%" viewBox={`0 0 ${viewBoxWidth} ${viewBoxHeigth}`} ref={(svg) => this.svg = svg}>
            {historicBars.map((bar, i) => 
              <rect {...bar} key={i}
              ></rect>
            )}
            <line
              x1={startLine.x} y1={startLine.y}
              x2={stopLine.x} y2={stopLine.y}
              fill="transparent"
              stroke="gray"
              strokeWidth="4"
              strokeDasharray="5,5"
              key="line"
            />
          </svg>
        </div>
      </div>
    )
  }
}

export default Sample;
