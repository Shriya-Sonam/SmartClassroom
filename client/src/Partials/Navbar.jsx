import React, { Fragment, useContext } from "react";
import { UserContext } from "../App";
import {useHistory } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import { Navbar, NavDropdown, Nav } from "react-bootstrap";
import "../App.css";

function HNavbar() {
  const history = useHistory();
  const { state, dispatch } = useContext(UserContext);

  function logout() {
    localStorage.removeItem("jwt");
    dispatch({ type: "CLEAR" });
    history.push("/");
  }

  return (
    <Fragment>
      <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
        <Navbar.Brand href="/">React-Bootstrap</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="ml-auto ">
            {state ? (
              <NavDropdown title="Avatar" id="collasible-nav-dropdown" alignRight>
                <NavDropdown.Item href="#action/3.3">Profile</NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item href="/" onClick={() => logout()}>Sign Out</NavDropdown.Item>
              </NavDropdown>
            ) : (
                <Nav>
                  <Nav.Link href="register">Register</Nav.Link>
                  <Nav.Link eventKey={2} href="login"> login </Nav.Link>
                </Nav>
              )}
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </Fragment>
  );
}

export default HNavbar;


