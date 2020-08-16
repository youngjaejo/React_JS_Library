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
class EditBook extends Component {
  emptyitem = {
    id: this.props.id,
    isbn: this.props.isbn,
    author: this.props.author,
    title: this.props.title,
    price: this.props.price,
    category: this.props.category,
    img_name: this.props.img_name,
    quantity: this.props.quantity,
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
  handleFileChange = (e) => {
    this.state.file = e.target.files[0];
    console.log(this.state.file);
  };
  handleItem(event) {
    this.emptyitem[event.target.name] = event.target.value;
    console.log(this.state.file);
  }
  // handleSubmit(event) {
  //   const user = JSON.parse(localStorage.getItem("user"));
  //   axios({
  //     method: "put",
  //     url: "/books/editBook",
  //     headers: { Authorization: "Bearer " + user.accessToken },
  //     data: {
  //       id: this.state.item.id,
  //       isbn: this.state.item.isbn,
  //       author: this.state.item.author,
  //       title: this.state.item.title,
  //       price: this.state.item.price,
  //       category: this.state.item.category,
  //       img_name: this.state.item.img_name,
  //       quantity: this.state.item.quantity,
  //     },
  //   });
  // }

  handleSubmit(event) {
    const user = JSON.parse(localStorage.getItem("user"));
    if (this.state.file === "null") {
      console.log(this.state.file);
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
        url: "/books/editBook",
        headers: {
          Authorization: "Bearer " + user.accessToken,
        },
        data: formData,
      });
    } else {
      axios({
        method: "put",
        url: "/books/editBook_noFile",
        headers: { Authorization: "Bearer " + user.accessToken },
        data: {
          id: this.state.item.id,
          isbn: this.state.item.isbn,
          author: this.state.item.author,
          title: this.state.item.title,
          price: this.state.item.price,
          category: this.state.item.category,
          img_name: this.state.item.img_name,
          quantity: this.state.item.quantity,
        },
      });
    }
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
            Edit Book
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
              <Label>ISBN</Label>
              <Input
                type="text"
                name="isbn"
                defaultValue={this.props.isbn}
                onChange={this.handleItem}
              />
            </FormGroup>
            <FormGroup>
              <Label>Author</Label>
              <Input
                type="text"
                name="author"
                defaultValue={this.props.author}
                onChange={this.handleItem}
              />
            </FormGroup>
            <FormGroup>
              <Label>Title</Label>
              <Input
                type="text"
                name="title"
                defaultValue={this.props.title}
                onChange={this.handleItem}
              />
            </FormGroup>
            <FormGroup>
              <Label>Price</Label>
              <Input
                type="number"
                name="price"
                defaultValue={this.props.price}
                onChange={this.handleItem}
              />
            </FormGroup>
            <FormGroup>
              <Label>Catagofy</Label>
              <Input
                type="text"
                name="category"
                defaultValue={this.props.category}
                onChange={this.handleItem}
              />
            </FormGroup>
            <FormGroup>
              <Label>Image Name</Label>
              {/* <Input
                type="text"
                name="img_name"
                defaultValue={this.props.img_name}
                onChange={this.handleItem}
              /> */}
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
              <Input
                type="number"
                name="quantity"
                defaultValue={this.props.quantity}
                onChange={this.handleItem}
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

export default EditBook;
