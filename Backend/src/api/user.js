const response = require('../models/response'); //Created pre-formatted uniform response
/* register controller */
module.exports = class userController {
    static async apiGetUser(req, res, next) {
        let result = new response();
        result.auth =  (req.oidc.user == undefined)? null:req.oidc.user;
        result.status = 200;
        result.success = true;
        result.response = {"authorized": (result.auth===null)?false:true};
        res.status(result.status).json(result); //Return whatever result remains
    }
}