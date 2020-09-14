import React from "react";
import reactDOM from "react-dom";
import 'semantic-ui-css/semantic.min.css'
import App from "./components/App";
import { Provider } from "react-redux";
import { store } from "./store";
import "./style.css";
import { usePromiseTracker } from "react-promise-tracker";
import Loader from 'react-loader-spinner';


const LoadingIndicator = props => {
    const { promiseInProgress } = usePromiseTracker();
    return (
        promiseInProgress &&

        <div
            style={{
                width: "100%",
                height: "100",
                display: "flex",
                justifyContent: "center",
                alignItems: "center"
            }}
        >
            <Loader type="ThreeDots" color="#2BAD60" height="100" width="100" />
        </div>

    );
}


reactDOM.render(
    // Wrap all APP with the react redux provider and pass the redux store to have access to global state
    <Provider store={store}>
        <App />
        <LoadingIndicator />
    </Provider>, document.querySelector('#root'));