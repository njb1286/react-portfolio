import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import pageImage from "../../../static/assets/images/auth/login.jpg";

export default function() {
    return (
        <div className='content-page-wrapper'>
            <div className="left-column" style={{
                background: `url("${pageImage}") no-repeat`,
                backgroundSize: "cover",
                backgroundPosition: "center"
            }} />

            <div className="contact-page-content right-column">
                <div className="items-wrapper">
                    <div className="item">
                        <div className="icon-wrapper">
                            <FontAwesomeIcon icon="phone-flip" />
                        </div>
                        
                        <div className="text">555-555-5555</div>
                    </div>
                    
                    <div className="item">
                        <div className="icon-wrapper">
                            <FontAwesomeIcon icon="envelope" />
                        </div>
                        
                        <div className="text">jordan@example.com</div>
                    </div>

                    <div className="item">
                        <div className="icon-wrapper">
                            <FontAwesomeIcon icon="map-location-dot" />
                        </div>
                        
                        <div className="text">Lehi, UT</div>
                    </div>
                </div>
            </div>
        </div>
    )
}