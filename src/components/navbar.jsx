import React, { Component } from "react";
import { Navbar, Nav, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import "../nav.css";

class Navhead extends Component {
  render() {
    const { isAuthenticated, onLogout } = this.props;

    return (
      <Navbar className="bar" bg="dark" variant="dark" expand="lg">
        <Navbar.Brand mb={0} href="#home">
        ImmuCert
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            {isAuthenticated ? (
              <>
                <Nav.Item className="mt-2 mr-2">
                  <Link to="/">Home</Link>
                </Nav.Item>
                <Nav.Item className="mt-2 ml-2 mr-3">
                  <Link to="/reg">Register</Link>
                </Nav.Item>
                <Nav.Item className="mt-2 ml-2 mr-3">
                  <Link to="/intro">How it works</Link>
                </Nav.Item>
                <Nav.Item className="mt-2 ml-2 mr-3">
                  <Link to="/verify">Verify</Link>
                </Nav.Item>
                <Nav.Item className="mt-2 mr-3">
                  <Link to="/view">View Certificate</Link>
                </Nav.Item>
              </>
            ) : (
              <>
                <Nav.Item className="mt-2 mr-2">
                  <Link to="/">Home</Link>
                </Nav.Item>
                <Nav.Item className="mt-2 ml-2 mr-3">
                  <Link to="/intro">How it works</Link>
                </Nav.Item>
                <Nav.Item className="mt-2 ml-2 mr-3">
                  <Link to="/login">
                    <Button variant="outline-light">Login</Button>
                  </Link>
                </Nav.Item>
              </>
            )}
          </Nav>
          {isAuthenticated && (
            <Button
              variant="outline-danger"
              onClick={onLogout}
              style={{ width: "100px", padding: "10px 15px" }} // Smaller button
            >
              Logout
            </Button>
          )}
        </Navbar.Collapse>
      </Navbar>
    );
  }
}

export default Navhead;
