import React, { Component } from 'react';
import { EditorState, convertToRaw, ContentState } from "draft-js";
import { Editor } from "react-draft-wysiwyg";
import draftToHtml from "draftjs-to-html";
import htmlToDraft from "html-to-draftjs";

export default class RichTextEditor extends Component {
    constructor(props) {
        super(props);
        
        this.state = {
            editorState: EditorState.createEmpty()
        }

        this.onEditorStateChange = this.onEditorStateChange.bind(this);
        this.getBase64 = this.getBase64.bind(this);
        this.uploadFile = this.uploadFile.bind(this);
    }

    componentDidMount() {
        if (this.props.editMode && this.props.contentToEdit) {
            console.log("contentToEdit", this.props.contentToEdit)
            const blocksFromHtml = htmlToDraft(this.props.contentToEdit);
            const { contentBlocks, entityMap } = blocksFromHtml
            const contentState = ContentState.createFromBlockArray(contentBlocks, entityMap); // Takes the content and converts it to data it can put in the rich text editor
            const editorState = EditorState.createWithContent(contentState);
            this.setState({ editorState });
        }
    }

    onEditorStateChange(editorState) {
        this.setState({ editorState }, 
        this.props.handleRichTextEditorChange(
            draftToHtml(convertToRaw(this.state.editorState.getCurrentContent()))
        )) // Run this after state has been updated
    }

    getBase64(file, callback) {
        const READER = new FileReader();
        READER.readAsDataURL(file);
        READER.onload = () => callback(READER.result);
        READER.onerror = error => {};
    }

    uploadFile(file) {
        return new Promise((resolve, reject) => { // Takes in a function for an argument, with the arguments, Good and Bad responses as arguments
            this.getBase64(file, data => resolve({data: { link: data }})); // Passing in this object as an argument for the resolve function
        })
    }
    
    render() {
        return (
            <div>
                <Editor 
                    editorState={this.state.editorState}
                    wrapperClassName="demo-wrapper"
                    editorClassName='demo-editor'
                    onEditorStateChange={this.onEditorStateChange} // Arguments are from the library
                    toolbar={{
                        inline: { inDropdown: true },
                        list: { inDropdown: true },
                        textAlign: { inDropdown: true }, // This is determining what items should be in a dropdown to save space in the options menu
                        link: { inDropdown: true },
                        history: { inDropdown: true },
                        image: {
                            uploadCallback: this.uploadFile, // This function is called whenever an image is uploaded
                            alt: { present: true, mandatory: false },
                            previewImage: true,
                            inputAccept: "image/gif,image/jpeg,image/jpg,image/png,image/svg"
                        }
                    }}
                />
            </div>
        )
    }
}