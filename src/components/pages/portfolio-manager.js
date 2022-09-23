import React, { Component } from 'react';
import axios from 'axios';

import PortfolioSidebarList from '../portfolio/portfolio-sidebar-list';
import PortfolioForm from '../portfolio/portfolio-form';

export default class PortfolioManager extends Component {
    constructor() {
        super();

        this.state = {
            portfolioItems: [],
            portfolioToEdit: {}
        }

        this.getPortfolioItems = this.getPortfolioItems.bind(this);
        this.handleNewFormSubmission = this.handleNewFormSubmission.bind(this);
        this.handleEditFormSubmission = this.handleEditFormSubmission.bind(this);
        this.handleFormSubmissionError = this.handleFormSubmissionError.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
        this.handleEditClick = this.handleEditClick.bind(this);
        this.clearPortfolioToEdit = this.clearPortfolioToEdit.bind(this);
    }

    clearPortfolioToEdit() {
        this.setState({
            portfolioToEdit: {}
        });
    }

    handleEditClick(portfolioItem) {
        this.setState({
            portfolioToEdit: portfolioItem
        })
        console.log("portfolioItem", portfolioItem);
    }

    handleDelete(item) {
        axios.delete(
            `https://api.devcamp.space/portfolio/portfolio_items/${item.id}`, 
            { withCredentials: true } // withCredentials makes sure that you are logged in and have access to these items
        ).then(response => {
            this.setState({
                portfolioItems: this.state.portfolioItems.filter(itm => {
                    return itm.id !== item.id;
                })
            });

            return response.data;
        }).catch(e => {
            console.log("handleDelete error", e);
        })
    }

    handleEditFormSubmission() {
        this.getPortfolioItems();
    }

    handleNewFormSubmission(portfolioItem) {
        this.setState({
            portfolioItems: [portfolioItem].concat(this.state.portfolioItems) // Creating an array, then merging it with the main array
        })
    }

    handleFormSubmissionError(error) {
        console.log("handleFromSubmissionError", error);
    }

    getPortfolioItems() {
        axios.get('https://daboss.devcamp.space/portfolio/portfolio_items', {withCredentials: true}) // Reset the color from my color extension&r
        .then(response => {
            this.setState({
                portfolioItems: [...response.data.portfolio_items]
            })
        })
        .catch(error => {
            console.log("Error from getPortfolioItems", error);
        })
    }

    componentDidMount() {
        this.getPortfolioItems();
    }

    render() {
        return (
            <div className='portfolio-manager-wrapper'>
                <div className="left-column">
                    <PortfolioForm 
                        formSubmission={this.handleNewFormSubmission}
                        handleEditFormSubmission={this.handleEditFormSubmission}
                        formSubmissionError={this.handleFormSubmissionError}
                        clearPortfolioToEdit={this.clearPortfolioToEdit}
                        portfolioToEdit={this.state.portfolioToEdit}
                    />
                </div>

                <div className="right-column">
                    <PortfolioSidebarList 
                        data={this.state.portfolioItems} 
                        handleDelete={this.handleDelete}
                        handleEditClick={this.handleEditClick}
                    />
                </div>
            </div>
        )
    }
}