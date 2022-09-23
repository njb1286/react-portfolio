import React, { Component, createRef } from 'react';
import axios from 'axios';
import { DropzoneComponent } from 'react-dropzone-component';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import RichTextEditor from '../forms/rich-text-editor';
import { faTextHeight } from '@fortawesome/free-solid-svg-icons';

export default class BlogForm extends Component {
    constructor(props) {
        super(props);

        this.state = {
            id: 0,
            title: "",
            blog_status: "",
            content: "",
            featured_image: "",
            apiUrl: "https://daboss.devcamp.space/portfolio/portfolio_blogs",
            apiAction: "post"
        }

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleRichTextEditorChange = this.handleRichTextEditorChange.bind(this);

        this.componentConfig = this.componentConfig.bind(this);
        this.djsConfig = this.djsConfig.bind(this);
        this.handleFeatureImageDrop = this.handleFeatureImageDrop.bind(this);
        this.deleteImage = this.deleteImage.bind(this);

        this.featuredImageRef = createRef();
    }

    componentWillMount() {
        if (this.props.editMode) {
            this.setState({
                id: this.props.blog.id,
                title: this.props.blog.title,
                blog_status: this.props.blog.blog_status,
                content: this.props.blog.content,

                apiUrl: `https://daboss.devcamp.space/portfolio/portfolio_blogs/${this.props.blog.id}`,
                apiAction: "patch"
            })
        }
    }

    componentConfig() { // All these functions do is return an object so that on calling the dropzone component, it is very clean and straightforward
        return {
            iconFiletypes: [".jpg", ".png"],
            showFiletypeIcon: true,
            postUrl: "https://httpbin.org/post"
        }
    }

    djsConfig() {
        return {
            addRemoveLinks: true,
            maxFiles: 1
        }
    }

    handleFeatureImageDrop() {
        return {
            addedfile: file => this.setState({ featured_image: file }) // Note that the key is not cammel case.
        }
    }

    handleRichTextEditorChange(content) {
        this.setState({
            content // Note that if you have a value with the same key, you can just call the variable and it will do the same thing
        })
    }

    buildForm() {
        let formData = new FormData();

        formData.append("portfolio_blog[title]", this.state.title); // This API uses this string syntax portfolio_blog[item]
        formData.append("portfolio_blog[blog_status]", this.state.blog_status);
        formData.append("portfolio_blog[content]", this.state.content);

        if (this.state.featured_image) formData.append("portfolio_blog[featured_image]", this.state.featured_image);
        
        return formData;
    }

    handleChange(event) {
        this.setState({
            [event.target.name]: event.target.value
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
            if (this.state.featured_image) this.featuredImageRef.current.dropzone.removeAllFiles();

            this.setState({
                title: "",
                blog_status: "",
                featured_image: ""
            });

            if (this.props.editMode) {
                // Update blog detail
                this.props.handleUpdateFormSubmission(response.data.portfolio_blog);
            } else this.props.handleSuccessfulFormSubmission(response.data.portfolio_blog);
            
        }).catch(e => {
            console.log("blog-form handleSubmit error", e);
        })

        event.preventDefault();
    }

    deleteImage(imageType) {
        axios.delete(
            `https://api.devcamp.space/portfolio/delete-portfolio-blog-image/${this.state.id}?image_type=${imageType}`, 
            { withCredentials: true }
        ).then(response => {
            this.props.removeFeaturedImage();
        }).catch(error => {
            console.log("deleteImage error", error);
        })
    }

    render() {
        return (
            <form onSubmit={this.handleSubmit} className="blog-form-wrapper">
                <div className="two-column">
                    <input 
                        type="text" 
                        onChange={this.handleChange} 
                        name="title"
                        placeholder='Blog Title'
                        value={this.state.title}
                    />                

                    <input 
                        type="text" 
                        onChange={this.handleChange} 
                        name="blog_status"
                        placeholder='Blog Status'
                        value={this.state.blog_status}
                    />                
                </div>

                <div className="one-column">
                    <RichTextEditor 
                        handleRichTextEditorChange={this.handleRichTextEditorChange} 
                        editMode={this.props.editMode}
                        contentToEdit={this.props.editMode && this.props.blog.content ? this.props.blog.content : null}
                    />
                </div>

                <div className="image-uploaders">
                    {
                        this.props.editMode && this.props.blog.featured_image_url ? (
                            <div className="image-wrapper">
                                <img 
                                    style={{width: "100%"}}
                                    src={this.props.blog.featured_image_url}
                                />

                                <div className="image-removal-link">
                                    <a onClick={() => this.deleteImage("featured_image")} className="remove-image-wrapper">
                                        <FontAwesomeIcon icon="trash-can"/>
                                    </a>
                                </div>
                            </div>
                        ) : (
                            <DropzoneComponent
                                ref={this.featuredImageRef}
                                config={this.componentConfig()}
                                djsConfig={this.djsConfig()}
                                eventHandlers={this.handleFeatureImageDrop()}
                            >
                                <div className="dz-message">Featured Image</div>
                            </DropzoneComponent>
                        )
                    }
                </div>

                <button className="btn">Save</button>
            </form>
        )
    }
}