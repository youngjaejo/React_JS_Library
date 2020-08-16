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
import { ThemeConsumer } from "react-bootstrap/esm/ThemeProvider";

class AddUser extends Component {
  emptyitem = {
    id: "",
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  };
  constructor(props) {
    super(props);
    this.state = {
      userInput: "",
      item: this.emptyitem,
      notMaching: false,
    };
    this.handleUserInput = this.handleUserInput.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleUserInput(event) {
    this.setState({ userInput: event.target.value });
    console.log(this.state.userInput);
  }
  handleSubmit(event) {
    if (this.state.userInput != this.props.randomNum) {
      this.setState({ notMaching: true });
    } else {
      const user = JSON.parse(localStorage.getItem("user"));
      console.log("pass");
      axios({
        method: "post",
        url: "/user/register",
        headers: { Authorization: "Bearer " + user.accessToken },
        data: {
          id: "",
          firstName: this.props.firstName,
          lastName: this.props.lastName,
          email: this.props.email,
          password: this.props.password,
        },
      });
      window.location.reload(false);
    }
  }
  render() {
    let errors = (
      <div className="alert alert-danger" role="alert">
        Code is not matching
      </div>
    );

    return (
      <div>
        <Modal {...this.props}>
          <Modal.Header closeButton>
            <Modal.Title>Modal heading</Modal.Title>
          </Modal.Header>

          <Modal.Body>
            <Label>
              Vertification code was sent to your {this.props.email}
            </Label>
            <Input type="text" name="number" onChange={this.handleUserInput} />
          </Modal.Body>
          {this.state.notMaching && <div>{errors}</div>}
          <Modal.Footer>
            <Button variant="secondary" onClick={this.props.onHide}>
              Close
            </Button>
            <Button variant="primary" onClick={this.handleSubmit}>
              Submit
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
}

export default AddUser;
