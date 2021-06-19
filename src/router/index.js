import { Route,Switch } from "react-router";
import React from "react";
import Home from "../pages/Home";
import Login from '../pages/Login';
import Register from "../pages/Register";

const Router=()=>{
    return(
    <Switch>
        <Route exact path="/" component={Home}/>
        <Route exact path="/login" component={Login}/>
        <Route exact path="/regester" component={Register}/>
    </Switch>
    )
    
}
export  default Router