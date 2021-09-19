const express = require("express"); //Uses express to create a server
const cors = require("cors"); //Uses cors library to avoid dealing with that BS
const response = require('./models/response'); //Created pre-formatted uniform response
const {auth} = require('express-openid-connect');
const app = express();
const env = require("dotenv");  //Allows pulling information from .env with process.env
const jwt = require('express-jwt');
const jwks = require('jwks-rsa');
const path = require('path')

//configs
env.config();
const authConfig = {
    authRequired: false,
    auth0Logout: true, 
    secret: process.env.CLIENT_APP_SECRET,
    baseURL: 'http://localhost:2000',
    clientID: 'kCh9RYZuSA7zuuZGhHzVFlgC6HkKH5Zl', //App client id
    issuerBaseURL: 'https://dev-it2no-e1.us.auth0.com',
};


// utilities
app.use(cors()); 
app.use(express.json()); 
app.use(auth(authConfig));
app.use(express.static(path.resolve(__dirname, '../../Frontend/build')));

// routes
const storesRoute = require("./route/stores.route");
const productsRoute = require("./route/products.route");
const ordersRoute = require("./route/orders.route");
const cartsRoute = require("./route/carts.route");
const filesRoute = require("./route/files.route");
const userRoute = require("./route/user.route");

// api
app.use("/api/stores", storesRoute);
app.use("/api/products", productsRoute); 
app.use("/api/orders", ordersRoute); 
app.use("/api/carts", cartsRoute);
app.use("/api/user", userRoute);
app.use("/files", filesRoute); 
/* 
app.get('/', (req, res) => {
    res.send(req.oidc.isAuthenticated() ? 'Logged in' : 'Logged out');
});
*/
app.use("/callback", (req, res) => {
    let result = new response(200, null, {"page": "callback"});
    res.status(result.status).json(result); //Return 200 result
});

app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, '../../Frontend/build', 'index.html'));
    console.log(path.resolve(__dirname, '../../Frontend/build', 'index.html'))
});

module.exports = app; //Export server for use in index.js
