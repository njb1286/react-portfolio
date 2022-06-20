import React, { Component } from 'react';
import moment from 'moment';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from 'react-router-dom';
import Home from './pages/home';
import About from './pages/about';
import Contact from './pages/contact';
import Blog from './pages/blog';
import PortfolioDetail from './portfolio/portfolio-detail';
import NoMatch from './pages/no-match';

import NavigationContainer from './navigation/navigation-container';

export default class App extends Component {
  render() {
    return (
      <div className='app'>
        <Router>
          <div>

            <h1>Woody's React Portfolio</h1>
            <div>{moment().format('MMMM Do YYYY, h:mm:ss a')}</div>
            <NavigationContainer />

            <Switch> {/* The switch is basically an if statement. If the page matches, it will load that code */}
              <Route exact path="/" component={Home} /> {/* Needs to be exact because if it isn't exact, it will see the directory in other pages and think that they are the homepage */}
              <Route path="/about-us" component={About} />
              <Route path="/contact-us" component={Contact} />
              <Route path="/blog" component={Blog} />
              <Route extact path="/portfolio/:custom" component={PortfolioDetail} />
              <Route component={NoMatch} /> {/* This route is the last one picked, therefore the catch if nothing else is found */}
            </Switch>
          </div>
        </Router>
      </div>
    );
  }
}
