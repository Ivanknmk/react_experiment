import React from 'react';
import ReactDOM from 'react-dom';
let ingredients    = null,
    ingredientList = null,
    recipe        = null;

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
                    "list": ["carne de puerco", "carne de pollo"]
                  }, {
                    "name": "vegetales",
                    "list": ["papa", "coliflor", "zanahoria", "arandano", "aguacate", "manzana", "brócoli"]
                  }, {
                    "name": "pescado",
                    "list": ["bacalao", "atún", "calamar"]
                  }, {
                    "name": "despensa",
                    "list": ["pimienta", "sal", "jenjibre", "canela", "menta"]
                  }];

  recipe = {
              name: "Ensalada de pasta con atún y vegetales",
              "img": "https://img-global.cpcdn.com/002_recipes/25de58fa49af12fa/664x470cq70/photo.jpg",
              ingredients: [{
                              "name": "pasta",
                              "quantity": ".2"
                            }, {
                              "name": "atún",
                              "quantity": "1"
                            }, {
                              "name": "chiles campana",
                              "quantity": ".05"
                            }, {
                              "name": "elote",
                              "quantity": "400"
                            }, {
                              "name": "brocoli",
                              "quantity": ".4"
                            }, {
                              "name": "cebolla morada",
                              "quantity": ".2"
                            }]
            }

var Manager = React.createClass({
  /*default Handlers*/
  clickHandlers: function (config) {
    let index         = this.state.index,
        element       = config.name,
        selectedIndex = null;

    ingredients[index].status = '';
    selectedIndex = config.index;
    ingredients[selectedIndex].status = 'active';

    this.setState({ingredients: ingredients, index: selectedIndex});
  },
  removeIngredients: function ( obj = {name: ''}) {
    recipe.ingredients =  recipe
                            .ingredients
                            .filter(function (element) {
                                          return (element.name != obj.name)
                                        })
    console.log(recipe.ingredients);
  },
  /*content Generators*/
  returnIngredients: function (item = '') {
    let items = [];

    for (let i = ingredientList.length - 1; i >= 0; i -= 1) {
      if (ingredientList[i].name === item) {
        items = ingredientList[i].list;
        break;
      }
    }

     return (
              <ul className="list-unstyled">{
              items.map(function (item, index) {
                return (<li className="label label-primary" key={index}>
                          {item} <span className="glyphicon glyphicon-plus" aria-hidden="true"></span>
                        </li>)

              })
            }</ul>
            )

  },
  /*Lyfe Cycle*/
  getInitialState: function () {
    return {
              ingredients: ingredients,
              recipe: recipe,
              index: 0
            }
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
                  <div className="col-xs-10 col-xs-offset-1 ingredients-container">
                    {
                      (() => {
                        let item = self.state.index;

                        if (ingredients[item].name === "agregar") {
                          return "agregar"
                        } else {
                          return self.returnIngredients(ingredients[item].name);
                        }
                    })()
                  }
                  </div>
                </div>
              </div>
              <div className="container-fluid">
                <div className="row">
                  <div className="col-xs-12">
                    {
                      (() => {
                        let recipe = self.state.recipe;
                        return (<div>
                                <h1>{recipe.name}</h1>
                                <div className="container-fluid">
                                  <div className="row">
                                    <div className="col-xs-12 col-md-5">
                                      <h2>Presentación</h2>
                                      <img src={recipe.img} alt={recipe.name} className="img-responsive"/>
                                    </div>
                                    <div className="col-xs-12 col-md-7">
                                      <h2>Ingredientes</h2>
                                      <ul className="ingredient-list">
                                        {
                                          recipe.ingredients.map((item, index) => {
                                            return (<li key={index}>
                                                      <label>{item.name}</label>
                                                      <input type="text" value={item.quantity}/>
                                                      <span className="label label-danger" onClick={self.removeIngredients.bind(null, {name:item.name} )}>Rermover</span>
                                                    </li>)
                                          })
                                        }
                                      </ul>
                                    </div>
                                  </div>
                                </div>

                                </div>)
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
