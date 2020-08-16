import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Profile from "./components/profile.component";
import "./App.css";
import Login from "./components/login.component";
import Book from "./components/Book/book";
import AppNav from "./AppNav";
import User from "./components/User/User";
class App extends Component {
  state = {};
  render() {
    return (
      <Router>
        <AppNav />
        <Switch>
          <Route path="/books" component={Book} />
          <Route path="/login" component={Login} />
          <Route path="/users" component={User} />
          <Route path="/profile" component={Profile} />
        </Switch>
      </Router>
    );
  }
}

export default App;
