import React, { Component } from "react";
import { Modal } from "react-bootstrap";
import axios from "axios";
import {
  Table,
  Container,
  Input,
  Button,
  Label,
  FormGroup,
  Form,
} from "reactstrap";
class EditUser extends Component {
  emptyitem = {
    id: this.props.id,
    firstName: this.props.firstName,
    lastName: this.props.lastName,
    email: this.props.email,
    phoneNumber: this.props.phoneNumber,
    roles: this.props.roles,
    password: "",
  };
  constructor(props) {
    super(props);
    this.state = {
      item: this.emptyitem,
    };
    this.handleItem = this.handleItem.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleItem(event) {
    this.emptyitem[event.target.name] = event.target.value;
  }
  handleSubmit(event) {
    const { item } = this.state;
    const user = JSON.parse(localStorage.getItem("user"));
    axios({
      method: "put",
      url: "/user/editAUser",
      headers: { Authorization: "Bearer " + user.accessToken },
      data: {
        id: this.state.item.id,
        firstName: this.state.item.firstName,
        lastName: this.state.item.lastName,
        email: this.state.item.email,
        phoneNumber: this.state.item.phoneNumber,
        password: this.state.item.password,
      },
    });
  }

  render() {
    return (
      <Modal
        {...this.props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Edit User
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={this.handleSubmit}>
            <FormGroup>
              <Label>ID</Label>
              <Input
                type="text"
                name="id"
                defaultValue={this.props.id}
                onChange={this.handleItem}
                readOnly
              />
            </FormGroup>
            <FormGroup>
              <Label>First Name</Label>
              <Input
                type="text"
                name="firstName"
                defaultValue={this.props.firstName}
                onChange={this.handleItem}
              />
            </FormGroup>
            <FormGroup>
              <Label>Last Name</Label>
              <Input
                type="text"
                name="lastName"
                defaultValue={this.props.lastName}
                onChange={this.handleItem}
              />
            </FormGroup>
            <FormGroup>
              <Label>Email</Label>
              <Input
                type="text"
                name="email"
                defaultValue={this.props.email}
                onChange={this.handleItem}
                readOnly
              />
            </FormGroup>

            <FormGroup>
              <Label>New Password</Label>
              <Input
                type="password"
                name="password"
                onChange={this.handleItem}
              />
            </FormGroup>
            <FormGroup>
              <Label>Phone Number</Label>
              <Input
                type="text"
                name="phoneNumber"
                defaultValue={this.props.phoneNumber}
                onChange={this.handleItem}
                readOnly
              />
            </FormGroup>
            <FormGroup>
              <Label>Role</Label>
              <Input
                type="text"
                name="roles"
                defaultValue={this.props.roles}
                onChange={this.handleItem}
                readOnly
              />
            </FormGroup>
            <Button variant="primary" type="submit">
              Submit
            </Button>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="danger" onClick={this.props.onHide}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    );
  }
}

export default EditUser;
