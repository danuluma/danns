import React, { Component } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import "./App.css";
import MemeMaker from "./components/Manual";
import NavBar from "./components/NavBar";

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <React.Fragment>
          <NavBar />
          <Switch>
            <Route path="/" render={() => <MemeMaker />} />
          </Switch>
        </React.Fragment>
      </BrowserRouter>
    );
  }
}

export default App;
