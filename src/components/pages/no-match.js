import React from 'react';
import { Link } from 'react-router-dom';

export default function(props) {
    console.log(props);
    return (
        <div>
            <h2>Sorry! We couldn't find the page {props.location.pathname.replace('/', '')}!</h2>
            <Link to="/">Go home</Link>
        </div>
    )
}