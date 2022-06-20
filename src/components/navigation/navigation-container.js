import React, {Component} from 'react';
import { NavLink } from 'react-router-dom';

export default class NavigationContainer extends Component {
    constructor() {
        super();
    }

    render() {
        return (
            <div>

                <NavLink exact to="/" activeClassName='nav-link-active'>
                    Home
                </NavLink>

                <NavLink to="/about-us" activeClassName='nav-link-active'>
                    About
                </NavLink>

                <NavLink to="/contact-us" activeClassName='nav-link-active'>
                    Contact
                </NavLink>
                                    {/* The active link (The rendered page in the url) is given the class active */}
                <NavLink to="/blog" activeClassName='nav-link-active'>
                    Blog
                </NavLink>

                {/* <a href="/">Wrong home</a>  <-- The reason we don't do this is because clicking on this reloads the entire page, while the other method doesn't */}
                {false ? <button>Add Blog</button> : null} {/* This is a ternary operator in JSX */}
            </div>
        )
    }
}