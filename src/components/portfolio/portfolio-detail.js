import axios from 'axios';
import React, { Component } from 'react';

export default class PortfolioDetail extends Component {
    constructor(props) {
        super(props);

        this.state = {
            portfolioItem: {}
        }
    }

    componentWillMount() {
        this.getPortfolioItem();
    }

    getPortfolioItem() {
        axios.get(
            `https://daboss.devcamp.space/portfolio/portfolio_items/${this.props.match.params.slug}`,
            { withCredentials: false }
        ).then(response => {
            this.setState({
                portfolioItem: response.data.portfolio_item
            });
        }).catch(e => {
            console.log("handleLoadItem error", e);
        })
    }

    render() {
        const {
            banner_image_url,
            category,
            description,
            logo_url,
            id,
            name,
            position,
            thumb_image_url,
            url
        } = this.state.portfolioItem;

        const bannerStyles = {
            backgroundImage: `url("${banner_image_url}")`,
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
            backgroundPosition: "center"
        };

        return (
        <div className="portfolio-detail-wrapper">
            <div className="banner" style={bannerStyles}>
                <img src={logo_url} />
            </div>

            <div className="portfolio-detail-description-wrapper">
                <div className="description">
                    {description}
                </div>
            </div> 

            <div className="footer">
                <a href={url} className="site-link" target="_blank">
                    Visit {name}
                </a>
            </div>   
        </div>
        )
    }
}