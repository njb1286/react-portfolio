import React, { Component } from 'react';
import PortfolioItem from './portfolio-item';

export default class PortfolioContainer extends Component {
    constructor() { // Only available inside a class
        super(); // Calls the extended class (Component)
        
        // v basically a global variable within this class
        this.state = { // this.state isn't required. Example: It could be this.fing.  This.state isn't reserved, it is just descriptive
            pageTitle: "Welcome to my portfolio" ,
            data: [
                {title: "Despose Inc"}, 
                {title: "Travice County PD"}, 
                {title: "Woody Construction Inc"}, 
                {title: "Fungicides Inc"}
            ]
        }
    }

    getPortfolioItems() {
        return this.state.data.map( // Map returns an array
            item => <PortfolioItem title={item.title}/> // Instead of passing in a string, you can use the bracket syntax as an alternative and allow variables as the value
            ); // The title value is not a reserved keyword, it could be anything. Title is just descriptive
    }

    render() {
        return ( // This function accepts this class's state property
            <div>
                <h2>{this.state.pageTitle}</h2>

                <PortfolioItem />
                {this.getPortfolioItems()}
            </div>
        ) // This because, it is refering to the function in this class
    }
}