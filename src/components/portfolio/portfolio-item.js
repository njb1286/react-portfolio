import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class PortfolioItem extends Component {
    constructor(props) {
        super(props);

        this.state = {
            portfolioItemClass: ""
        }
    }
    
    render() {
        const {id, description, thumb_image_url, logo_url} = this.props.item;
        return(
            <Link to={`/portfolio/${id}`}>
                <div className='portfolio-item-wrapper'>
                    <div 
                        className="portfolio-background"
                        style={
                            {
                                backgroundImage: `url(${thumb_image_url})`
                            }
                        }/>
                        {/* These are inline styles. You have to pass in an object to get the styles to work */}
        
        
                        <div className="img-text-wrapper">
                            <div className="logo-wrapper">
                                <img src={logo_url} alt="" />
                            </div>
        
                            <div className="subtitle">{description}</div>
                        </div>
                </div>
            </Link>
        )
    }
}