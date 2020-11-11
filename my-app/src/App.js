import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Profile from "./components/profile.component";
import "./App.css";
import Login from "./components/login.component";
import Book from "./components/Book/book";
import AppNav from "./bookstore/AppNav";
import User from "./components/User/User";
import Cart from "./components/Cart/Cart";
import BookApp from "./bookstore/BookApp";
class App extends Component {
  state = {};
  render() {
    return (
      <div>
        <Router>
          <Route path="/" component={BookApp} />
          {/* <Route path="/bookApp/login" component={Login} /> */}
        </Router>
      </div>
    );
  }
}

export default App;
