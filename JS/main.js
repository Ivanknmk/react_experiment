'use strict';

import React from 'react';
import ReactDOM from 'react-dom';
import {navbarInstance} from './header';
import Table from './table_component.js';
import {Manager} from './recipes.js';

ReactDOM.render(navbarInstance, document.getElementById('header'));

{
  let totalTable    = document.getElementById('totales'),
      recipeManager = document.getElementById('recipes-manager');

  if (!!totalTable) {
    ReactDOM.render(<Table/>, totalTable);
  }

  if (!!recipeManager) {
      ReactDOM.render(<Manager/>, recipeManager);
  }
}

/* General */
(function (window, document) {
  let loader = document.getElementById('loader');

  loader.className += ' loaded';

  setTimeout(function () {
    loader.remove();
  }, 500);
})(window, document);
