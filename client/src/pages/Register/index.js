import "./register.css"
import React from 'react';
import { Header } from 'semantic-ui-react';
import RegisterForm from "../../components/RegisterForm";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { registerUser } from "../../actions/authActions";

const Register = () => {

    const dispatch = useDispatch();

    const renderFormMessage = () => {
        return <>Already Registered ? <Link to="/login">Login</Link></>
    }

    const onFormSubmit = (formVal) => {
        dispatch(registerUser(formVal));
    }

    return (
        <>
        <div className= "container" id="registerlogo">
        <img src={require("../../heroimages/Asset 3.png")}
            id="logo"
            alt="me" />
    </div>
        <div className="form-container">
           
            <Header as='h2' secondary="true" textAlign='center'>
                Register
            </Header>
            <RegisterForm
                renderMessage={renderFormMessage}
                buttonText="Register"
                onSubmit={onFormSubmit}
            />
        </div>
        </>
    )
}

export default Register;