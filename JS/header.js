import React from 'react';
import ReactDOM from 'react-dom';
import {Navbar, Nav, NavItem, NavDropdown, MenuItem} from 'react-bootstrap';

module.exports = {
  navbarInstance : (
    <Navbar inverse>
      <Navbar.Header>
        <Navbar.Brand>
          <a href="/"> <img className="img-responsive" src="http://placehold.it/50x50"/></a>
        </Navbar.Brand>
        <Navbar.Toggle />
      </Navbar.Header>
      <Navbar.Collapse>
        <Nav>
          <NavItem eventKey={2} href="/manage_recipes.html">Administrar recetas</NavItem>
          <NavItem eventKey={1} href="recipes.html">Recetas</NavItem>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  )
}
