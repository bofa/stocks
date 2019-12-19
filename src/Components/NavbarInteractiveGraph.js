import React, { memo } from 'react';
import { Button, Navbar, AnchorButton } from "@blueprintjs/core";

function component(props) {
  const { company, onHome, onClear, onTrash } = props
  const shortName = company.get('ShortName')

  // console.log('company')

  return (
    <Navbar>
      <Navbar.Group align="left">
        <Button minimal icon="home" onClick={() => onHome()} />
        <Navbar.Heading>{company.get('Name')}</Navbar.Heading>
        <Navbar.Divider />
        <AnchorButton
          href={company.get('borsdataLink')}
          rightIcon="share"
          target="_blank"
          minimal
        />
        <Button minimal icon="eraser" onClick={() => onClear(shortName)} />
        <Button minimal icon="trash" onClick={() => onTrash(shortName)} />
        <Navbar.Divider />
        <div>
          Estimate: {(100 * company.get('estimate')).toFixed(1)}%/y
        </div>
        <Navbar.Divider />
        <div>
          Fitt: {(100 * company.get('fitt')).toFixed(1)}%
        </div>
        <Navbar.Divider />
        <div>
          Dividend Ratio: {(100 * company.get('avgDividendRatio')).toFixed(1)}%
        </div>
      </Navbar.Group>
    </Navbar>
  )
}

// function arePropsEqual(prevProps, nextProps) {
//   return prevProps.companies.size === nextProps.companies.size; 
// }

export default memo(component)
