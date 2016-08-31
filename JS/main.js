'use strict';

import React from 'react';
import ReactDOM from 'react-dom';
import Table from './table_component.js';

{
  let totalTable = document.getElementById('totales');

  if (!!totalTable)
    ReactDOM.render(<Table/>, totalTable);

}
