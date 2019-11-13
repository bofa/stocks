import React from 'react';
import { immutableMemo } from 'react-immutable-pure-component'
// import { Cell, Column, Table } from "@blueprintjs/table";
import { Button, Popover, RangeSlider } from "@blueprintjs/core";
// import { AppContext } from '../AppContext';

function component(props) {
  return (
    <Popover content={
      <div width={200} style={{ padding: 10 }}>
        <RangeSlider
          {...props}
          />
      </div>}
    >
      <Button icon="filter" minimal />
    </Popover>
  )
}

// function arePropsEqual(prevProps, nextProps) {
//   return prevProps.companies.size === nextProps.companies.size; 
// }

export default immutableMemo(component)
