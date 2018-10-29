import React from "react";
import { Router, Route, Switch } from "react-router";
import { Link } from "react-router-dom";
import Home from './views/Home';
import About from './views/About';
import App from './views/App';
import Rap from './views/Rap';
import { browserHistory } from './redux';


export default class MainRoutes extends React.PureComponent {
  render() {
    const NoMatch = ({ location }) => {
      return (
        <div>
          <h3>
            No match for <code>{location.pathname}</code>
          </h3>
        </div>
      );
    };
    
    return (
      <Router history={ browserHistory }>
        <div>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/app">Sample App</Link>
            </li>
            <li>
              <Link to="/rap">Redux Sample</Link>
            </li>
            <li>
              <Link to="/about-us">About Us</Link>
            </li>
          </ul>
          <Switch>
            <Route path="/" exact component={ Home } />
            <Route path="/app" component={ App } />
            <Route path="/rap" component={ Rap } />
            <Route path="/about-us" component={ About } />
            <Route component={ NoMatch } />
          </Switch>
        </div>
      </Router>
    );
  }
}