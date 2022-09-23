import React, { Component } from 'react'; // Remember: Stuff inside brackets are normal functions, the stuff outside brackets is the default exporter
import { Link } from 'react-router-dom';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import BlogItem from '../blog/blog-item';
import BlogModal from '../modals/blog-modal';

class Blog extends Component {
    constructor() {
        super();

        this.state = {
            blogItems: [],
            totalCount: 0,
            currentPage: 0,
            isLoading: true,
            blogModalIsOpen: false
        }

        this.getBlogItems = this.getBlogItems.bind(this);
        this.getPosts = this.getPosts.bind(this);
        this.onScroll = this.onScroll.bind(this);
        this.handleModalOpen = this.handleModalOpen.bind(this);
        this.handleModalClose = this.handleModalClose.bind(this);
        this.handleSuccessfulNewBlogSubmission = this.handleSuccessfulNewBlogSubmission.bind(this);
        this.handleDeleteClick = this.handleDeleteClick.bind(this);

        window.addEventListener('scroll', this.onScroll, false) // Moved this event listener to the constructor because of a memory leak bug, then remove the event listener after everything has been run
    }

    handleDeleteClick(blog) {
        axios.delete(
            `https://api.devcamp.space/portfolio/portfolio_blogs/${blog.id}`, 
            { withCredentials: true }
        ).then(response => {
            this.setState({
                blogItems: this.state.blogItems.filter(blogItem => blog.id !== blogItem.id)
            });

            return response.data;
        }).catch(e => {
            console.log("handleDeleteClick error", e);
        })
    }

    handleSuccessfulNewBlogSubmission(blog) {
        this.setState({
            blogModalIsOpen: false,
            blogItems: [blog].concat(this.state.blogItems)
        })
    }

    handleModalOpen() {
        this.setState({
            blogModalIsOpen: true
        })
    }

    handleModalClose() {
        this.setState({
            blogModalIsOpen: false
        })
    }

    onScroll() {
        if (this.state.isLoading || this.state.blogItems.length === this.state.totalCount) {
            return;
        }

        if (window.innerHeight + document.documentElement.scrollTop === document.documentElement.offsetHeight) { // The screen height + The amount the user has scrolled
            this.getBlogItems();
        }
    }

    getPosts() {
        this.setState({
            isLoading: true
        })
    }


    getBlogItems() {
        this.setState({
            currentPage: this.state.currentPage + 1
        });
        

        axios.get(
            `https://daboss.devcamp.space/portfolio/portfolio_blogs?page=${this.state.currentPage}`,
            { withCredentials: true }
        ).then(response => {
            this.setState({
                blogItems: this.state.blogItems.concat(response.data.portfolio_blogs),
                totalCount: response.data.meta.total_records,
                isLoading: false
            });
            console.log("Response", response);
        }).catch(e => {
            console.log("getBlogItems error", e);
        })
    }

    componentWillMount() {
        this.getBlogItems();
    }

    componentWillUnmount() {
        window.removeEventListener('scroll', this.onScroll, false);
    }

    render() {
        const blogRecords = this.state.blogItems.map(blogItem => {
            if (this.props.loggedInStatus === "LOGGED_IN") {
                return (
                    <div className="admin-blog-wrapper" key={blogItem.id}>
                        <BlogItem blogItem={blogItem}/>

                        <div className="delete-blog-wrapper" onClick={() => this.handleDeleteClick(blogItem)}>
                            <FontAwesomeIcon icon="trash" />
                        </div>
                    </div>
                )
            } else {
                return <BlogItem key={blogItem.id} blogItem={blogItem}/>
            }
        })

        return (
            <div className="blog-container">
                <BlogModal 
                    modalIsOpen={this.state.blogModalIsOpen} 
                    handleModalClose={this.handleModalClose} 
                    handleSuccessfulNewBlogSubmission={this.handleSuccessfulNewBlogSubmission}
                />

                <div className="content-container">
                    {blogRecords}
                    
                    {
                        this.state.isLoading ? (
                            <div className="spinner content-loader">
                                <FontAwesomeIcon icon="spinner" spin />
                            </div>
                        ) : null
                    }
                </div>

                {
                    this.props.loggedInStatus === "LOGGED_IN" ? (
                        <div className="new-blog-link">
                        <a onClick={this.handleModalOpen}>
                            <FontAwesomeIcon icon="plus-circle" />
                        </a>
                    </div>
                    ) : null
                }

            </div>
        )
    }
}

export default Blog;