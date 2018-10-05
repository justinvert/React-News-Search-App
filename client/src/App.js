import React from "react";
import './App.css';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Articles from "./pages/Articles";
import Navbar from "./components/Navbar";

const App = () => (
  <Router>
    <div>
    <Navbar />
     <Switch>
        <Route exact path="/" component={Articles} />
      </Switch>
    </div>
  </Router>
);

export default App;

