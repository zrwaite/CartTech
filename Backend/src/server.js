const express = require("express"); //Uses express to create a server
const cors = require("cors"); //Uses cors library to avoid dealing with that BS
const response = require('./models/response'); //Created pre-formatted uniform response
const {auth} = require('express-openid-connect');
const app = express();
const env = require("dotenv");  //Allows pulling information from .env with process.env
const jwt = require('express-jwt');
const jwks = require('jwks-rsa');


//configs
env.config();
const authConfig = {
    authRequired: false,
    auth0Logout: true,
    secret: process.env.AUTH_SECRET,
    baseURL: 'http://carttech.tech',
    clientID: 'uNb9Ff8g5NKQDtINqVU7IBhlm5tH25UI',
    issuerBaseURL: 'https://dev-it2no-e1.us.auth0.com'
};
const jwtCheck = jwt({
    secret: jwks.expressJwtSecret({
        cache: true,
        rateLimit: true,
        jwksRequestsPerMinute: 5,
        jwksUri: 'https://dev-it2no-e1.us.auth0.com/.well-known/jwks.json'
    }),
    audience: 'https://cart-tech',
    issuer: 'https://dev-it2no-e1.us.auth0.com/',
    algorithms: ['RS256'],
    credentialsRequired: false
});


// utilities
app.use(cors()); 
app.use(express.json()); 
app.use(jwtCheck);
app.use(auth(authConfig));





// routes
const storesRoute = require("./route/stores.route");
const productsRoute = require("./route/products.route");
const purchaseRoute = require("./route/purchase.route"); 
const ordersRoute = require("./route/orders.route");
const cartsRoute = require("./route/carts.route");
const filesRoute = require("./route/files.route");




// api
app.use("/api/stores", storesRoute);
app.use("/api/products", productsRoute); 
app.use("/api/purchase", purchaseRoute); 
app.use("/api/orders", ordersRoute); 
app.use("/api/carts", cartsRoute);
app.use("/files", filesRoute);

app.get('/', (req, res) => {
    res.send(req.oidc.isAuthenticated() ? 'Logged in' : 'Logged out');
});
app.use("/callback", (req, res) => {
    let result = new response(200, null, {"page": "callback"});
    res.status(result.status).json(result); //Return 200 result
});

app.use("*", (req, res) => {
    let result = new response(404, ["Not Found"]);
    res.status(result.status).json(result); //Return 404 result
});

module.exports = app; //Export server for use in index.js
