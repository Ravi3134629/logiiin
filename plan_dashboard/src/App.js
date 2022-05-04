import "./App.css";
import Header from "./components/Header";
import Dashboard from "./components/Dashboard";
import React from "react";
import getUser from "./utils/getUser";
import Cookies from "js-cookies";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Home from "./pages/Home";
import Auth from "./pages/Auth";
function App() {
  return (
    <Router>
      <div>
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>

          <Route
            exact
            path="/auth/:type"
            render={(props) => {
              const type = props.match.params.type;
              return <Auth type={type && type} />;
            }}
          />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
