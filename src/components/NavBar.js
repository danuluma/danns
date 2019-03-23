import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import { Navbar, Button, NavItem } from "react-bootstrap";

class NavBar extends Component {
  render() {
    return (
      <Navbar className="nav-bar navbar-dark bg-dark static-top" expand="lg">
        <NavItem className="container">
          <Navbar.Brand>
            <NavLink to="/">Danns Fast Foods</NavLink>
          </Navbar.Brand>
          <Navbar.Toggle />
          <Navbar.Collapse className="justify-content-end">
            {localStorage.getItem("token") ? (
              <NavLink
                to=""
                className="nav-link"
                onClick={console.log("log me out")}
              >
                Logout
              </NavLink>
            ) : (
              <React.Fragment>
                <NavLink to="/login" className="nav-link">
                  Login
                </NavLink>
                <NavLink to="/signup" className="nav-link">
                  Sign Up
                </NavLink>
              </React.Fragment>
            )}
          </Navbar.Collapse>
        </NavItem>
      </Navbar>
    );
  }
}

export default NavBar;
