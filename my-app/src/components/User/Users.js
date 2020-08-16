import React, { Component, useReducer } from "react";
import {
  Button,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from "reactstrap";
import EditUser from "./EditUser";
import axios from "axios";
import Moment from "react-moment";
import Address from "./Address";
import ViewAddress from "./ViewAddress";
import "bootstrap/dist/css/bootstrap.css";
class Users extends Component {
  constructor(props) {
    super(props);
    this.state = {
      editShow: false,
      addressShow: false,
      viewAddressShow: false,
    };
  }

  remove(id) {
    const user = JSON.parse(localStorage.getItem("user"));
    axios({
      method: "delete",
      url: `/user/deleteUser/${id}`,
      headers: { Authorization: "Bearer " + user.accessToken },
    }).then(() => {
      //   let updateBook = [...this.state.Users].filter((i) => i.id !== id);
      //   this.setState({ Users: updateBook });
      window.location.reload(false);
    });
  }

  render() {
    let editShowClose = () => this.setState({ editShow: false });
    let addressShowClose = () => this.setState({ addressShow: false });
    let viewAddressClose = () => this.setState({ viewAddressShow: false });
    return (
      <tr>
        <td>{this.props.id}</td>
        <td>{this.props.firstName}</td>
        <td>{this.props.lastName}</td>
        <td>{this.props.email}</td>
        <td>{this.props.phoneNumber}</td>
        <td>{this.props.roles}</td>
        <td>
          <Moment format="YYYY/MM/DD HH:mm:ss">{this.props.date}</Moment>
        </td>
        <td>
          <UncontrolledDropdown>
            <DropdownToggle size="sm" color="danger">
              Options
            </DropdownToggle>
            <DropdownMenu>
              <DropdownItem
                size="sm"
                color="danger"
                onClick={() => this.setState({ addressShow: true })}
              >
                Add Address
              </DropdownItem>
              <Address
                show={this.state.addressShow}
                onHide={addressShowClose}
                id={this.props.id}
              />
              <DropdownItem
                size="sm"
                color="danger"
                onClick={() => this.setState({ viewAddressShow: true })}
              >
                View Address
              </DropdownItem>

              <ViewAddress
                show={this.state.viewAddressShow}
                onHide={viewAddressClose}
                id={this.props.id}
                addresses={this.props.addresses}
              />
              <DropdownItem
                size="sm"
                color="danger"
                onClick={() => this.setState({ editShow: true })}
              >
                Edit
              </DropdownItem>

              <EditUser
                show={this.state.editShow}
                onHide={editShowClose}
                id={this.props.id}
                firstName={this.props.firstName}
                lastName={this.props.lastName}
                email={this.props.email}
                phoneNumber={this.props.phoneNumber}
                roles={this.props.roles}
                password={this.props.password}
              />
              <DropdownItem
                size="sm"
                color="danger"
                onClick={() => this.remove(this.props.id)}
              >
                Delete
              </DropdownItem>
            </DropdownMenu>
          </UncontrolledDropdown>
        </td>
        {/* <td>
          <Button
            size="sm"
            color="danger"
            onClick={() => this.setState({ addressShow: true })}
          >
            Address
          </Button>
          <Address
            show={this.state.addressShow}
            onHide={addressShowClose}
            key={this.props.id}
            id={this.props.id}
          />
        </td> */}
        {/* <td>
          <Button
            size="sm"
            color="danger"
            onClick={() => this.setState({ editShow: true })}
          >
            Edit
          </Button>
          <EditUser
            show={this.state.editShow}
            onHide={editShowClose}
            key={this.props.id}
            id={this.props.id}
            firstName={this.props.firstName}
            lastName={this.props.lastName}
            email={this.props.email}
            status={this.props.status}
            roles={this.props.roles}
          />
        </td> */}
        {/* <td>
          <Button
            size="sm"
            color="danger"
            onClick={() => this.remove(this.props.id)}
          >
            Delete
          </Button>
        </td> */}
      </tr>
    );
  }
}

export default Users;
