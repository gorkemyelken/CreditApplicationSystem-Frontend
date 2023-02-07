import React from "react";
import { Container, Menu } from "semantic-ui-react";
import { NavLink } from "react-router-dom";
import "./Navbar.css";

function NavBar() {
  return (
    <div>
      <Menu borderless inverted className="navbar">
        <Container className="navbar">
          <Menu.Item as={NavLink} to="/" content="Home" icon="home" />
          <Menu.Item
            as={NavLink}
            to="/customers"
            content="Customers"
            icon="user"
          />
          <Menu.Item
            as={NavLink}
            to="/creditapplications"
            content="Credit Applications"
            icon="credit card"
          />
        </Container>
      </Menu>
    </div>
  );
}

export default NavBar;
