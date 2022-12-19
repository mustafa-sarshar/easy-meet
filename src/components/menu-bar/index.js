import React, { Component } from "react";
import { Container, Nav, Navbar, Form } from "react-bootstrap";

import CitySearch from "../city-search";
import NumberOfEvents from "../number-of-events";

class MenuBar extends Component {
  render() {
    const { locations, updateEventsHandler } = this.props;
    return (
      <Navbar bg="light" expand="lg">
        <Container>
          <Navbar.Brand href="#home">Musto Easy-Meet</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link href="#home">Home</Nav.Link>
              <Nav.Link href="#link">Link</Nav.Link>
            </Nav>
            <Form className="d-flex">
              <NumberOfEvents onNumOfEventsChange={updateEventsHandler} />
            </Form>
            <Form className="d-flex">
              <CitySearch
                locations={locations}
                onUpdateEvents={updateEventsHandler}
              />
            </Form>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    );
  }
}

export default MenuBar;
