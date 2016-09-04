'use strict';

import React from 'react';
import axios from 'axios';

 var Table = React.createClass({
   createTable: function (array) {
      return array.map(function (item, index) {
                          return (
                              <tr key={index}>
                                <td>{item.name}</td>
                                <td className="text-right">{item.quantity}</td>
                              </tr>
                            )
                        });
   },
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
     let elements = this.state.elements,
         self = this;
     return (
           <div className="container-fluid">
             {
               elements.map(function (item, index) {
                 return (
                         <div className="row" key={index}>
                           <div className="col-xs-12 col-md-8 col-md-offset-2">
                              <h2>{item.name}</h2>
                              <table>
                                <thead>
                                  <tr>
                                    <th>Nombre</th>
                                    <th className="text-right">Cantidad en Kg</th>
                                  </tr>
                                </thead>
                                <tbody>
                                  {self.createTable(item.total)}
                                </tbody>
                              </table>
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
