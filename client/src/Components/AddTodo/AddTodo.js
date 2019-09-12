import React, { Component } from 'react';
import { MDBContainer, MDBRow, MDBCol, MDBInput, MDBBtn } from "mdbreact";

import './AddTodo.css'
class AddTodo extends Component {
    state = {
        title: '',
        description: '',
    }

    handleTitleChange = (e) => {
        this.setState({ title: e.target.value })
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

    addTodo = () => {
        this.props.addTodo(this.state)
        this.resetInput()
    }

    render() {
        return (
            <MDBContainer>
                <MDBRow>
                    <MDBCol>
                        <MDBInput
                            value={this.state.title}
                            onChange={this.handleTitleChange}
                            label="ToDo Title"
                            background
                            size="lg"
                        />
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
                        />
                    </MDBCol>
                </MDBRow>
                <MDBRow>
                    <MDBCol className="align-right">
                        <MDBBtn outline color="info" onClick={this.resetInput}>Reset</MDBBtn>
                        <MDBBtn outline color="info" onClick={this.addTodo}>Add</MDBBtn>
                    </MDBCol>
                </MDBRow>
            </MDBContainer>
        );
    }
}

export default AddTodo;