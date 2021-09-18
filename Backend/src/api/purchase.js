//const Stores = require('../models/stores');
//const User = require('../models/user');
const bcrypt = require('bcrypt');
const response = require('../models/response'); //Created pre-formatted uniform response
const fs = require('fs')
const path = require('path');

/* register controller */
module.exports = class productsController {
    static async apiPostPurchase(req, res, next) {
        let result = new response();
        let purchase;
        if (true) {
            purchase = JSON.parse({"status": "waiting"});
            result.status = 200;
            result.success = true;
            result.response = purchase;
        }
        res.status(result.status).json(result); //Return whatever result remains
    }
}