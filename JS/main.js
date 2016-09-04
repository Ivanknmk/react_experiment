'use strict';

import React from 'react';
import ReactDOM from 'react-dom';
import {navbarInstance} from './header';
import Table from './table_component.js';

ReactDOM.render(navbarInstance, document.getElementById('header'));


{
  let totalTable = document.getElementById('totales');

  if (!!totalTable)
    ReactDOM.render(<Table/>, totalTable);
}

/* General */
(function () {
  let loader = document.getElementById('loader');

  loader.className += ' loaded';

  setTimeout(function () {
    loader.remove();
  }, 500);
})();
