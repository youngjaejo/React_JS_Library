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
  constructor(props) {
    const user = JSON.parse(localStorage.getItem("user"));
    super(props);
    this.state = { user: user };
    console.log(this.props.responseOk);
  }

  render() {
    const { user } = this.state;
    let loginRequire = () => (
      <Modal {...this.props}>
        <Modal.Header closeButton>
          <Modal.Title>Login Requirement</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <Label>You need to login for it</Label>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={this.props.onHide}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    );
    return (
      <div>
        {user !== null ? (
          this.props.responseOk ? (
            <Modal {...this.props}>
              <Modal.Header closeButton>
                <Modal.Title>Notification</Modal.Title>
              </Modal.Header>

              <Modal.Body>
                <Label>You Saved It In Cart</Label>
              </Modal.Body>
              <Modal.Footer>
                <Button variant="secondary" onClick={this.props.onHide}>
                  Close
                </Button>
              </Modal.Footer>
            </Modal>
          ) : (
            <Modal {...this.props}>
              <Modal.Header closeButton>
                <Modal.Title>Notification</Modal.Title>
              </Modal.Header>

              <Modal.Body>
                <Label>Failed To Save In The Cart</Label>
              </Modal.Body>
              <Modal.Footer>
                <Button variant="secondary" onClick={this.props.onHide}>
                  Close
                </Button>
              </Modal.Footer>
            </Modal>
          )
        ) : (
          <Modal {...this.props}>
            <Modal.Header closeButton>
              <Modal.Title>Login Requirement</Modal.Title>
            </Modal.Header>

            <Modal.Body>
              <Label>You need to login for it</Label>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={this.props.onHide}>
                Close
              </Button>
            </Modal.Footer>
          </Modal>
        )}
      </div>
    );
  }
}

export default AddUser;
