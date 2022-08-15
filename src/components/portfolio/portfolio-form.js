import React, { Component } from 'react';
import axios from 'axios';

export default class PortfolioForm extends Component {
    constructor(props) {
        super(props);

        this.state = {
            name: "",
            description: "",
            category: "eCommerce",
            position: "",
            url: "",
            thumb_img: "",
            banner_img: "",
            logo: ""
        }

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    buildForm() {
        let formData = new FormData();

        formData.append('portfolioItem[name]', this.state.name); // First argument is key, second is value
        formData.append('portfolioItem[description]', this.state.description);
        formData.append('portfolioItem[url]', this.state.url);
        formData.append('portfolioItem[category]', this.state.category);
        formData.append('portfolioItem[position]', this.state.position);

        // To get values: formData.values()

        return formData;
    }

    handleChange(e) {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    handleSubmit(event) {
        axios.post(
            "https://daboss.devcamp.space/portfolio/portfolio_items", 
            this.buildForm(), 
            {withCredentials: true}
        ).then(response => {
            this.props.handleSuccessfulFormSubmission(response.data.portfolio_item);
        }).catch(error => {
            console.log("Portfolio handle submit error", error);
        })
        
        event.preventDefault();
    }

    render() {
        return (
            <div>
                <h1>PortfolioForm</h1>

                <form onSubmit={this.handleSubmit}>
                    <div>
                        <input 
                            type="text"
                            name="name"
                            placeholder='Portfolio Item Name'
                            value={this.state.name}
                            onChange={this.handleChange}
                        />

                        <select 
                            name="category"
                            value={this.state.category}
                            onChange={this.handleChange}
                        >
                            <option value="eCommerce">eCommerce</option>
                            <option value="Scheduling">Scheduling</option>
                            <option value="Enterprise">Enterprise</option>
                        </select>
                    </div>

                    <div>
                        <input 
                            type="text"
                            name="position"
                            placeholder='Position'
                            value={this.state.position}
                            onChange={this.handleChange}
                        />

                        <input 
                            type="text"
                            name="url"
                            placeholder='URL'
                            value={this.state.url}
                            onChange={this.handleChange}
                        />
                    </div>

                    <div>
                        <textarea 
                            type="text"
                            name="description"
                            placeholder='Description'
                            value={this.state.description}
                            onChange={this.handleChange}
                        />
                    </div>

                    <div>
                        <button type='submit'>Save</button>
                    </div>
                </form>
            </div>
        )
    }
}