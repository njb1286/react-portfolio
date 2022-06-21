import React, { Component } from 'react';
import axios from 'axios';

import PortfolioItem from './portfolio-item';

export default class PortfolioContainer extends Component {
    constructor() { // Only available inside a class
        super(); // Calls the extended class (Component)
        
        // v basically a global variable within this class
        this.state = { // this.state isn't required. Example: It could be this.fing.  This.state isn't reserved, it is just descriptive
            pageTitle: "Welcome to my portfolio",
            isLoading: false,
            data: [
                
            ]
        }

        // this.handlePageTitleUpdate = this.handlePageTitleUpdate.bind(this);

        // Bind is a function. This call is redefining this.handlePageTitleUpdate and allowing it access to this class
        // Also is done in the constructor

        this.handleFilter = this.handleFilter.bind(this);
}

    importPortfolioItems() {
            axios.get('https://daboss.devcamp.space/portfolio/portfolio_items')
        .then(response => {
            // handle success
            this.setState({
                data: response.data.portfolio_items
            })
        })
        .catch(error => { // The reason for the arrow function is because the this keyword is different for arrow functions.
            // handle error
            throw new Error(error);
        })
    }

    handleFilter(filter) {
        this.setState(
            {
                data: this.state.data.filter(item => item.category === filter)
            }
        )
    }

    getPortfolioItems() {
        return this.state.data.map( // Map returns an array
            item => {
                console.log("Item data", item);
                return <PortfolioItem title={item.name} url={item.url} id={item.id} />;
            } // Instead of passing in a string, you can use the bracket syntax as an alternative and allow variables as the value
            ); // The title value is not a reserved keyword, it could be anything. Title is just descriptive
    } // However, if you want to access it with the setState function, it must be this.state

    // handlePageTitleUpdate() {
    //     this.setState(
    //         {
    //             pageTitle: "Something else"
    //         }
    //     )
    // }

    componentDidMount() {
        this.importPortfolioItems();
    }

    render() {
        if (this.state.isLoading) {
            return <div>Loading...</div>;
        }
        
        return ( // This function accepts this class's state property
            <div>
                <h2>{this.state.pageTitle}</h2>

                <button onClick={() => this.handleFilter('Destroy')}>Destroy</button>
                <button onClick={() => this.handleFilter('Police')}>Police</button>
                <button onClick={() => this.handleFilter('Build')}>Build</button> {/* The function because without it, the program will try to run this function immediately because of the way JavaScript deals with arguments of functions */}

                {/* <PortfolioItem /> */} {/* This is for the homepage */}
                {this.getPortfolioItems()}
                
                {/* <hr/>
                
                <button onClick={this.handlePageTitleUpdate}>Change title</button> */}
            </div>
        ) // This because, it is refering to the function in this class
    } // The onClick listener needs to be bound to this class
}