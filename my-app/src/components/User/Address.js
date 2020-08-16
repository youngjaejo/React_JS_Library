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
class Address extends Component {
  emptyitem = {
    id: this.props.id,

    address: "",
    city: "",
    state: "",
    zipcode: "",
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
    console.log(this.emptyitem[event.target.name]);
  }
  handleSubmit() {
    const { item } = this.state;
    const user = JSON.parse(localStorage.getItem("user"));
    axios({
      method: "patch",
      url: "/user/addAddress",
      headers: { Authorization: "Bearer " + user.accessToken },
      data: {
        id: this.props.id,
        addresses: [
          {
            address: this.state.item.address,
            city: this.state.item.city,
            state: this.state.item.state,
            zipCode: this.state.item.zipcode,
          },
        ],
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
          <Modal.Title id="contained-modal-title-vcenter">Address</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={this.handleSubmit}>
            <FormGroup>
              <Label>Address</Label>
              <Input type="text" name="address" onChange={this.handleItem} />
            </FormGroup>
            <FormGroup>
              <Label>City</Label>
              <Input type="text" name="city" onChange={this.handleItem} />
            </FormGroup>
            <FormGroup>
              <Label>State</Label>
              <Input type="text" name="state" onChange={this.handleItem} />
            </FormGroup>
            <FormGroup>
              <Label>Zipcode</Label>
              <Input type="text" name="zipcode" onChange={this.handleItem} />
            </FormGroup>
            {/* <FormGroup>
              <Label>Role</Label>
              <Input
                type="text"
                name="roles"
                defaultValue={this.props.roles}
                onChange={this.handleItem}
                readOnly
              />
            </FormGroup> */}
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

export default Address;
