import React, { Component } from 'react';
import PortfolioItem from './portfolio-item';

export default class PortfolioContainer extends Component {
    constructor() { // Only available inside a class
        super(); // Calls the extended class (Component)
        
        // v basically a global variable within this class
        this.state = { // this.state isn't required. Example: It could be this.fing.  This.state isn't reserved, it is just descriptive
            pageTitle: "Welcome to my portfolio",
            isLoading: false,
            data: [
                {title: "Despose Inc", category: "Destroy", url: "destroy.com"}, 
                {title: "Travice County PD", category: "Police", url: "travice-county-police-department.com"}, 
                {title: "Woody Construction Inc", category: "Build", url: "woody-construction-incorporated.com"}, 
                {title: "Fungicides Inc", category: "Destroy", url: "woody-burrette-removal.com"}
            ]
        }

        // this.handlePageTitleUpdate = this.handlePageTitleUpdate.bind(this);

        // Bind is a function. This call is redefining this.handlePageTitleUpdate and allowing it access to this class
        // Also is done in the constructor

        this.handleFilter = this.handleFilter.bind(this);
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
            item => <PortfolioItem title={item.title} url={item.url}/> // Instead of passing in a string, you can use the bracket syntax as an alternative and allow variables as the value
            ); // The title value is not a reserved keyword, it could be anything. Title is just descriptive
    } // However, if you want to access it with the setState function, it must be this.state

    // handlePageTitleUpdate() {
    //     this.setState(
    //         {
    //             pageTitle: "Something else"
    //         }
    //     )
    // }

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

                <PortfolioItem />
                {this.getPortfolioItems()}
                
                {/* <hr/>
                
                <button onClick={this.handlePageTitleUpdate}>Change title</button> */}
            </div>
        ) // This because, it is refering to the function in this class
    } // The onClick listener needs to be bound to this class
}