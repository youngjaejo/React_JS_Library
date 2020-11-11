import React, { Component } from "react";

import axios from "axios";
import { Table, Container, Input } from "reactstrap";
import { Button, ButtonToolbar } from "react-bootstrap";
import Books from "./books";
import "bootstrap/dist/css/bootstrap.css";

import AddBook from "./AddBook";
class Book extends Component {
  constructor(props) {
    super(props);

    this.state = {
      superUser: false,
      adminUser: false,
      siteUser: false,
      isLoading: false,
      value: "all",
      searched: [],
      books: [],
      item: this.emptyItem,
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
    console.log(user);
    axios({
      method: "get",
      url: "https://yjwebserver.com/books/showAllBooks",
      headers: {},
    }).then((res) => {
      {
        user !== null
          ? this.setState({
              books: res.data,

              superUser: user.roles.includes("SUPER_USER"),
              adminUser: user.roles.includes("ADMIN_USER"),
              siteUser: user.roles.includes("SITE_USER"),
            })
          : this.setState({
              books: res.data,
            });
      }
    });
  }

  bookSearched() {
    this.state.length = this.state.searchKeyword.length;
    if (this.state.value === "title") {
      const result = this.state.books.filter((book) =>
        book.title
          .toLowerCase()
          .includes(this.state.searchKeyword.toLowerCase())
      );
      this.setState({ searched: result });
    } else if (this.state.value === "isbn") {
      const result = this.state.books.filter((book) =>
        book.isbn.includes(this.state.searchKeyword)
      );
      this.setState({ searched: result });
    } else if (this.state.value === "author") {
      const result = this.state.books.filter((book) =>
        book.author
          .toLowerCase()
          .includes(this.state.searchKeyword.toLowerCase())
      );
      this.setState({ searched: result });
    } else if (this.state.value === "category") {
      const result = this.state.books.filter((book) =>
        book.category
          .toLowerCase()
          .includes(this.state.searchKeyword.toLowerCase())
      );
      this.setState({ searched: result });
    }
  }

  handleValueChange = (e) => {
    let nextState = {};
    nextState[e.target.name] = e.target.value;
    this.setState({ searchKeyword: e.target.value });
  };

  render() {
    const { books, searched, superUser, adminUser, siteUser } = this.state;
    let addModelClose = () => this.setState({ addModalShow: false });
    let search = searched.map((book) => (
      <Books
        key={book.id}
        id={book.id}
        isbn={book.isbn}
        author={book.author}
        title={book.title}
        price={book.price}
        category={book.category}
        img_name={book.img_name}
        quantity={book.quantity}
      />
    ));
    let rows = books.map((book) => (
      <Books
        key={book.id}
        id={book.id}
        isbn={book.isbn}
        author={book.author}
        title={book.title}
        price={book.price}
        category={book.category}
        img_name={book.img_name}
        quantity={book.quantity}
      />
    ));

    return (
      <Container>
        <div id="wrapper">
          <div id="divTable">
            <h1>Books</h1>
          </div>
          <div id="searchByDropdown">
            <select
              value={this.state.value}
              onChange={this.handleChange}
              id="dropDown"
            >
              <option value="all">Search by</option>
              <option value="isbn">ISBN</option>
              <option value="title">Title</option>
              <option value="author">Author</option>
              <option value="category">Category</option>
            </select>
          </div>
          <div id="searchBar">
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
              size="sm"
              color="danger"
              onClick={() => this.bookSearched()}
              id="button"
            >
              search
            </Button>
          </div>
          {(superUser || adminUser) && (
            <div id="addUserButton">
              <ButtonToolbar>
                <Button
                  variant="primary"
                  onClick={() => this.setState({ addModalShow: true })}
                >
                  ADD New Book
                </Button>
                <AddBook
                  show={this.state.addModalShow}
                  onHide={addModelClose}
                />
              </ButtonToolbar>
            </div>
          )}
        </div>

        <Table className="mt-4">
          <thead>
            {superUser || adminUser ? (
              <tr>
                <th width="10%">ID</th>
                <th width="10%">ISBN</th>
                <th width="10%">Author</th>
                <th width="10%">Title</th>
                <th width="10%">Price</th>
                <th width="10%">category</th>
                <th width="10%">IMG NAME</th>
                <th width="10%">Quantity</th>
              </tr>
            ) : (
              <tr>
                <th width="10%">ID</th>
                <th width="10%">ISBN</th>
                <th width="10%">Author</th>
                <th width="10%">Title</th>
                <th width="10%">Price</th>
                <th width="10%">category</th>
              </tr>
            )}
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
export default Book;
