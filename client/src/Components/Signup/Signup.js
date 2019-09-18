import React, { Component } from 'react';
import { MDBContainer, MDBRow, MDBCol, MDBInput } from 'mdbreact';
import validate from 'validator'
import { signup } from '../../utils/APICalls'
import './Signup.css'
class Signup extends Component {
    state = {
        name: '',
        email: '',
        password: '',
        emptyName: false,
        invalidEmail: false,
        emptyPassword: false,
        signupFailed: false,
        errMessage: ''
    }

    handleNameInput = (e) => {
        this.setState({
            name: e.target.value,
            emptyName: false
        })
    }

    handleEmailInput = (e) => {
        this.setState({
            email: e.target.value,
            invalidEmail: false
        })
    }
    handlePasswordInput = (e) => {
        this.setState({
            password: e.target.value,
            emptyPassword: false
        })
    }
    validate = () => {
        let invalid = false
        if (this.state.name.trim() === '') {
            invalid = "emptyName"
        }
        else if (!validate.isEmail(this.state.email)) {
            invalid = "invalidEmail"
        }
        else if (this.state.password.trim() === "") {
            invalid = "emptyPassword"
        }

        return invalid
    }

    handleSubmit = () => {
        const invalidField = this.validate()
        if (invalidField) {
            this.setState({ [invalidField]: true })
        }
        else {
            signup(this.state.name, this.state.email, this.state.password)
                .then(user => {
                    this.props.signupDone()
                })
                .catch(error => {
                    let err
                    if (error.data.errmsg) {
                        err = error.data.errmsg
                    }
                    else if (error.data.errors.password) {
                        err = "Invalid Password, must be atleast 7 letters."
                    }
                    else {
                        err = error.data.message
                    }
                    this.setState({
                        signupFailed: true,
                        errMessage: err
                    })
                })
        }
    }

    render() {
        const { backToLogin } = this.props
        return (
            <MDBContainer className="login-todo-main">
                <MDBRow className="align-center">
                    <MDBCol md="6">
                        <p className="h5 text-center signup-heading">Sign up</p>
                        <div className="grey-text">
                            <MDBInput
                                label="Your name"
                                icon="user"
                                group
                                type="text"
                                validate
                                error="wrong"
                                success="right"
                                autoFocus
                                value={this.state.name}
                                onChange={this.handleNameInput}
                                size={(this.state.emptyName) ? "lg inputErrorDiv" : "lg"}
                                className={(this.state.emptyName) ? "inputError" : ""}
                            />
                            {
                                (this.state.emptyName) && <span className="signup-error-text"> Name field cannot be blank.</span>
                            }
                            <MDBInput
                                label="Your email"
                                icon="envelope"
                                group
                                type="email"
                                validate
                                error="wrong"
                                success="right"
                                value={this.state.email}
                                onChange={this.handleEmailInput}
                                size={(this.state.invalidEmail) ? "lg inputErrorDiv" : "lg"}
                                className={(this.state.invalidEmail) ? "inputError" : ""}
                            />
                            {
                                (this.state.invalidEmail) && <span className="signup-error-text"> Please type valid email address.</span>
                            }
                            <MDBInput
                                label="Your password"
                                icon="lock"
                                group
                                type="password"
                                validate
                                value={this.state.password}
                                onChange={this.handlePasswordInput}
                                size={(this.state.emptyPassword) ? "lg inputErrorDiv" : "lg"}
                                className={(this.state.emptyPassword) ? "inputError" : ""}
                            />
                            {
                                (this.state.emptyPassword) && <span className="signup-error-text">Password cannot be blank.</span>
                            }
                            {
                                (this.state.signupFailed) && <span className="signup-error-text signin-bad-response"> Error: {this.state.errMessage}, please try again.</span>
                            }
                        </div>
                        <div className="text-center">
                            <button
                                type="button"
                                onClick={() => { this.handleSubmit() }}
                                className="btn Ripple-parent btn btn-outline-info-modified Ripple-parent waves-effect">
                                Create User
                            </button>
                            <div>
                                <button className="login-link" onClick={() => { backToLogin() }}>Sign-in</button>
                            </div>
                        </div>
                    </MDBCol>
                </MDBRow>
            </MDBContainer>
        );
    }
};



export default Signup