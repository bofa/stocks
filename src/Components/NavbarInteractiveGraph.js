import React, { memo } from 'react';
import { Button, Popover, RangeSlider, Checkbox, Navbar } from "@blueprintjs/core";

function component(props) {
  const { name, estimate, onHome } = props

  return (
    <Navbar>
      <Navbar.Group align="left">
        <Button className="bp3-minimal" icon="home" onClick={() => onHome()} />
        <Navbar.Heading>{name}</Navbar.Heading>
        <Navbar.Divider />
        <div>
          Estimate: {(100 * estimate).toFixed(1)} %/y
        </div>
      </Navbar.Group>
    </Navbar>
  )
}

// function arePropsEqual(prevProps, nextProps) {
//   return prevProps.companies.size === nextProps.companies.size; 
// }

export default memo(component)
