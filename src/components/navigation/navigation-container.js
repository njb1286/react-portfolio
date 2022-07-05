import React from 'react';
import axios from 'axios';
import { withRouter } from 'react-router';
import { NavLink } from 'react-router-dom';

const NavigationComponent = props => {
    const dynamicLink = (route, linkText) => {
        return (
            <div className="nav-link-wrapper">
                <NavLink to={route} activeClassName='nav-link-active'>
                    {linkText}
                </NavLink>
            </div>
        )
    }

    const handleSignout = () => {
        axios
        .delete('https://api.devcamp.space/logout', {withCredentials: true})
        .then(response => {
            if (response.status === 200) {
                props.history.push('/');
                props.handleSuccessfulLogout();
            }
            return response.data;
        })
        .catch(e => {
            console.log("Error signing out", e);
        })
    }

    return (
        <div className='nav-wrapper'>
            <div className="left-side">
                <div className="nav-link-wrapper">
                    <NavLink exact to="/" activeClassName='nav-link-active'>
                        Home
                    </NavLink>
                </div>

                <div className="nav-link-wrapper">
                    <NavLink to="/about-us" activeClassName='nav-link-active'>
                        About
                    </NavLink>
                </div>

                <div className="nav-link-wrapper">
                    <NavLink to="/contact-us" activeClassName='nav-link-active'>
                        Contact
                    </NavLink>
                </div>

                <div className="nav-link-wrapper">
                    <NavLink to="/blog" activeClassName='nav-link-active'>
                        Blog
                    </NavLink>
                </div>

                {props.loggedInStatus === "LOGGED_IN" ? dynamicLink("/portfolio-manager", "Portfolio Manager") : null}
                                    {/* The active link (The rendered page in the url) is given the class active */}

                {/* <a href="/">Wrong home</a>  <-- The reason we don't do this is because clicking on this reloads the entire page, while the other method doesn't */}
                {/*false ? <button>Add Blog</button> : null */} {/* This is a ternary operator in JSX */}
            </div>

            <div className="right-side">
                WOODY WOOD WOOD

                {props.loggedInStatus === 'LOGGED_IN' ? <a onClick={handleSignout}>Signout</a> : null}
            </div>
        </div>
    )
}

export default withRouter(NavigationComponent); {/* Highter order component */}