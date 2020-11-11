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
class AddBook extends Component {
  emptyitem = {
    isbn: "",
    author: "",
    title: "",
    price: "",
    category: "",
    quantity: "",
  };
  constructor(props) {
    super(props);
    this.state = {
      item: this.emptyitem,
      file: null,
    };
    this.handleItem = this.handleItem.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleItem(event) {
    this.emptyitem[event.target.name] = event.target.value;
  }
  handleFileChange = (e) => {
    this.state.file = e.target.files[0];
    console.log(this.state.file);
  };
  handleSubmit(event) {
    const user = JSON.parse(localStorage.getItem("user"));
    let formData = new FormData();
    formData.append(
      "book",
      new Blob([JSON.stringify(this.state.item)], {
        type: "application/json",
      })
    );
    formData.append("file", this.state.file);
    axios({
      method: "post",
      url: "https://yjwebserver.com/books/save",
      headers: {
        Authorization: "Bearer " + user.accessToken,
      },
      data: formData,
      // {
      //   id: "",
      //   isbn: this.state.item.isbn,
      //   author: this.state.item.author,
      //   title: this.state.item.title,
      //   price: this.state.item.price,
      //   category: this.state.item.category,
      //   img_name: this.state.item.img_name,
      //   quantity: this.state.item.quantity,
      // },
      // img: formData,
    });
  }

  render() {
    const { classes } = this.props;
    return (
      <Modal
        {...this.props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">Add Book</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={this.handleSubmit}>
            <FormGroup>
              <Label>ISBN</Label>
              <Input type="text" name="isbn" onChange={this.handleItem} />
            </FormGroup>
            <FormGroup>
              <Label>Author</Label>
              <Input type="text" name="author" onChange={this.handleItem} />
            </FormGroup>
            <FormGroup>
              <Label>Title</Label>
              <Input type="text" name="title" onChange={this.handleItem} />
            </FormGroup>
            <FormGroup>
              <Label>Price</Label>
              <Input type="number" name="price" onChange={this.handleItem} />
            </FormGroup>
            <FormGroup>
              <Label>Catagofy</Label>
              <Input type="text" name="category" onChange={this.handleItem} />
            </FormGroup>
            <FormGroup>
              <Label>Image Name</Label>
              {/* <Input type="text" name="img_name" onChange={this.handleItem} /> */}
              <Input
                accept="image/*"
                id="raised-button-file"
                type="file"
                file={this.state.file}
                value={this.state.fileName}
                onChange={this.handleFileChange}
              />
            </FormGroup>{" "}
            <FormGroup>
              <Label>Quantity</Label>
              <Input type="number" name="quantity" onChange={this.handleItem} />
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

export default AddBook;
