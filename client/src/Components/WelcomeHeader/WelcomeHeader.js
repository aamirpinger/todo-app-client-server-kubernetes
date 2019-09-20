import React from 'react';
import { MDBRow, MDBCol } from "mdbreact";

import './WelcomeHeader.css'

export default function WelcomeHeader(props) {
    const { userName, signout } = props
    return (
        <MDBRow>
            <MDBCol>
                <span className="todo-welcome" >{`Welcome ${userName}`}</span>
            </MDBCol>
            <MDBCol>
                <div className="todo-logout">
                    <button className="signup" onClick={() => { signout() }}>Sign-out</button>
                </div>

            </MDBCol>
        </MDBRow>
    );
}

