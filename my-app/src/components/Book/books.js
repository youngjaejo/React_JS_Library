import React, { Component, useReducer } from "react";
import { Button } from "reactstrap";
import EditBook from "./EditBook";
import axios from "axios";
class books extends Component {
  constructor(props) {
    super(props);
    this.state = {
      addModalShow: false,
    };
  }

  remove(id) {
    const user = JSON.parse(localStorage.getItem("user"));
    axios({
      method: "delete",
      url: `/books/deleteABook/${id}`,
      headers: { Authorization: "Bearer " + user.accessToken },
    }).then(() => {
      //   let updateBook = [...this.state.books].filter((i) => i.id !== id);
      //   this.setState({ books: updateBook });
      window.location.reload(false);
    });
  }

  render() {
    let addModelClose = () => this.setState({ addModalShow: false });
    const img = `https://elasticbeanstalk-us-west-1-338406428407.s3-us-west-1.amazonaws.com/image/${this.props.img_name}`;
    return (
      <tr key={this.props.id}>
        <td>{this.props.id}</td>
        <td>{this.props.isbn}</td>
        <td>{this.props.author}</td>
        <td>{this.props.title}</td>
        <td>{this.props.price}</td>
        <td>{this.props.category}</td>
        <td>
          <img src={img} width="100" height="150" alt="profile" />
        </td>
        <td>{this.props.quantity}</td>
        <td>
          <Button
            size="sm"
            color="danger"
            onClick={() => this.setState({ addModalShow: true })}
          >
            Edit
          </Button>
          <EditBook
            show={this.state.addModalShow}
            onHide={addModelClose}
            key={this.props.id}
            id={this.props.id}
            isbn={this.props.isbn}
            author={this.props.author}
            title={this.props.title}
            price={this.props.price}
            category={this.props.category}
            img_name={this.props.img_name}
            quantity={this.props.quantity}
          />
        </td>
        <td>
          <Button
            size="sm"
            color="danger"
            onClick={() => this.remove(this.props.id)}
          >
            Delete
          </Button>
        </td>
      </tr>
    );
  }
}

export default books;
