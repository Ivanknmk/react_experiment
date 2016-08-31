'use strict';

import React from 'react';
import axios from 'axios';

 var Table = React.createClass({
   getInitialState: function () {
    return {
      elements: []
    }
   },
   componentDidMount: function () {
     let self = this;
      axios.get('/api/total.json')
        .then(function (resp) {
          if(resp.status === 200 && resp.data instanceof Array) {
            return Promise.resolve(resp.data);
          } else {
            return Promise.reject(resp);
          }
        })
        .then(function (array) {
            self.setState({elements: array})
        })
        .catch(function (resp) {
          console.log(resp);
        });
   },
   render: function () {
     let elements = this.state.elements;
     return (
           <div className="container-fluid">
             {
               elements.map(function (item, index) {
                 return (
                         <div className="row" key={index}>
                           <div className="xs-12">
                              <h2>{item.name}</h2>
                           </div>
                         </div>
                        )
               })
             }
           </div>

        )
   }
 });

export default Table;
/*
<div className="table container-fluid" data-state={this.state.state}>
    Something
  </div>
*/
