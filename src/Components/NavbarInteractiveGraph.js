import React, { memo } from 'react';
import { Button, Popover, RangeSlider, Checkbox, Navbar } from "@blueprintjs/core";

function component(props) {
  const { company, onHome } = props

  return (
    <Navbar>
      <Navbar.Group align="left">
        <Button className="bp3-minimal" icon="home" onClick={() => onHome()} />
        <Navbar.Heading>{company.get('Name')}</Navbar.Heading>
        <Navbar.Divider />
        <div>
          Estimate: {(100 * company.get('estimate')).toFixed(1)}%/y
        </div>
        <Navbar.Divider />
        <div>
          Fitt: {(100 * company.get('fitt')).toFixed(1)}%
        </div>
      </Navbar.Group>
    </Navbar>
  )
}

// function arePropsEqual(prevProps, nextProps) {
//   return prevProps.companies.size === nextProps.companies.size; 
// }

export default memo(component)
