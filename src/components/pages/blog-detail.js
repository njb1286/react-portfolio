import React, { Component } from 'react';
import axios from 'axios';
import HtmlParser from "react-html-parser";

import BlogFeaturedImage from '../blog/blog-featured-image';
import BlogForm from '../blog/blog-form';

export default class BlogDetail extends Component {
    constructor(props) {
        super(props);

        this.state = {
            currentId: this.props.match.params.slug,
            blogItem: {},
            editMode: false
        }

        this.handleEditClick = this.handleEditClick.bind(this);
        this.removeFeaturedImage = this.removeFeaturedImage.bind(this);
        this.handleUpdateFormSubmission = this.handleUpdateFormSubmission.bind(this);
    }

    handleUpdateFormSubmission(blog) {
        this.setState({
            blogItem: blog,
            editMode: false
        })
    }

    removeFeaturedImage() {
        this.setState({
            blogItem: {
                featured_image_url: ""
            }
        })
    }

    handleEditClick() {
        if (this.props.loggedInStatus === "LOGGED_IN") {
            this.setState({
                editMode: true
            });
        }
    }

    getBlogItem() {
        axios.get(
            `https://daboss.devcamp.space/portfolio/portfolio_blogs/${this.state.currentId}`
        ).then(response => {
            this.setState({
                blogItem: response.data.portfolio_blog
            })
        }).catch(e => {
            console.log("getBlogItem error", e);
        })
    }
    
    componentDidMount() {
        this.getBlogItem();
    }

    render() {
        const {
            title,
            content,
            featured_image_url,
            blog_status
        } = this.state.blogItem;

        const contentManager = () => {
            if (this.state.editMode) return <BlogForm handleUpdateFormSubmission={this.handleUpdateFormSubmission} editMode={this.state.editMode} blog={this.state.blogItem} removeFeaturedImage={this.removeFeaturedImage} />;
            else {
                return (
                    <div className="content-container">
                        <div className="title-wrapper">
                            <h1 onClick={this.handleEditClick} className="click-to-edit-title">{title}</h1>
                        </div>

                        <BlogFeaturedImage img={featured_image_url} /> {/* This was done instead of putting the statement in this file. This is the perferred way of doing this */}

                        <div className='content'>{HtmlParser(content)}</div>
                    </div>
                )
            }
        }

        return (
            <div className='blog-container'>{contentManager()}</div>
        )
    }
}