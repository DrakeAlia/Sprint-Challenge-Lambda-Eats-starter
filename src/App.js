import React from "react";
import Form from './components/Form';
import Home from './components/Home';
import './App.css';
import {BrowserRouter as Router, Route, Switch, Link} from 'react-router-dom';

function App() {
  return (
    <Router>
      <nav className="navbar">
          <Link to="/">
            <button name = 'homebutton'>Home</button>
            </Link>
          <br/>
          <Link to="/form"> 
          <button name = 'orderbutton'>Order</button>
          </Link>
      </nav>
      <div className="App">
        <Switch>
          {/* A homepage that has a "/" route and links to your form (button, nav bar, or any other type of link is acceptable) */}
          <Route exact path="/" component={Home} />
          {/* A form with a "/pizza" route */}
          <Route path="/form" component={Form} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
