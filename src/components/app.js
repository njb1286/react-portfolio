import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from 'react-router-dom';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Icons from '../helpers/icons';


import Home from './pages/home';
import About from './pages/about';
import Contact from './pages/contact';
import Blog from './pages/blog';
import BlogDetail from './pages/blog-detail';
import PortfolioDetail from './portfolio/portfolio-detail';
import PortfolioManager from './pages/portfolio-manager';
import NoMatch from './pages/no-match';
import NavigationContainer from './navigation/navigation-container';
import Auth from './pages/auth'; 


export default class App extends Component {
  constructor(props) {
    super(props);

    Icons();

    this.state = {
      loggedInStatus: "NOT_LOGGED_IN"
    }

    this.handleSuccessfulLogin = this.handleSuccessfulLogin.bind(this);
    this.handleUnsuccessfulLogin = this.handleUnsuccessfulLogin.bind(this);
    this.checkLoginStatus = this.checkLoginStatus.bind(this);
    this.handleSuccessfulLogout = this.handleSuccessfulLogout.bind(this);
  }

  handleSuccessfulLogin() {
    this.setState({
      loggedInStatus: "LOGGED_IN"
    })
  }

  handleUnsuccessfulLogin() {
    this.setState({
      loggedInStatus: "NOT_LOGGED_IN"
    })
  }

  handleSuccessfulLogout() {
    this.setState({
      loggedInStatus: "NOT_LOGGED_IN"
    })
  }

  checkLoginStatus() {
    return axios.get("https://api.devcamp.space/logged_in", {
       withCredentials: true 
      }).then(response => {
        const loggedIn = response.data.logged_in;
        const loggedInStatus = this.state.loggedInStatus;

        if (loggedIn && loggedInStatus === "LOGGED_IN") return loggedIn; // If logged in and the state says logged in
        else if (loggedIn && loggedInStatus === "NOT_LOGGED_IN") this.handleSuccessfulLogin(); // If logged in but the state says not logged in
        else if (!loggedIn && loggedInStatus === "LOGGED_IN") this.handleUnsuccessfulLogin(); // If not logged in but the state says logged in
      }).catch(e => console.log("Error", e));
  }

  componentDidMount() {
    this.checkLoginStatus();
  }

  authorizedPages() {
    return [
      <Route key="portfolio-manager" path="/portfolio-manager" component={PortfolioManager} /> // The key is for React to keep track of this item
    ]
  }

  render() {
    return (
      <div className='container'>
        <Router>
          <div>

            <NavigationContainer 
              loggedInStatus={this.state.loggedInStatus} 
              logOut={this.handleSuccessfulLogout}
            /> {/* Passing in a funciton as an argument */}

            <Switch> {/* The switch is basically an if statement. If the page matches, it will load that code */}
              <Route exact path="/" component={Home} /> {/* Needs to be exact because if it isn't exact, it will see the directory in other pages and think that they are the homepage */}
              <Route path="/about-us" component={About} />
              
              <Route 
                path="/auth" 
                render={props => (
                  <Auth
                    {...props}
                    handleSuccessfulLogin={this.handleSuccessfulLogin}
                    handleUnsuccessfulLogin={this.handleUnsuccessfulLogin}
                    />
                )}
                />

              <Route path="/contact-us" component={Contact} />

              <Route path="/blog" render={props => (
                <Blog {...props} loggedInStatus={this.state.loggedInStatus} /> // The {...props} gives the function all the other props inside of the props variable
              )} />

              <Route 
                path="/b/:slug" 
                render={props => (
                  <BlogDetail {...props} loggedInStatus={this.state.loggedInStatus} />
                )} 
              />


              {this.state.loggedInStatus === "LOGGED_IN" ? this.authorizedPages() : null}
              <Route extact path="/portfolio/:slug" component={PortfolioDetail} />
              <Route component={NoMatch} /> {/* This route is the last one picked, therefore the catch if nothing else is found */}
            </Switch>
          </div>
        </Router>
      </div>
    );
  }
}
