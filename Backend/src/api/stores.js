//const Stores = require('../models/stores');
//const User = require('../models/user');
const bcrypt = require('bcrypt');
const response = require('../models/response'); //Created pre-formatted uniform response
const fs = require('fs')
const path = require('path');

/* register controller */
module.exports = class storesController {
    static async apiGetStores(req, res, next) {
        let result = new response();
        // search if the project already exsisted (call findOne function)
        let stores;
        if (true) {
            var jsonPath = path.join(__dirname, '..', 'models', 'json', 'stores.json');
            stores = JSON.parse(fs.readFileSync(jsonPath));
            result.status = 200;
            result.success = true;
            result.response = stores;
        }
        res.status(result.status).json(result); //Return whatever result remains
    }
}