const Carts = require('../models/carts');
const response = require('../models/response'); //Created pre-formatted uniform response
/* register controller */
module.exports = class cartsController {
    static async apiGetCarts(req, res, next) {
        let result = new response();
        result.auth =  (req.oidc.user == undefined)? null:req.oidc.user;
        // search if the project already exsisted (call findOne function)
        let carts;
        var querytest = req.query.id+req.query.store_id+req.query.order_id+req.query.status
        if (querytest !== querytest){ //No store_id specified
            result.status = 400;
            result.errors.push("No queries defined");
        } else { //Store_id specified
            var query = {}
            if (req.query.store_id !== undefined){query.store_id = req.query.store_id}
            if (req.query.order_id !== undefined){query.order_id = req.query.order_id}
            if (req.query.status !== undefined){query.status = req.query.status}
            if (req.query.id === undefined) { //id undefined
                try{
                    carts = await Carts.find(query);
                    result.connected = true;
                } catch (e) {
                    result.status = 400;
                    result.errors.push("Query Error", e);
                }
            } else {
                try{
                    carts = await Carts.findById(req.query.id);
                    result.connected = true;
                } catch (e) {
                    result.status = 400;
                    result.errors.push("ID Error", e);
                }
            }
            if (result.connected){
                if (carts == null) {
                    result.status = 404;
                    result.errors.push('Products not found');
                } else{
                    result.status = 200;
                    result.success = true;
                    result.response = {"carts": carts};
                }
            }
        }
        res.status(result.status).json(result); //Return whatever result remains
    }
}