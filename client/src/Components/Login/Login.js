import React, { Component } from "react";
import { MDBContainer, MDBRow, MDBCol, MDBInput } from 'mdbreact';
import validate from 'validator'
import './Login.css'
import { login } from '../../utils/APICalls'

class Login extends Component {
    state = {
        email: 'aamir@example.com',
        password: 'aamir123',
        invalidEmail: false,
        emptyPassword: false,
        loginFailed: false
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
            login(this.state.email, this.state.password)
                .then(user => {
                    this.props.login(user)
                })
                .catch(error => {
                    if (error.status === 400) {
                        this.setState({ loginFailed: true })
                    }
                })
        }
    }

    render() {
        const { signup } = this.props
        return (
            <MDBContainer className="login-todo-main">
                <MDBRow className="align-center">
                    <MDBCol md="6">
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
                            {
                                (this.state.loginFailed) && <span className="signup-error-text signin-bad-response"> Incorrect username/password, please try again.</span>
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
                    </MDBCol>
                </MDBRow>
            </MDBContainer>
        );
    }
}

export default Login;