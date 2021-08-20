import "./route.css";

import { Link, Route, BrowserRouter as Router, Switch } from "react-router-dom";
import React, { useEffect } from "react";

import { Home } from "../screens/Home";
import { User } from "../screens/User";
import { useLocation } from "react-router-dom";

// const location = useLocation();
export const BaseContainer = () => {
  
  
  useEffect(() => {
    const pathname = window.location.pathname
  }, []);

  return (
    <Router>
      <div>
        <nav className="main-header">
          <ul className="ul-block">
            <li className="li-block">
              <Link to="/">Home</Link>
            </li>
            {/* <li className="li-block">
              <Link to="/users">Users</Link>
            </li> */}
          </ul>
        </nav>

        <Switch>
          <Route path="/users">
            <User />
          </Route>
          <Route path="/">
            <Home />
          </Route>
        </Switch>
      </div>
    </Router>
  );
};
