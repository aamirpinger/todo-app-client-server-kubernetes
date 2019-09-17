import React, { Component } from "react";
import { MDBContainer, MDBRow, MDBCol, MDBInput } from 'mdbreact';
import validate from 'validator'
import './Login.css'

class Login extends Component {
    state = {
        email: '',
        password: '',
        invalidEmail: false,
        emptyPassword: false
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
        if (!validate.isEmail(this.state.email)) {
            invalid = "invalidEmail"
        }
        else if (this.state.password === "") {
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

            // login API to be called here
            this.props.login()
        }
    }

    render() {
        const { signup } = this.props
        return (
            <MDBContainer className="login-todo-main">
                <MDBRow className="align-center">
                    <MDBCol md="6">
                        <form>
                            <p className="h5 text-center login-heading">Sign in</p>
                            <div className="grey-text">
                                <MDBInput
                                    label="Type your email"
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
                                    label="Type your password"
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
                            </div>
                            <div className="text-center">
                                <button
                                    onClick={() => { this.handleSubmit() }}
                                    type="button"
                                    className="btn Ripple-parent btn btn-outline-info-modified Ripple-parent waves-effect">
                                    Login
                            </button>
                                <div>
                                    <button className="signup" onClick={() => { signup() }}>Signup</button>
                                </div>
                            </div>
                        </form>
                    </MDBCol>
                </MDBRow>
            </MDBContainer>
        );
    }
}

export default Login;