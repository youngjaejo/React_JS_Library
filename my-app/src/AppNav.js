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
import AuthService from "./services/auth.service";

class AppNav extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentUser: undefined,
      superUser: false,
      adminUser: false,
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
      });
    }
  }
  logOut() {
    AuthService.logout();
  }
  render() {
    const { currentUser, superUser, adminUser } = this.state;

    return (
      <div>
        <Navbar color="light" light expand="md">
          <NavbarBrand href="/">YJ Library</NavbarBrand>
          <Nav className="ml-auto">
            <NavItem>
              <NavLink href="/books">Book</NavLink>
            </NavItem>
            <NavItem>
              <NavLink href="/users">User</NavLink>
            </NavItem>
            <UncontrolledDropdown nav inNavbar>
              {superUser || adminUser ? (
                <DropdownToggle nav caret>
                  welcom! {currentUser.username}
                </DropdownToggle>
              ) : (
                <DropdownToggle nav caret>
                  Please Sign in
                </DropdownToggle>
              )}

              {superUser || adminUser ? (
                <DropdownMenu right>
                  <DropdownItem href="/profile">profile</DropdownItem>
                  <DropdownItem href="/login" onClick={this.logOut}>
                    LogOut
                  </DropdownItem>
                </DropdownMenu>
              ) : (
                <DropdownMenu right>
                  <DropdownItem href="/login">Login</DropdownItem>
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
