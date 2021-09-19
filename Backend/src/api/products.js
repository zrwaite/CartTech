const Products = require('../models/products');
const response = require('../models/response'); //Created pre-formatted uniform response

/* register controller */
module.exports = class productsController {
    static async apiGetProducts(req, res, next) {
        let result = new response();
        result.auth =  (req.oidc.user == undefined)? null:req.oidc.user;
        // search if the project already exsisted (call findOne function)
        let products;
        if (req.query.store_id === undefined && req.query.id === undefined){ //No store_id specified
            result.status = 400;
            result.errors.push("No ID defined");
        } else { //Store_id specified
            if (req.query.id === undefined) { //id undefined
                try{
                    products = await Products.find({"store_id": req.query.store_id});
                    result.connected = true;
                } catch (e) {
                    result.status = 400;
                    result.errors.push("Store ID Error", e);
                }
            } else {
                try{
                    products = await Products.findById(req.query.id);
                    result.connected = true;
                } catch (e) {
                    result.status = 400;
                    result.errors.push("ID Error", e);
                }
            }
            if (result.connected){
                if (products == null) {
                    result.status = 404;
                    result.errors.push('Products not found');
                } else{
                    result.status = 200;
                    result.success = true;
                    result.response = {"products": products};
                }
            }
        }
        res.status(result.status).json(result); //Return whatever result remains
    }
}