import React from 'react';

export default function(props) {
    if (!props.img) return null;

    return (
        <div className="featured-image-wrapper">
            <img src={props.img} />
        </div>
    )
}