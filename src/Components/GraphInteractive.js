import React from 'react'
import { AppContext } from '../AppContext'
import { List } from 'immutable'

// https://codepen.io/nasrullahs/pen/QKYZdO

const paddingGroups = 50;
const viewBoxWidth = 1200;
const viewBoxHeigth = 1000;

class Sample extends React.Component {

  static contextType = AppContext

  constructor() {
    super();
    this.state = {
      // historic: [[100, 8, -10], [10, 8, -10], [30, -100, 15]],
      // projection: [[10, 18], [12, 10], [-10, 10], [10, 10*Math.random()]],

      points: [
        { x: 30, y: 900 },
        { x: 900, y: 900 },
      ]
    };
  }

  render() {
    const { companies, match } = this.props
    // const { historic, projection } = this.state
    const points = this.state.points

    const company = companies.find(company => company.get('ShortName') === match.params.id)

    console.log('props', this.props, match.params.id)
    console.log('state', this.state)
    // console.log('companies', companies.toJS())
    console.log('company', company.toJS())
    console.log('company.get(revenue)', company.get('revenue').toJS())

    const historic = company.get('revenue')
      .map((r, i) => List([r, company.getIn(['earnings', i]), company.getIn(['freeCashFlow', i])]))
      .toJS()
    const projection = []

    console.log('historic', historic)

    const maxValue = Math.max(0, ...historic.flat(), ...projection.flat())
    const minValue = Math.min(0, ...historic.flat(), ...projection.flat())

    const yScaleFactor = viewBoxHeigth/(maxValue - minValue)
    const zeroLevel = maxValue*yScaleFactor

    const groups = historic.length + projection.length
    const groupWidth = (viewBoxWidth - paddingGroups * groups) / groups

    const historicBars = historic
      .concat(projection)
      .map((historicGroup, historicGroupIndex) =>
      historicGroup.map((historicBar, historicBarIndex) => ({
        x: paddingGroups*(historicGroupIndex) + groupWidth*(historicGroupIndex + historicBarIndex/historicGroup.length),
        y: historicBar > 0 ? zeroLevel - historicBar*yScaleFactor : zeroLevel,
        width: 10,
        height: Math.abs(historicBar)*yScaleFactor,
        fill: historicBar > 0 ? 'blue': 'red',
      })))
      .flat()  

    console.log('historicBars', yScaleFactor, historicBars)

    return (
      <div>
        <svg width="100%" height="100%" viewBox={`0 0 ${viewBoxWidth} ${viewBoxHeigth}`} ref={(svg) => this.svg = svg}>
          {historicBars.map((bar, i) => 
            <rect {...bar} key={i}
            ></rect>
          )}
          <line
            x1={points[0].x} y1={points[0].y}
            x2={points[1].x} y2={points[1].y}
            fill="transparent"
            stroke="gray"
            strokeWidth="4"
            strokeDasharray="5,5"
            key="line"
          />
          {points.map((point, i) =>
            <g transform="translate(-15, -15)" key={i}>
              <rect
                x={point.x}
                y={point.y}
                key={i}
                width="30"
                height="30"
                onMouseDown={(e) => this.startDrag(e, i)}
              />
            </g>
          )}
        </svg>
      </div>
    )
  }

  startDrag = (event, index) => {
    event.preventDefault();

    const mousemove = (event) => {
      event.preventDefault();
      let cursorPoint = this.svg.createSVGPoint();
      cursorPoint.x = event.clientX;
      cursorPoint.y = event.clientY;
      cursorPoint = cursorPoint.matrixTransform(this.svg.getScreenCTM().inverse());
      this.setState({
        points: this.state.points.map(
          (p, i) => (index === i ? {
            x: Math.max(Math.min(cursorPoint.x, 1000), 0),
            y: Math.max(Math.min(cursorPoint.y, 1000), 0)
          } : p))
      })
    };

    const mouseup = (event) => {
      document.removeEventListener("mousemove", mousemove);
      document.removeEventListener("mouseup", mouseup);
    };

    document.addEventListener("mousemove", mousemove);
    document.addEventListener("mouseup", mouseup);
  };
}

export default Sample;
