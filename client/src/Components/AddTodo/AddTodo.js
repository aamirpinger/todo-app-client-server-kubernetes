import React, { Component } from 'react';
import { MDBContainer, MDBRow, MDBCol, MDBInput } from "mdbreact";
import { addTodo } from '../../utils/APICalls'
import WelcomeHeader from '../WelcomeHeader/WelcomeHeader'
import './AddTodo.css'

class AddTodo extends Component {
    state = {
        title: '',
        description: '',
        done: false,
        important: false,
        titleError: false,
        errMessage: ''
    }

    validateInput = () => {
        return (!this.state.title) ? false : true
    }
    handleTitleChange = (e) => {
        this.setState({
            title: e.target.value,
            titleError: false
        })
    }

    handleDescriptionChange = (e) => {
        this.setState({ description: e.target.value })
    }

    resetInput = () => {
        this.setState({
            title: '',
            description: '',
        })
    }

    handleAddTodo = () => {
        this.setState({ errMessage: '' })

        if (this.validateInput()) {
            addTodo(this.state.title, this.state.description)
                .then(todo => {
                    this.props.addTodo({
                        title: this.state.title,
                        description: this.state.description,
                        important: false,
                        done: false,
                        _id: todo.todo._id
                    })
                    this.resetInput()
                })
                .catch(error => {
                    this.setState({ errMessage: error.data.message })
                })
        }
        else {
            this.setState({
                titleError: true
            })
        }
    }

    render() {
        const { userName, signout } = this.props
        return (
            <MDBContainer className="add-todo-main">
                <WelcomeHeader userName={userName} signout={signout} />
                <MDBRow>
                    <MDBCol>
                        <MDBInput
                            value={this.state.title}
                            onChange={this.handleTitleChange}
                            label="ToDo Title"
                            background
                            size={(this.state.titleError) ? "lg inputErrorDiv" : "lg"}
                            className={(this.state.titleError) ? "inputError" : ""}
                            maxLength={100}
                        />
                        {
                            (this.state.titleError) && <span className="error-text"> ToDo Title cannot be blank.</span>
                        }
                    </MDBCol>
                </MDBRow>
                <MDBRow>
                    <MDBCol>
                        <MDBInput
                            value={this.state.description}
                            onChange={this.handleDescriptionChange}
                            type="textarea"
                            label="ToDo Description"
                            background
                            maxLength={250}
                        />
                    </MDBCol>
                </MDBRow>
                <MDBRow>
                    <MDBCol className="align-right">
                        <button type="button" onClick={this.resetInput} className="btn btn-outline-info-modified waves-effect">Reset</button>
                        <button type="button" onClick={this.handleAddTodo} className="btn btn-outline-info-modified waves-effect">Add</button>

                    </MDBCol>
                </MDBRow>
            </MDBContainer>
        );
    }
}

export default AddTodo;