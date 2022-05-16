import React from "react";
import Users from "./layout/users";
import NavBar from "./components/ui/navBar";
import { Route, Switch, Redirect } from "react-router-dom";
import MainPage from "./layout/mainPage";
import Login from "./layout/login";
import NotFound from "./components/notFound";

function App() {
    return (
        <div>
            <NavBar />
            <Switch>
                <Route path="/" exact component={MainPage} />
                <Route path="/login/:type?" component={Login} />
                <Route path="/users/:userId?/:edit?" component={Users} />
                <Route path="/404" component={NotFound} />
                <Redirect to="/404" />
            </Switch>
        </div>
    );
}

export default App;
