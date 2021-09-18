import * as React from "react";
import { Switch, Route } from "wouter";
import Home from "../pages/Home";
import About from "../pages/About";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Stores from "../pages/Stores";
import Products from "../pages/Products";
import Orders from "../pages/Orders";

//router information for wouter, import components above, add paths below

export default () => (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/about" component={About} />
      <Route path="/login" component={Login} />
      <Route path="/register" component={Register} />
      <Route path="/stores" component={Stores}/>
      <Route path="/products" component={Products} />
      <Route path="/orders" component={Orders} />
    </Switch>
);
