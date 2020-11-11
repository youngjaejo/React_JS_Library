import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.css";
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  NavbarText,
} from "reactstrap";
import AuthService from "../services/auth.service";

class AppNav extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentUser: undefined,
      superUser: false,
      adminUser: false,
      siteUser: false,
    };
    this.logOut = this.logOut.bind(this);
  }
  componentDidMount() {
    const user = AuthService.getCurrentUser();
    if (user) {
      this.setState({
        currentUser: user,
        superUser: user.roles.includes("SUPER_USER"),
        adminUser: user.roles.includes("ADMIN_USER"),
        siteUser: user.roles.includes("SITE_USER"),
      });
    }
  }
  logOut() {
    AuthService.logout();
  }
  render() {
    const { currentUser, superUser, adminUser, siteUser } = this.state;

    return (
      <div>
        <Navbar color="light" light expand="md">
          <NavbarBrand href="/bookApp/books">Book Store</NavbarBrand>
          <Nav className="ml-auto">
            <NavItem>
              <NavLink href="/bookApp/books">Book</NavLink>
            </NavItem>
            <NavItem>
              {(superUser || adminUser) && (
                <NavLink href="/bookApp/users">User</NavLink>
              )}
            </NavItem>
            <NavItem>
              {(superUser || adminUser || siteUser) && (
                <NavLink href="/bookApp/cart">Cart</NavLink>
              )}
            </NavItem>
            <UncontrolledDropdown nav inNavbar>
              {superUser || adminUser || siteUser ? (
                <DropdownToggle nav caret>
                  welcom! {currentUser.username}
                </DropdownToggle>
              ) : (
                <DropdownToggle nav caret>
                  Please Sign in
                </DropdownToggle>
              )}

              {superUser || adminUser || siteUser ? (
                <DropdownMenu right>
                  <DropdownItem href="/bookApp/profile">profile</DropdownItem>
                  <DropdownItem href="/bookApp/login" onClick={this.logOut}>
                    LogOut
                  </DropdownItem>
                </DropdownMenu>
              ) : (
                <DropdownMenu right>
                  <DropdownItem href="/bookApp/login">Login</DropdownItem>
                </DropdownMenu>
              )}
            </UncontrolledDropdown>
          </Nav>
        </Navbar>
      </div>
    );
  }
}

export default AppNav;
