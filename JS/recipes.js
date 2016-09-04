import React from 'react';
import ReactDOM from 'react-dom';
let ingredients    = null,
    ingredientList = null;

ingredients = [{
                "name": "carne",
                "status": "active"
              }, {
                "name": "vegetales",
                "status": ""
              }, {
                "name": "pescado",
                "status": ""
              }, {
                "name": "despensa",
                "status": ""
              }, {
                "name": "agregar",
                "status": ""
              }];

ingredientList = [{
                    "name": "carne",
                    "list": ["carne roja", "carne blanca"]
                  }, {
                    "name": "vegetales",
                    "list": ["papa", "coliflor", "zanahoria", "arandano", "aguacate", "manzana", "brócoli"]
                  }, {
                    "name": "pescado",
                    "list": ["bacalao", "atún", "calamar"]
                  }, {
                    "name": "despensa",
                    "list": ["pimienta", "sal", "jenjibre", "canela", "menta"]
                  }]


var Manager = React.createClass({
  getInitialState: function () {
    return {
              ingredients: ingredients,
              index: 0
            }
  },
  clickHandlers: function (config) {
    let index         = this.state.index,
        element       = config.name,
        selectedIndex = null;

    ingredients[index].status = '';
    selectedIndex = config.index;
    ingredients[selectedIndex].status = 'active';

    this.setState({ingredients: ingredients, index: selectedIndex});
  },
  render: function () {
    let self           = this,
        classification = this.state.ingredients || [];
    return (<div>
              <div className="container-fluid">
                <ul className="row ingredients list-unstyled">
                {
                  classification.map(function (item, index) {
                    let classItem = `col-xs-2 ${item.status} ${(index === 0)? 'col-xs-offset-1' : '' }`;
                    return  (
                              <li className={classItem} key={index} onClick={self.clickHandlers.bind(null, {index:index, name:item.name} )} data-index={index} data-name={item.name}>
                                {item.name}
                              </li>
                            )
                  })
                }
                </ul>
                <div className="row">
                  <div className="col-xs-2 col-xs-offset-1">
                    {
                      (() => {
                        let item = self.state.index;

                        if (ingredients[item].name === "agregar") {
                          return "agregar"
                        } else {
                          return "no agregar"
                        }
                    })()
                  }
                  </div>
                </div>
              </div>
            </div>)
  }
});


module.exports = {
                  Manager: Manager
                 }
