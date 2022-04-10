/*
TODO:
 1. Branding on left side
 2. login/logout on right side - login with google 
*/
import Login from "../components/login";

import React from "react";

import { Navbar, Nav, Container } from "react-bootstrap";

import "../styles/header.css";

export default function Header() {
  return (
    <div className="header">
      {/* <Navbar bg="light" expand="lg">
        <Container>
          <Navbar.Brand href="#home">Compile-Abhi</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link href="#home">Home</Nav.Link>
              <Login />
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar> */}
      <div className="heading">
        <h3>Compile/Abhi</h3>
      </div>
      <div className="login">
        <Login />
      </div>
    </div>
  );
}
