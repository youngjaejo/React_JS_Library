import React, { Component } from "react";

import axios from "axios";
import { Table, Container, Input } from "reactstrap";
import { Button, ButtonToolbar } from "react-bootstrap";
import Users from "./Users";
import "bootstrap/dist/css/bootstrap.css";

import AddUser from "./AddUser";
class User extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: false,
      value: "all",
      searched: [],
      users: [],

      searchKeyword: "",
      length: 0,
      addModalShow: false,
    };
    this.handleChange = this.handleChange.bind(this);
  }
  handleChange(event) {
    this.setState({ value: event.target.value });
  }
  async componentDidMount() {
    const user = JSON.parse(localStorage.getItem("user"));
    axios({
      method: "get",
      url: "/user/getUsers",
      headers: { Authorization: "Bearer " + user.accessToken },
    }).then((res) => {
      console.log(res.data);
      this.setState({ users: res.data });
    });
  }

  UserSearched() {
    this.state.length = this.state.searchKeyword.length;

    if (this.state.value === "firstName") {
      const result = this.state.users.filter((User) =>
        User.firstName
          .toLowerCase()
          .includes(this.state.searchKeyword.toLowerCase())
      );
      this.setState({ searched: result });
    } else if (this.state.value === "lastName") {
      const result = this.state.users.filter((User) =>
        User.lastName
          .toLowerCase()
          .includes(this.state.searchKeyword.toLowerCase())
      );
      this.setState({ searched: result });
    } else if (this.state.value === "email") {
      const result = this.state.users.filter((User) =>
        User.email
          .toLowerCase()
          .includes(this.state.searchKeyword.toLowerCase())
      );
      console.log(result);
      this.setState({ searched: result });
    } else if (this.state.value === "phoneNumber") {
      const result = this.state.users.filter((User) =>
        User.phoneNumber
          .toLowerCase()
          .includes(this.state.searchKeyword.toLowerCase())
      );
      console.log(result);
      this.setState({ searched: result });
    } else if (this.state.value === "role") {
      const result = this.state.users.filter((r) => {
        var list = r.roles.filter((User) =>
          User.role
            .toLowerCase()
            .includes(this.state.searchKeyword.toLowerCase())
        );

        if (list.length == 0) return false;
        else return true;
      });

      console.log(result);
      this.setState({ searched: result });
    }
  }

  handleValueChange = (e) => {
    let nextState = {};
    nextState[e.target.name] = e.target.value;
    this.setState({ searchKeyword: e.target.value });
  };

  render() {
    const { users, searched } = this.state;
    let addModelClose = () => this.setState({ addModalShow: false });
    let search = searched.map((user) => (
      <Users
        key={user.id}
        id={user.id}
        firstName={user.firstName}
        lastName={user.lastName}
        email={user.email}
        phoneNumber={user.phoneNumber}
        roles={user.roles.map((r) => r.role)}
        date={user.dateRegisterated}
        password={user.password}
        addresses={user.addresses}
      />
    ));
    let rows = users.map((user) => (
      <Users
        key={user.id}
        id={user.id}
        firstName={user.firstName}
        lastName={user.lastName}
        email={user.email}
        phoneNumber={user.phoneNumber}
        roles={user.roles.map((r) => r.role)}
        date={user.dateRegisterated}
        password={user.password}
        addresses={user.addresses}
      />
    ));

    return (
      <Container>
        <div id="wrapper">
          <div id="divTable">
            <h1>Users</h1>
          </div>
          <div id="searchByDropdown">
            <select
              id="dropDown"
              value={this.state.value}
              onChange={this.handleChange}
            >
              <option value="all">Searched By</option>
              <option value="firstName">First Name</option>
              <option value="lastName">Last Name</option>
              <option value="email">Email</option>
              <option value="role">Role</option>
              <option value="phoneNumber">Phon Number</option>
            </select>
          </div>
          <div id="searchBar">
            {" "}
            <Input
              id="bar"
              type="text"
              name="searchKeyword"
              value={this.state.searchKeyword}
              onChange={this.handleValueChange}
            />
          </div>
          <div id="searchButton">
            {" "}
            <Button
              id="button"
              size="sm"
              color="danger"
              onClick={() => this.UserSearched()}
            >
              search
            </Button>
          </div>
          <div id="addUserButton">
            {" "}
            <ButtonToolbar>
              <Button
                variant="primary"
                onClick={() => this.setState({ addModalShow: true })}
              >
                ADD New User
              </Button>
              <AddUser show={this.state.addModalShow} onHide={addModelClose} />
            </ButtonToolbar>
          </div>
        </div>

        <Table className="mt-4">
          <thead>
            <tr>
              <th width="5%">ID</th>
              <th width="15%">First Name</th>
              <th width="15%">Last Name</th>
              <th width="15%">Email</th>
              <th width="15%">Phone Number</th>
              <th width="15%">Role</th>
              <th width="15%">Registerated Date</th>
            </tr>
          </thead>
          {this.state.length !== 0 ? (
            <tbody>{search}</tbody>
          ) : (
            <tbody>{rows}</tbody>
          )}
        </Table>
      </Container>
    );
  }
}
export default User;
