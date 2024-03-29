import React, { Component } from 'react';
import axios from 'axios';
import DropzoneComponent from 'react-dropzone-component';

import "../../../node_modules/react-dropzone-component/styles/filepicker.css";
import "../../../node_modules/dropzone/dist/min/dropzone.min.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

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
            logo: "",
            editMode: false,
            apiUrl: "https://daboss.devcamp.space/portfolio/portfolio_items",
            apiAction: "post",
            thumb_image: "",
            banner_image: "",
            logo: ""
        }

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.componentConfig = this.componentConfig.bind(this);
        this.djsConfig = this.djsConfig.bind(this);
        this.handleThumbDrop = this.handleThumbDrop.bind(this);
        this.handleBannerDrop = this.handleBannerDrop.bind(this);
        this.handleLogoDrop = this.handleLogoDrop.bind(this);
        this.deleteImage = this.deleteImage.bind(this);

        this.thumbRef = React.createRef();
        this.bannerRef = React.createRef();
        this.logoRef = React.createRef(); // References
    }

    deleteImage(imageType) {
        axios.delete(
            `https://api.devcamp.space/portfolio/delete-portfolio-image/${this.state.id}?image_type=${imageType}`, 
            { withCredentials: true }
        ).then(response => {
            this.setState({
                // When you don't know the name of the key, you can wrap it in brackets
                [`${imageType}_url`]: ""
            })
        }).catch(error => {
            console.log("deleteImage error", error);
        })
    }

    componentDidUpdate() {
        if (Object.keys(this.props.portfolioToEdit).length) {
            console.log("portfolioToEdit", this.props.portfolioToEdit)
            const {
                id,
                name,
                description,
                category,
                position,
                url,
                thumb_image_url,
                banner_image_url,
                logo_url
            } = this.props.portfolioToEdit

            this.setState({
                id: id,
                name: name || "",
                description: description || "",
                category: category || "",
                position: position || "",
                url: url || "",
                thumb_img: "",
                banner_img: "",
                logo: "",
                editMode: true,
                apiUrl: `https://daboss.devcamp.space/portfolio/portfolio_items/${id}`,
                apiAction: "patch",
                thumb_image_url: thumb_image_url || "",
                banner_image_url: banner_image_url || "",
                logo_url: logo_url || ""
            })
            
            console.log("State", this.state);
            this.props.clearPortfolioToEdit();
        }
    }

    handleThumbDrop() {
        return {
            addedfile: file => this.setState({thumb_img: file})
        }
    }

    handleBannerDrop() {
        return {
            addedfile: file => this.setState({banner_img: file})
        }
    }

    handleLogoDrop() {
        return {
            addedfile: file => this.setState({logo: file})
        }
    }

    componentConfig() {
        return {
            iconFiletypes: [".jpg", ".png"],
            showFiletypeIcon: true,
            postUrl: "https://httpbin.org/post"
        }
        // Values are speciffic for the dropzone library
    }

    djsConfig() {
        return {
            addRemoveLinks: true,
            maxFiles: 1
        }
    }

    buildForm() {
        let formData = new FormData();

        formData.append('portfolioItem[name]', this.state.name); // First argument is key, second is value
        formData.append('portfolioItem[description]', this.state.description);
        formData.append('portfolioItem[url]', this.state.url);
        formData.append('portfolioItem[category]', this.state.category);
        formData.append('portfolioItem[position]', this.state.position);

        if (this.state.thumb_img) formData.append('portfolioItem[thumb_img]', this.state.thumb_img);
        if (this.state.banner_img) formData.append('portfolioItem[banner_img]', this.state.banner_img);
        if (this.state.logo) formData.append('portfolioItem[logo]', this.state.banner_img);

        // To get values: formData.values()

        console.log("Form Data", {
            name: this.state.name,
            description: this.state.description,
            url: this.state.url,
            category: this.state.category,
            position: this.state.position,
            thumb_image: this.state.thumb_img
        });

        return formData;
    }
    
    handleChange(e) {
        this.setState({
            [e.target.name]: e.target.value
        })
    }
    
    handleSubmit(event) {
        axios({
            method: this.state.apiAction,
            url: this.state.apiUrl,
            data: this.buildForm(),
            withCredentials: true
        })
            .then(response => {
                if (this.state.editMode) this.props.handleEditFormSubmission(); 
                else this.props.handleNewFormSubmission();
                
                this.props.handleNewFormSubmission(response.data.portfolio_item);

                this.setState({
                    name: "",
                    description: "",
                    category: "eCommerce",
                    position: "",
                    url: "",
                    thumb_img: "",
                    banner_img: "",
                    logo: "",
                    editMode: false,
                    apiUrl: "https://daboss.devcamp.space/portfolio/portfolio_items",
                    apiAction: "post"
                })

                [this.thumbRef, this.bannerRef, this.logoRef].forEach(ref => ref.current.dropzone.removeAllFiles());
        }).catch(error => {
            console.log("Portfolio handle submit error", error);
        })
        
        event.preventDefault();
    }

    render() {
        return (
            <form onSubmit={this.handleSubmit} className="portfolio-form-wrapper">
                <div className='two-column'>
                    <input 
                        type="text"
                        name="name"
                        placeholder='Portfolio Item Name'
                        value={this.state.name}
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

                <div className='two-column'>
                    <input 
                        type="text"
                        name="position"
                        placeholder='Position'
                        value={this.state.position}
                        onChange={this.handleChange}
                    />

                    <select 
                        name="category"
                        value={this.state.category}
                        onChange={this.handleChange}
                        className="select-element"
                    >
                        <option value="eCommerce">eCommerce</option>
                        <option value="Scheduling">Scheduling</option>
                        <option value="Enterprise">Enterprise</option>
                    </select>
                </div>

                <div className='one-column'>
                    <textarea 
                        type="text"
                        name="description"
                        placeholder='Description'
                        value={this.state.description}
                        onChange={this.handleChange}
                    />
                </div>

                <div className="image-uploaders">

                    {
                        this.state.thumb_image_url && this.state.editMode ? (
                        <div className="portfolio-manager-image-wrapper">
                            <img src={this.state.thumb_image_url}/>

                            <div className="image-removal-link">
                                <a onClick={() => this.deleteImage("thumb_image")}>
                                    <FontAwesomeIcon icon="trash-can"/>
                                </a>
                            </div>
                        </div>
                    ) : (
                        <DropzoneComponent 
                            ref={this.thumbRef}
                            config={this.componentConfig()}
                            djsConfig={this.djsConfig()} // Must be called so that the objects can be returned on load
                            eventHandlers={this.handleThumbDrop()}
                        >
                            <div className="dz-message">Thumbnail</div>
                        </DropzoneComponent>
                        )

                    }

                    {this.state.banner_image_url && this.state.editMode ? (
                        <div className="portfolio-manager-image-wrapper">
                            <img src={this.state.banner_image_url}/>

                            <div className="image-removal-link">
                                <a onClick={() => this.deleteImage("banner_image")}>
                                    <FontAwesomeIcon icon="trash-can"/>
                                </a>
                            </div>
                        </div>
                    ) : (
                        <DropzoneComponent 
                            ref={this.bannerRef}
                            config={this.componentConfig()}
                            djsConfig={this.djsConfig()} // Must be called so that the objects can be returned on load
                            eventHandlers={this.handleBannerDrop()}
                        >
                            <div className="dz-message">Banner Image</div>
                        </DropzoneComponent>
                        )

                    }

                   {this.state.logo_url && this.state.editMode ? (
                       <div className="portfolio-manager-image-wrapper">
                           <img src={this.state.logo_url}/>

                           <div className="image-removal-link">
                                <a className="remove-image-wrapper" onClick={() => this.deleteImage("logo")}>
                                    <FontAwesomeIcon icon="trash-can"/>
                                </a>
                            </div>
                       </div>
                   )  : (
                        <DropzoneComponent 
                            ref={this.logoRef}
                            config={this.componentConfig()}
                            djsConfig={this.djsConfig()} // Must be called so that the objects can be returned on load
                            eventHandlers={this.handleLogoDrop()}
                        >
                            <div className="dz-message">Logo</div>
                        </DropzoneComponent>
                        )
                    }
                </div>

                <div>
                    <button className="btn" type='submit'>Save</button>
                </div>
            </form>
        )
    }
}
