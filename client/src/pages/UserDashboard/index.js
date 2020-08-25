import React from 'react';
import { Header, Message } from "semantic-ui-react";
import { useSelector } from "react-redux";
import "./userdashboard.css";


export const UserDashboard = () => {
    // access to the currentUser property from the auth reducer state
    const user = useSelector(state => state.auth.currentUser);

    return (
        <>
            <div className="jumbotron jumbotron-fluid" id="dashjumbo">
                <h1 className="display-4">Account Information</h1>

                <p>Welcome {user ? user.email : ""}</p>

            </div>
        </>
    )
}

export default UserDashboard;
