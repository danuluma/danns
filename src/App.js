import React, { Component } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import "./App.css";
import NavBar from "./components/NavBar";
import Home from "./components/Home";
import { Container } from "react-bootstrap";

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <React.Fragment>
          <NavBar />
          <Container className="App">
            <Switch>
              <Route path="/" render={() => <Home />} />
            </Switch>
          </Container>
        </React.Fragment>
      </BrowserRouter>
    );
  }
}

export default App;
