//const Stores = require('../models/stores');
//const User = require('../models/user');
const bcrypt = require('bcrypt');
const response = require('../models/response'); //Created pre-formatted uniform response
const fs = require('fs')
const path = require('path');

/* register controller */
module.exports = class cartsController {
    static async apiGetCarts(req, res, next) {
        let result = new response();
        // search if the project already exsisted (call findOne function)
        let carts;
        if (true) {
            var jsonPath = path.join(__dirname, '..', 'models', 'json', 'carts.json');
            carts = JSON.parse(fs.readFileSync(jsonPath));
            result.status = 200;
            result.success = true;
            result.response = carts;
        }
        res.status(result.status).json(result); //Return whatever result remains
    }
}