import React, { useEffect } from 'react';
import { Router, Route, Switch } from "react-router-dom";
import history from "../history";
import { useDispatch } from "react-redux";
import { loadUser } from "../actions/authActions";
import NavBar from "./NavBar";
import AllAssets from "../pages/AllAssets";
import UserDashboard from "../pages/UserDashboard";
import GalleryPage from "../pages/GalleryPage";
import Login from "../pages/Login";
import Register from "../pages/Register";
import PrivateRoute from "./PrivateRoute";
import NoMatch from "../pages/NoMatch";
import Search from "../pages/Search"

export const App = () => {
    

    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(loadUser());
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <>
            <Router history={history}>
                <NavBar />
                <Switch>
                    <Route path="/" exact component={AllAssets} />
                    <Route path="/login" component={Login} />
                    <Route path="/register" component={Register} />
                    <Route path="/search" component = {Search} />
                    <PrivateRoute path="/dashboard" component={UserDashboard} />
                    <PrivateRoute path="/gallerypage" component={GalleryPage} />
                    <Route component={NoMatch} />
                </Switch>
            </Router>
        </>
    )
}

export default App;
