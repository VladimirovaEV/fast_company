import React from "react";
import Users from "./components/users";
import NavBar from "./components/navBar";
import { Route, Switch, Redirect } from "react-router-dom";
import MainPage from "./components/mainPage";
import Login from "./components/login";
import NotFound from "./components/notFound";

function App() {
    return (
        <div>
            <NavBar />
            <Switch>
                <Route path="/" exact component={MainPage} />
                <Route path="/login" component={Login} />
                <Route
                    path="/users/:userId?"
                    component={Users}
                />
                <Route path="/404" component={NotFound} />
                <Redirect to="/404" />
            </Switch>
        </div>
    );
}

export default App;
