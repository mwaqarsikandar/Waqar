import React, { Component } from "react";
import { connect } from "react-redux";
import { BrowserRouter as Router, Route } from "react-router-dom";

import Signin from "./Signin";
import Home from "./Home";
import Question from "./Question";
import Leaderboard from "./Leaderboard";
import QuestionDetails from "./QuestionDetails";

import { handleInitialData } from "../actions/shared";
import PrivateRoute from "../authentication/PrivateRoute";

class App extends Component {
  componentDidMount() {
    this.props.dispatch(handleInitialData());
    console.log("----------");
  }

  render() {
    return (
      <div className="App">
        <Router>
          <PrivateRoute path="/" exact component={Home} />
          <PrivateRoute path="/add" component={Question} />
          <PrivateRoute path="/leaderboard" component={Leaderboard} />
          <Route path="/Signin" exact component={Signin} />
          <PrivateRoute path="/questions/:id" component={QuestionDetails} />
          
        </Router>
      </div>
    );
  }
}

export default connect()(App);
