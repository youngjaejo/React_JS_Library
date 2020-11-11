import React, { Component, useReducer } from "react";
import { Button } from "reactstrap";
import EditBook from "./EditBook";
import axios from "axios";
import AuthService from "../../services/auth.service";
import LoignRequre from "./loginRequire";
class books extends Component {
  constructor(props) {
    const user = JSON.parse(localStorage.getItem("user"));
    console.log(user);
    super(props);

    if (user !== null) {
      this.state = {
        user: user,
        addModalShow: false,
        superUser: user.roles.includes("SUPER_USER"),
        adminUser: user.roles.includes("ADMIN_USER"),
        siteUser: user.roles.includes("SITE_USER"),
        veiwLoginReqire: false,
        responseOk: false,
      };
      console.log("user is not null");
    } else {
      this.state = {
        addModalShow: false,
        superUser: false,
        adminUser: false,
        siteUser: false,
        veiwLoginReqire: false,
        responseOk: false,
      };
      console.log("user is null");
    }
  }
  remove(id) {
    const user = JSON.parse(localStorage.getItem("user"));
    axios({
      method: "delete",
      url: `https://yjwebserver.com/books/deleteABook/${id}`,
      headers: { Authorization: "Bearer " + user.accessToken },
    }).then(() => {
      //   let updateBook = [...this.state.books].filter((i) => i.id !== id);
      //   this.setState({ books: updateBook });
      window.location.reload(false);
    });
  }

  AddInCart(bookId) {
    const user = JSON.parse(localStorage.getItem("user"));
    axios({
      method: "post",
      url: "https://yjwebserver.com/user/moveToCart/",
      headers: { Authorization: "Bearer " + user.accessToken },
      data: {
        id: user.id,
        cart: [
          {
            id: bookId,
          },
        ],
      },
    }).then((response) => {
      if (response.statusText === "OK") {
        this.setState({ responseOk: true });
        console.log(this.state.responseOk);
        this.setState({ veiwLoginReqire: true });
      }
    });
  }

  render() {
    const { superUser, adminUser, user, responseOk } = this.state;

    let veiwLoginReqireClose = () => this.setState({ veiwLoginReqire: false });
    let addModelClose = () => this.setState({ addModalShow: false });
    const img = `https://elasticbeanstalk-us-west-1-338406428407.s3-us-west-1.amazonaws.com/image/${this.props.img_name}`;
    return (
      <tr key={this.props.id}>
        <td>{this.props.id}</td>
        <td>{this.props.isbn}</td>
        <td>{this.props.author}</td>
        <td>{this.props.title}</td>
        <td>${this.props.price}</td>
        <td>{this.props.category}</td>
        <td>
          <img src={img} width="100" height="150" alt="profile" />
        </td>
        {(superUser || adminUser) && <td>{this.props.quantity}</td>}

        {(superUser || adminUser) && (
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
        )}

        {(superUser || adminUser) && (
          <td>
            <Button
              size="sm"
              color="danger"
              onClick={() => this.remove(this.props.id)}
            >
              Delete
            </Button>
          </td>
        )}

        <td>
          <Button
            size="sm"
            color="danger"
            onClick={() => {
              {
                console.log(user);
                if (user !== undefined) {
                  this.AddInCart(this.props.id);
                } else this.setState({ veiwLoginReqire: true });
              }
            }}
          >
            Add Cart
          </Button>
        </td>
        <LoignRequre
          show={this.state.veiwLoginReqire}
          onHide={veiwLoginReqireClose}
          responseOk={this.state.responseOk}
        />
      </tr>
    );
  }
}

export default books;
