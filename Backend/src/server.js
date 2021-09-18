const express = require("express"); //Uses express to create a server
const cors = require("cors"); //Uses cors library to avoid dealing with that BS
const response = require('./models/response'); //Created pre-formatted uniform response
const {auth} = require('express-openid-connect');
const app = express();

/* Server routing */

// routes
const storesRoute = require("./route/stores.route");
const productsRoute = require("./route/products.route");
const purchaseRoute = require("./route/purchase.route"); 
const ordersRoute = require("./route/orders.route");
const cartsRoute = require("./route/carts.route");
const filesRoute = require("./route/files.route");

// utilities
app.use(cors()); 
app.use(express.json()); //Json module is used to parse json I guess


// api
app.use("/api/stores", storesRoute);
app.use("/api/products", productsRoute); 
app.use("/api/purchase", purchaseRoute); 
app.use("/api/orders", ordersRoute); 
app.use("/api/carts", cartsRoute);

app.use("/files", filesRoute);

app.use("*", (req, res) => {
    let result = new response(404, ["Not Found"]);
    res.status(result.status).json(result); //Return 404 result
});

module.exports = app; //Export server for use in index.js
/*
const config = {
    authRequired: false,
    auth0Logout: true,
    secret: process.env.AUTH0_SECRET || "dV-eMJbSYESCaySxRdTl8e3uDcoXV1b3Ge1dxy5wRqJ4DHzRux1B6hLS2b_vK7ps",
    baseURL: 'http://localhost:2000',
    clientID: 'C42bgZdesIAl0rkqgFf6vpY3DE4wFC3N',
    issuerBaseURL: 'https://dev-it2no-e1.us.auth0.com'
};
app.use(auth(config));
app.get('/', (req, res) => {
    res.send(req.oidc.isAuthenticated() ? 'Logged in' : 'Logged out');
});
app.use("/callback", (req, res) => {
    let result = new response(200, null, {"page": "callback"});
    res.status(result.status).json(result); //Return 200 result
});
*/