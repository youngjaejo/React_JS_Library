import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Profile from "../components/profile.component";
import "../App.css";
import Login from "../components/login.component";
import Book from "../components/Book/book";
import AppNav from "./AppNav";
import User from "../components/User/User";
import Cart from "../components/Cart/Cart";
class BookApp extends Component {
  state = {};
  render() {
    return (
      <Router>
        <AppNav />
        <Switch>
          <Route path="/" component={Book} />
          <Route path="/bookApp/login" component={Login} />
          <Route path="/bookApp/users" component={User} />
          <Route path="/bookApp/profile" component={Profile} />
          <Route path="/bookApp/cart" component={Cart} />
        </Switch>
      </Router>
    );
  }
}

export default BookApp;
